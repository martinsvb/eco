import { Dispatch, MutableRefObject, SetStateAction, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';
import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridRowId,
  GridRenderEditCellParams,
  GridPreProcessEditCellProps
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { omit } from 'ramda';
import { ApiOperations, UserFull, UserItems, UserRoles } from '@eco/types';
import { cancelUser, selectUserAuth, selectUsersLoading, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getUserEditValidationSchema } from '@eco/validation';
import { AppAvatar, AppGridButton, AppGridInputField, AppGridPhoneField, DialogClickOpen } from '../components';
import { columnSettings, setRowMode } from '../helpers';
import { useNavigate } from 'react-router-dom';
import { routes } from '@eco/config';

export interface UserErrors {
  name: string;
  email: string;
}

export type UsersErrors = {
  errors: {
    [key: string]: Partial<UserErrors> | undefined;
  },
  valid: {
    [key: string]: boolean | undefined;
  },
};

export type UsersValid = {[key: string]: boolean};

interface UsersColumns {
  columns: GridColDef[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>
}

export const userSchema = getUserEditValidationSchema();

export const initUsersErrors = {
  errors: {},
  valid: {}
}

export const useUsersColumns = (
  apiRef: MutableRefObject<GridApiCommunity>,
  handleClickOpen: DialogClickOpen,
  {errors, valid}: UsersErrors,
  setErrors: Dispatch<SetStateAction<UsersErrors>>
): UsersColumns => {

  const { t } = useTranslation();

  const [ rowModesModel, setRowModesModel ] = useState<GridRowModesModel>({});

  const dispatch = useAppDispatch();

  const { rights: { scopes: { users } }, role } = useShallowEqualSelector(selectUserAuth);

  const usersLoading = useShallowEqualSelector(selectUsersLoading);

  const navigate = useNavigate();

  const handleViewClick = (id: GridRowId) => () => {
    navigate(routes.user.replace(':id', id as string));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel(setRowMode(id, GridRowModes.View));
  };

  const handleEditClick = (id: GridRowId) => async () => {
    const row = apiRef.current.getRow(id);

    let isValid = true;
    try {
      await userSchema.validate(row, {abortEarly: true, stripUnknown: true});
    }
    catch (error) {
      isValid = false;
      console.log({error})
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

    dispatch(cancelUser(id));

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

  const processValidation = async (
    item: UserItems,
    {
      id,
      hasChanged,
      props: { error, value }
    }: GridPreProcessEditCellProps<string, UserFull>
  ) => {
    if (!hasChanged) {
      return error;
    }

    const updatedRow = apiRef.current.getRowWithUpdatedValues(id, item)

    let message: string | undefined = undefined;
    let isValid = true;
    try {
      await userSchema.validate(updatedRow, {abortEarly: true, stripUnknown: true});
    }
    catch (error) {
      isValid = false;
      try {
        await userSchema.validateAt(item, {[item]: value});
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
        ...columnSettings(UserItems.Name, 200, 'left'),
        headerName: t('labels:name'),
        editable: users?.edit,
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, UserFull>) => {
          const error = await processValidation(UserItems.Name, params);
          return { ...params.props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<UserFull, string>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.name}
            />
          );
        },
      },
      {
        ...columnSettings(UserItems.Email, 200, 'left'),
        headerName: t('labels:email'),
        editable: users?.edit,
        preProcessEditCellProps: async (params: GridPreProcessEditCellProps<string, UserFull>) => {
          const error = await processValidation(UserItems.Email, params);
          return { ...params.props, error };
        },
        renderEditCell: (params: GridRenderEditCellParams<UserFull, string>) => {
          return (
            <AppGridInputField
              {...params}
              helperText={errors[params.id]?.email}
            />
          );
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
        ...columnSettings(UserItems.Note, 140, 'left'),
        headerName: t('labels:note'),
        editable: users?.edit,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        ...columnSettings(UserItems.CreatedAt, 130),
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
                  title={t('labels:save')}
                  disabled={!valid[id]}
                  label={t('labels:save')}
                  onClick={handleSaveClick(id)}
                  color="primary"
                >
                  {(usersLoading[`${ApiOperations.create}-${id}`] || usersLoading[`${ApiOperations.edit}-${id}`]) ?
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

          return users?.read && users?.edit && users?.delete
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
              : users?.read && users?.edit && !users?.delete
                ? [viewButton, editButton]
                : users?.read && !users?.edit && !users?.delete
                  ? [viewButton]
                  : []
        },
      },
    ],
    rowModesModel,
    setRowModesModel
  }
};
