import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRenderEditCellParams
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { omit } from 'ramda';
import { UserFull, UserItems, UserRoles } from '@eco/types';
import { cancelUser, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { AppAvatar, DialogClickOpen } from '../components';
import { columnSettings, setRowMode } from '../helpers/dataGrid';
import { UsersPhoneField } from './UsersPhoneField';

interface UsersColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

export const useUsersColumns = (handleClickOpen: DialogClickOpen): UsersColumns => {

  const { t } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const dispatch = useAppDispatch();

  const { rights: { scopes: { users } }, role } = useShallowEqualSelector(selectUserAuth);

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
      dispatch(cancelUser(id));
    },
    [dispatch]
  );

  const roles = useMemo(
    () => {
      return {
        [UserRoles.Reader]: t('users:roleReader'),
        [UserRoles.Editor]: t('users:roleEditor'),
        [UserRoles.ApprovalEditor]: t('users:roleApprovalEditor'),
        [UserRoles.CompanyAdmin]: t('users:roleCompanyAdmin'),
        [UserRoles.Admin]: t('users:roleAdmin'),
      } as {[key: string]: string}
    },
    [t]
  );

  return {
    columns: [
      {
        field: UserItems.Picture,
        headerName: t('labels:avatar'),
        width: 80,
        renderCell: ({row: { name, picture }}) => {
          return (
            <AppAvatar
              name={name}
              picture={picture}
              sx={{
                mt: 1,
                width: 36,
                height: 36
              }}
            />
          )
        },
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(UserItems.Name, 180, 'left'),
        headerName: t('labels:name'),
        editable: users?.edit
      },
      {
        ...columnSettings(UserItems.Email, 220, 'left'),
        headerName: t('labels:email'),
        editable: users?.edit,
      },
      {
        ...columnSettings(UserItems.IsEmailConfirmed, 80),
        headerName: t('labels:isEmailConfirmed'),
        type: 'boolean',
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(UserItems.Phone, 240),
        headerName: t('labels:phone'),
        renderEditCell: (params: GridRenderEditCellParams<UserFull, string>) => {
          return (
            <UsersPhoneField
              {...params}
            />
          );
        },
        sortable: false,
        disableColumnMenu: true,
        editable: users?.edit
      },
      {
        ...columnSettings(UserItems.Role, 200),
        headerName: t('labels:role'),
        type: 'singleSelect',
        valueOptions: Object.values(role === UserRoles.Admin ? UserRoles : omit(['Admin'], UserRoles)).map(
          (value) => ({
            label: roles[value],
            value
          })
        ),
        editable: users?.edit,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(UserItems.CreatedAt, 200),
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
