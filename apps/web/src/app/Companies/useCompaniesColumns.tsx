import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridRowId,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams
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

export type CompaniesErrors = {
  errors: {
    [key: string]: Partial<CompanyErrors> | undefined;
  },
  valid: {
    [key: string]: boolean | undefined;
  },
};

interface CompaniesColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

export const companySchema = getCompanyEditValidationSchema();

export const initCompanieErrors = {
  errors: {},
  valid: {}
}

export const useCompaniesColumns = (
  apiRef: MutableRefObject<GridApiCommunity>,
  handleClickOpen: DialogClickOpen,
  {errors, valid}: CompaniesErrors,
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

  const handleEditClick = (id: GridRowId) => async () => {
    const row = apiRef.current.getRow(id);

    let isValid = true;
    try {
      await companySchema.validate(row, {abortEarly: true, stripUnknown: true});
    }
    catch (error) {
      isValid = false;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      valid: {
        ...prevErrors.valid,
        [id]: isValid
      }
    }));

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
      errors: {
        ...prevErrors.errors,
        [id]: undefined
      },
      valid: {
        ...prevErrors.valid,
        [id]: undefined
      }
    }));
  };

  const handleSearch = (id: GridRowId, value?: string | number) => () => {
    if (value) {
      dispatch(apiGetCompanyAres({id, ico: `${value}`, apiRef}));
    }
  };

  const processValidation = async (
    item: CompanyItems,
    {
      id,
      hasChanged,
      props: { error, value }
    }: GridPreProcessEditCellProps<string, CompanyFull>
  ) => {
    if (!hasChanged) {
      return error;
    }

    const updatedRow = apiRef.current.getRowWithUpdatedValues(id, item)

    let message: string | undefined = undefined;
    let isValid = true;
    try {
      await companySchema.validate(updatedRow, {abortEarly: true, stripUnknown: true});
    }
    catch (error) {
      isValid = false;
      try {
        await companySchema.validateAt(item, {[item]: value});
      }
      catch (error) {
        ({ message } = error as {message: string});
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      errors: {
        ...prevErrors.errors,
        [id]: {
          ...prevErrors.errors[id],
          [item]: message
        }
      },
      valid: {
        ...prevErrors.valid,
        [id]: isValid
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
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(CompanyItems.Ico, params);
          return { ...params.props, error };
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
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(CompanyItems.Name, params);
          return { ...params.props, error };
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
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(CompanyItems.Email, params);
          return { ...params.props, error };
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
        ...columnSettings(CompanyItems.Vat, 120, 'left'),
        headerName: t('labels:vat'),
        sortable: false,
        editable: companies?.edit,
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(CompanyItems.Vat, params);
          return { ...params.props, error };
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
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(CompanyItems.Address, params);
          return { ...params.props, error };
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
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(CompanyItems.Country, params);
          return { ...params.props, error };
        },
      },
      {
        ...columnSettings(CompanyItems.CreatedAt, 140),
        headerName: t('labels:createdAt'),
        type: 'string',
        valueFormatter: (value) => dayjs(value).format('DD. MM. YYYY'),
        disableColumnMenu: true,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: t('labels:actions'),
        width: 80,
        cellClassName: 'actions',
        getActions: ({ id }) => {

          return rowModesModel[id]?.mode === GridRowModes.Edit ?
            [
              <AppGridButton
                title={Object.values(errors).filter(is(String)).join(', ') || t('labels:save')}
                disabled={!valid[id]}
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
