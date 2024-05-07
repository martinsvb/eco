import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridRowModesModel, GridRowModes, GridColDef, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { omit } from 'ramda';
import { UserItems, UserRoles } from '@eco/types';
import { cancelUser, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { DialogClickOpen } from '../components/dialog/AppDialog';
import AppAvatar from '../components/avatar/AppAvatar';

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
      setRowModesModel((prevRowModesModel) => ({ ...prevRowModesModel, [id]: { mode: GridRowModes.View } }));
    },
    []
  );

  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel((prevRowModesModel) => ({ ...prevRowModesModel, [id]: { mode: GridRowModes.Edit } }));
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
        field: UserItems.Name,
        headerName: t('labels:name'),
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: users?.edit
      },
      {
        field: UserItems.Email,
        headerName: t('labels:email'),
        width: 220,
        align: 'left',
        headerAlign: 'left',
        editable: users?.edit,
      },
      {
        field: UserItems.IsEmailConfirmed,
        headerName: t('labels:isEmailConfirmed'),
        type: 'boolean',
        width: 80,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: UserItems.Role,
        headerName: t('labels:role'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
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
        field: UserItems.CreatedAt,
        headerName: t('labels:createdAt'),
        type: 'string',
        valueFormatter: (value) => dayjs(value).format('DD. MM. YYYY HH:mm'),
        width: 200,
        align: 'center',
        headerAlign: 'center',
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
