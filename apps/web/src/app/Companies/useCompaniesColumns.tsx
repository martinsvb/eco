import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { countries } from 'countries-list';
import dayjs from 'dayjs';
import { allowedCountries } from '@eco/config';
import { Languages } from '@eco/locales';
import { CompanyItems } from '@eco/types';
import { cancelCompany, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { DialogClickOpen } from '../components/dialog/AppDialog';
import { columnSettings, setRowMode } from '../helpers/dataGrid';

interface CompaniesColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

export const useCompaniesColumns = (handleClickOpen: DialogClickOpen): CompaniesColumns => {

  const { t, i18n: { language } } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

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

  return {
    columns: [
      {
        ...columnSettings(CompanyItems.Name, 180, 'left'),
        headerName: t('labels:name'),
        editable: companies?.edit
      },
      {
        ...columnSettings(CompanyItems.Country, 200),
        headerName: t('labels:country'),
        type: 'singleSelect',
        valueOptions: allowedCountries.map((value) => ({
          value,
          label: countries[value][language === Languages.en ? 'name' : 'native']
        })),
        editable: companies?.edit,
        sortable: true,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(CompanyItems.CreatedAt, 200),
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
              <GridActionsCellItem
                icon={<SaveIcon />}
                label={t('labels:save')}
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label={t('labels:cancel')}
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ]
            :
            [
              <GridActionsCellItem
                icon={<EditIcon />}
                label={t('labels:save')}
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label={t('labels:delete')}
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ]
        },
      },
    ],
    rowModesModel,
    setRowModesModel
  }
};
