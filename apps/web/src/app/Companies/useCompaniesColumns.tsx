import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
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
import { countries } from 'countries-list';
import dayjs from 'dayjs';
import { is } from 'ramda';
import { allowedCountries } from '@eco/config';
import { Languages, getLanguageCode } from '@eco/locales';
import { ApiOperations, CompanyFull, CompanyItems } from '@eco/types';
import {
  apiGetCompanyAres,
  cancelCompany,
  selectCompaniesLoading,
  selectUserAuth,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { getCompanyEditValidationSchema } from '@eco/validation';
import { AppGridButton, AppGridInputField, AppGridSearchField, DialogClickOpen } from '../components';
import { columnSettings, setRowMode } from '../helpers';

export interface CompanyErrors {
  name: string;
  email: string;
  ico: string;
  vat: string;
  address: string;
}

export type CompaniesErrors = {[key: string]: Partial<CompanyErrors>};

interface CompaniesColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

const companySchema = getCompanyEditValidationSchema();

export const initCompaniesErrors = {
  [CompanyItems.Name]: '',
  [CompanyItems.Email]: '',
  [CompanyItems.Ico]: '',
  [CompanyItems.Vat]: '',
  [CompanyItems.Address]: '',
}

export const useCompaniesColumns = (
  apiRef: MutableRefObject<GridApiCommunity>,
  handleClickOpen: DialogClickOpen,
  errors: CompaniesErrors,
  setErrors: Dispatch<SetStateAction<CompaniesErrors>>
): CompaniesColumns => {

  const { t, i18n: { language } } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const dispatch = useAppDispatch();

  const { rights: { scopes: { companies } } } = useShallowEqualSelector(selectUserAuth);

  const companiesLoading = useShallowEqualSelector(selectCompaniesLoading);

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
    dispatch(cancelCompany(id));
    setErrors((prevErrors) => ({
      ...prevErrors, 
      [id]: {}
    }));
  };

  const handleSearch = (id: GridRowId, value?: string | number) => () => {
    if (value) {
      dispatch(apiGetCompanyAres({id, ico: `${value}`, apiRef}));
    }
  };

  const processValidation = async (
    id: GridRowId,
    item: CompanyItems,
    {value, error}: GridEditCellProps<string>,
    hasChanged?: boolean
  ) => {
    if (!hasChanged) {
      return error;
    }

    let message: string | undefined = undefined;
    try {
      await companySchema.validateAt(item, {[item]: value});
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
        ...columnSettings(CompanyItems.Ico, 150, 'left'),
        headerName: t('labels:ico'),
        sortable: false,
        editable: companies?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(id, CompanyItems.Ico, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          const { id, value } = params;
          return (
            <AppGridSearchField
              {...params}
              apiRef={apiRef}
              handleSearch={handleSearch(id, value)}
              inputWidth={115}
              isLoading={companiesLoading[`${ApiOperations.getExternalItem}-${params.id}`]}
              title={t('labels:filterSearch')}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Name, 200, 'left'),
        headerName: t('labels:name'),
        editable: companies?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(id, CompanyItems.Name, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.name}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Email, 200, 'left'),
        headerName: t('labels:email'),
        editable: companies?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(id, CompanyItems.Email, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.email}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Vat, 140, 'left'),
        headerName: t('labels:vat'),
        sortable: false,
        editable: companies?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(id, CompanyItems.Vat, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.vat}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Address, 320, 'left'),
        headerName: t('labels:address'),
        editable: companies?.edit,
        preProcessEditCellProps: async ({id, hasChanged, props}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(id, CompanyItems.Address, props, hasChanged);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.address}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Country, 140),
        headerName: t('labels:country'),
        type: 'singleSelect',
        valueOptions: allowedCountries.map((value) => ({
          value,
          label: countries[value][getLanguageCode(language) === Languages.en ? 'name' : 'native']
        })),
        editable: companies?.edit,
        sortable: true,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(CompanyItems.CreatedAt, 160),
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
                title={Object.values(errors).filter(is(String)).join(', ') || t('labels:save')}
                disabled={!!(errors[id] && Object.values(errors[id]).filter((error) => !!error).length)}
                label={t('labels:save')}
                onClick={handleSaveClick(id)}
                color="primary"
              >
                {(companiesLoading[`${ApiOperations.create}-${id}`] || companiesLoading[`${ApiOperations.edit}-${id}`])
                  ?
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
