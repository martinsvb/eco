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
import { is } from 'ramda';
import { allowedCountries } from '@eco/config';
import { Languages, getLanguageCode } from '@eco/locales';
import { CompanyFull, CompanyItems } from '@eco/types';
import { cancelCompany, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getCompanuEditValidationSchema } from '@eco/validation';
import { AppGridButton, DialogClickOpen } from '../components';
import { columnSettings, setRowMode } from '../helpers';
import { CompaniesSearchField } from './CompaniesSearchField';
import { CompaniesInputField } from './CompaniesInputField';

interface CompaniesColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

const companySchema = getCompanuEditValidationSchema();

export const useCompaniesColumns = (handleClickOpen: DialogClickOpen): CompaniesColumns => {

  const { t, i18n: { language } } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const [ errors, setErrors ] = useState({});

  const dispatch = useAppDispatch();

  const { rights: { scopes: { companies } } } = useShallowEqualSelector(selectUserAuth);

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
      dispatch(cancelCompany(id));
    },
    [dispatch]
  );

  const processValidation = async (row: CompanyFull, item: CompanyItems, value?: string) => {
    let message: string | undefined = undefined;
    try {
      await companySchema.validate({
        ...row,
        [item]: value
      });
    }
    catch (error) {
      ({ message } = error as {message: string});
    }
    setErrors((prevErrors) => ({...prevErrors, [item]: message}));

    return !!message;
  }

  return {
    columns: [
      {
        ...columnSettings(CompanyItems.Name, 200, 'left'),
        headerName: t('labels:name'),
        editable: companies?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(row, CompanyItems.Name, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <CompaniesInputField
              {...params}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Email, 200, 'left'),
        headerName: t('labels:email'),
        editable: companies?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(row, CompanyItems.Email, props.value);
          return { ...props, error };
        },
      },
      {
        ...columnSettings(CompanyItems.Ico, 170, 'left'),
        headerName: t('labels:ico'),
        sortable: false,
        editable: companies?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(row, CompanyItems.Ico, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <CompaniesSearchField
              {...params}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Vat, 140, 'left'),
        headerName: t('labels:vat'),
        sortable: false,
        editable: companies?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(row, CompanyItems.Vat, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <CompaniesInputField
              {...params}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Address, 320, 'left'),
        headerName: t('labels:address'),
        editable: companies?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, CompanyFull>) => {
          const error = await processValidation(row, CompanyItems.Address, props.value);
          return { ...props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<CompanyFull, string | number>) => {
          return (
            <CompaniesInputField
              {...params}
            />
          );
        },
      },
      {
        ...columnSettings(CompanyItems.Country, 200),
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
        ...columnSettings(CompanyItems.CreatedAt, 180),
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
