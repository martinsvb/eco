import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridRowId,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { countries } from 'countries-list';
import dayjs from 'dayjs';
import { allowedCountries } from '@eco/config';
import { Languages, getLanguageCode } from '@eco/locales';
import { ContactFull, ContactItems } from '@eco/types';
import { cancelContact, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getContactEditValidationSchema } from '@eco/validation';
import { AppGridButton, AppGridInputField, AppGridPhoneField, DialogClickOpen } from '../components';
import { columnSettings, setRowMode } from '../helpers';
import { ContactsSearchField } from '.';

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
  handleClickOpen: DialogClickOpen,
  errors: ContactsErrors,
  setErrors: Dispatch<SetStateAction<ContactsErrors>>
): ContactsColumns => {

  const { t, i18n: { language } } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const dispatch = useAppDispatch();

  const { rights: { scopes: { contacts } } } = useShallowEqualSelector(selectUserAuth);

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel(setRowMode(id, GridRowModes.View));
    },
    []
  );

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel(setRowMode(id, GridRowModes.Edit));
    },
    []
  );

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () => {
      handleClickOpen(id);
    },
    [handleClickOpen]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((prevRowModesModel) => ({
        ...prevRowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));
      dispatch(cancelContact(id));
      setErrors((prevErrors) => ({
        ...prevErrors, 
        [id]: {}
      }));
    },
    [dispatch, setErrors]
  );

  const processValidation = async (id: GridRowId, item: ContactItems, value?: string) => {
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
        ...columnSettings(ContactItems.Name, 200, 'left'),
        headerName: t('labels:name'),
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Name, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id] && errors[params.id].name}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Email, 200, 'left'),
        headerName: t('labels:email'),
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Email, props.value);
          return { ...props, error };
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
        ...columnSettings(ContactItems.Ico, 150, 'left'),
        headerName: t('labels:ico'),
        sortable: false,
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Ico, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <ContactsSearchField
              {...params}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Vat, 140, 'left'),
        headerName: t('labels:vat'),
        sortable: false,
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Vat, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id] && errors[params.id].vat}
            />
          );
        },
      },
      {
        ...columnSettings(ContactItems.Address, 320, 'left'),
        headerName: t('labels:address'),
        editable: contacts?.edit,
        preProcessEditCellProps: async ({id, props}: GridPreProcessEditCellProps<string, ContactFull>) => {
          const error = await processValidation(id, ContactItems.Address, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<ContactFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id] && errors[params.id].address}
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
        ...columnSettings(ContactItems.CreatedAt, 160),
        headerName: t('labels:createdAt'),
        type: 'string',
        valueFormatter: (value) => dayjs(value).format('DD. MM. YYYY HH:mm'),
        disableColumnMenu: true,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: t('labels:actions'),
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {

          return rowModesModel[id]?.mode === GridRowModes.Edit ?
            [
              <AppGridButton
                title={errors[id]
                    ? Object.values(errors[id]).filter((error) => !!error).join(', ') || t('labels:save')
                    : t('labels:save')
                  }
                label={t('labels:save')}
                onClick={handleSaveClick(id)}
                color="primary"
              >
                <SaveIcon />
              </AppGridButton>,
              <AppGridButton
                label={t('labels:cancel')}
                onClick={handleCancelClick(id)}
                className="textPrimary"
              >
                <CancelIcon />
              </AppGridButton>,
            ]
            :
            [
              <AppGridButton
                label={t('labels:edit')}
                onClick={handleEditClick(id)}
                className="textPrimary"
              >
                <EditIcon />
              </AppGridButton>,
              <AppGridButton
                label={t('labels:delete')}
                onClick={handleDeleteClick(id)}
              >
                <DeleteIcon />
              </AppGridButton>,
            ]
        },
      },
    ],
    rowModesModel,
    setRowModesModel
  }
};
