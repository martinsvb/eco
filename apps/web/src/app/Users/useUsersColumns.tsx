import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridRowId,
  GridRenderEditCellParams,
  GridPreProcessEditCellProps
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { is, omit } from 'ramda';
import { UserFull, UserItems, UserRoles } from '@eco/types';
import { cancelUser, selectUserAuth, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getUserEditValidationSchema } from '@eco/validation';
import { AppAvatar, AppGridButton, AppGridPhoneField, DialogClickOpen } from '../components';
import { columnSettings, setRowMode } from '../helpers';

interface UsersColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

const userSchema = getUserEditValidationSchema();

export const useUsersColumns = (handleClickOpen: DialogClickOpen): UsersColumns => {

  const { t } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const [ errors, setErrors ] = useState({});

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
      setErrors({});
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

  const processValidation = async (row: UserFull, item: UserItems, value?: string) => {
    let message: string | undefined = undefined;
    try {
      await userSchema.validate({
        ...row,
        [item]: value
      }, {
        stripUnknown: true
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
        editable: users?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, UserFull>) => {
          const error = await processValidation(row, UserItems.Name, props.value);
          return { ...props, error };
        },
      },
      {
        ...columnSettings(UserItems.Email, 220, 'left'),
        headerName: t('labels:email'),
        editable: users?.edit,
        preProcessEditCellProps: async ({props, row}: GridPreProcessEditCellProps<string, UserFull>) => {
          const error = await processValidation(row, UserItems.Email, props.value);
          return { ...props, error };
        },
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
        sortable: false,
        disableColumnMenu: true,
        editable: users?.edit,
        renderEditCell: (params: GridRenderEditCellParams<UserFull, string>) => {
          return (
            <AppGridPhoneField
              {...params}
            />
          );
        },
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
