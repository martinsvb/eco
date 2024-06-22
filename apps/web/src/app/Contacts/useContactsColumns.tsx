import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridRowId,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridEditCellProps
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { countries } from 'countries-list';
import dayjs from 'dayjs';
import { allowedCountries, routes } from '@eco/config';
import { Languages, getLanguageCode } from '@eco/locales';
import { ApiOperations, ContactFull, ContactItems } from '@eco/types';
import {
  apiGetContactAres,
  cancelContact,
  selectContactsLoading,
  selectUserAuth,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { getContactEditValidationSchema } from '@eco/validation';
import {
  AppGridButton,
  AppGridInputField,
  AppGridPhoneField,
  AppGridSearchField,
  DialogClickOpen
} from '../components';
import { columnSettings, setRowMode } from '../helpers';

export interface ContactErrors {
  name: string;
  email: string;
  ico: string;
  vat: string;
  address: string;
}

export type ContactsErrors = {[key: string]: Partial<ContactErrors>};

interface ContactsColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

const contactSchema = getContactEditValidationSchema();

export const initContactsErrors = {
  [ContactItems.Name]: '',
  [ContactItems.Email]: '',
  [ContactItems.Ico]: '',
  [ContactItems.Vat]: '',
  [ContactItems.Address]: '',
}

export const useContactsColumns = (
  apiRef: MutableRefObject<GridApiCommunity>,
  handleClickOpen: DialogClickOpen
): ContactsColumns => {

  const { t, i18n: { language } } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const [ errors, setErrors ] = useState<ContactsErrors>({});

  const dispatch = useAppDispatch();

  const { rights: { scopes: { contacts } } } = useShallowEqualSelector(selectUserAuth);

  const contactsLoading = useShallowEqualSelector(selectContactsLoading);

  const navigate = useNavigate();

  const handleViewClick = (id: GridRowId) => () => {
    navigate(routes.contact.replace(':id', id as string));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel(setRowMode(id, GridRowModes.View));
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel(setRowMode(id, GridRowModes.Edit));
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    handleClickOpen(id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prevRowModesModel) => ({
      ...prevRowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
    dispatch(cancelContact(id));
    setErrors((prevErrors) => ({
      ...prevErrors, 
      [id]: {}
    }));
  };

  const handleSearch = (id: GridRowId, value?: string | number) => () => {
    if (value) {
      dispatch(apiGetContactAres({id, ico: `${value}`, apiRef}));
    }
  };

  const processValidation = async (
    id: GridRowId,
    item: ContactItems,
    {value, error}: GridEditCellProps<string>,
    hasChanged?: boolean
  ) => {
    if (!hasChanged) {
      return error;
    }

    let message: string | undefined = undefined;
    try {
      await contactSchema.validateAt(item, {[item]: value});
    }
    catch (error) {
      ({ message } = error as {message: string});
    }
    setErrors((prevErrors) => ({
      ...prevErrors, 
      [id]: {
        ...prevErrors[id],
        [item]: message
      }
    }));

    return !!message;
  }

  return {
    columns: [
      {
        ...columnSettings(ContactItems.Ico, 150, 'left'),
        headerName: t('labels:ico'),
        sortable: false,
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Ico, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          const { id, value } = params;
          return (
            <AppGridSearchField
              {...params}
              apiRef={apiRef}
              handleSearch={handleSearch(id, value)}
              helperText={errors[params.id]?.ico}
              inputWidth={115}
              isLoading={contactsLoading[`${ApiOperations.getExternalItem}-${params.id}`]}
              title={t('labels:filterSearch')}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Name, 160, 'left'),
        headerName: t('labels:name'),
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Name, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.name}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Email, 200, 'left'),
        headerName: t('labels:email'),
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Email, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.email}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Phone, 200),
        headerName: t('labels:phone'),
        sortable: false,
        disableColumnMenu: true,
        editable: contacts?.edit,
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string>) => {
          return (
            <AppGridPhoneField
              {...params}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Vat, 120, 'left'),
        headerName: t('labels:vat'),
        sortable: false,
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Vat, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.vat}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Address, 200, 'left'),
        headerName: t('labels:address'),
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Address, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.address}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Country, 140),
        headerName: t('labels:country'),
        type: 'singleSelect',
        valueOptions: allowedCountries.map((value) => ({
          value,
          label: countries[value][getLanguageCode(language) === Languages.en ? 'name' : 'native']
        })),
        editable: contacts?.edit,
        sortable: true,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(ContactItems.Note, 140, 'left'),
        headerName: t('labels:note'),
        editable: contacts?.edit,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(ContactItems.CreatedAt, 130),
        headerName: t('labels:createdAt'),
        type: 'string',
        valueFormatter: (value) => dayjs(value).format('DD. MM. YYYY'),
        disableColumnMenu: true,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: t('labels:actions'),
        width: 120,
        cellClassName: 'actions',
        getActions: ({ id }) => {

          if (rowModesModel[id]?.mode === GridRowModes.Edit) {
            return [
              <AppGridButton
                label={t('labels:save')}
                disabled={!!(errors[id] && Object.values(errors[id]).filter((error) => !!error).length)}
                onClick={handleSaveClick(id)}
                color="primary"
              >
                {(contactsLoading[`${ApiOperations.create}-${id}`] || contactsLoading[`${ApiOperations.edit}-${id}`]) ?
                  <CircularProgress
                    color="inherit"
                    size={30}
                    sx={{
                      alignSelf: 'center',
                      mr: 0.5
                    }}
                  />
                  :
                  <SaveIcon />
                }
              </AppGridButton>,
              <AppGridButton
                label={t('labels:cancel')}
                onClick={handleCancelClick(id)}
                className="textPrimary"
              >
                <CancelIcon />
              </AppGridButton>,
            ];
          }

          const viewButton = (
            <AppGridButton
              label={t('labels:detail')}
              onClick={handleViewClick(id)}
              className="textPrimary"
            >
              <VisibilityIcon />
            </AppGridButton>
          );

          const editButton = (
            <AppGridButton
              label={t('labels:edit')}
              onClick={handleEditClick(id)}
              className="textPrimary"
            >
              <EditIcon />
            </AppGridButton>
          );

          return contacts?.read && contacts?.edit && contacts?.delete
          ? [
              viewButton,
              editButton,
              <AppGridButton
                label={t('labels:delete')}
                onClick={handleDeleteClick(id)}
              >
                <DeleteIcon />
              </AppGridButton>,
            ]
            : contacts?.read && contacts?.edit && !contacts?.delete
              ? [viewButton, editButton]
              : contacts?.read && !contacts?.edit && !contacts?.delete
                ? [viewButton]
                : []
        },
      },
    ],
    rowModesModel,
    setRowModesModel
  }
};
