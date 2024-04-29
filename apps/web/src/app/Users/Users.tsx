import { MouseEvent, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Fab, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { GridRowModesModel, GridRowModes, DataGrid, GridRowModel, useGridApiRef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { LoadingButton } from '@mui/lab';
import * as qs from 'qs';
import { isEmpty, pick } from 'ramda';
import { getObjectDiff } from '@eco/config';
import {
  selectUsers,
  useAppDispatch,
  useShallowEqualSelector,
  apiGetUsers,
  apiPatchUser,
  apiPostUser,
  unshiftUser,
  apiDeleteUser,
  setFilterData
} from '@eco/redux';
import { ScopeItems, UserData, UserItems, getNewUserData } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';
import { useUsersColumns } from './UsersColumns';
import AppDialog, { useDialog } from '../components/dialog/AppDialog';
import { UsersColumnMenu } from './UsersColumnMenu';
import { getDataGridSx, getDataGridWrapperSx } from '../components/dataGrid/design';

export const Users = () => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const dispatch = useAppDispatch();

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`
  });

  const { open, setOpen, dialogItemId, handleClickOpen, handleClose } = useDialog();

  useEffect(
    () => { 
      if (!loaded) {
        dispatch(apiGetUsers(''));
      }
    },
    [loaded, dispatch]
  );

  useEffect(
    () => { 
      if (!!filter[UserItems.Name] || !!filter[UserItems.Email]) {
        dispatch(setFilterData(filter));
      }
    },
    [filter, dispatch]
  );

  const handleNew = useCallback(
    () => {
      const { id, data } = getNewUserData();
      dispatch(unshiftUser(data));
      setRowModesModel((oldModel) => ({
        [id]: { mode: GridRowModes.Edit, fieldToFocus: UserItems.Name },
        ...oldModel,
      }));
    },
    [dispatch]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (dialogItemId) {
        dispatch(apiDeleteUser({id: dialogItemId}));
      }
      setOpen(false);
    },
    [dispatch, dialogItemId]
  );

  const { columns, rowModesModel, setRowModesModel } = useUsersColumns(handleClickOpen);

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const items = [UserItems.Name, UserItems.Email, UserItems.Role];
    if (newRow.isNew) {
      dispatch(apiPostUser({body: pick([...items, UserItems.Origin], newRow)}));
    }
    else {
      const body = getObjectDiff<UserData>(newRow, oldRow, items);
      if (!isEmpty(body)) {
        dispatch(
          apiPatchUser({
            body: getObjectDiff<UserData>(newRow, oldRow, items),
            id: newRow.id
          })
        );
      }
    }

    return { ...newRow, isNew: undefined };
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const apiRef = useGridApiRef();

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users:title')}</Typography>
      <Box
        sx={getDataGridWrapperSx(isMobilePortrait)}
      >
        <DataGrid
          apiRef={apiRef}
          rows={users}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          slots={{
            columnMenu: UsersColumnMenu,
          }}
          sx={getDataGridSx(palette, isMobilePortrait)}
        />
      </Box>
      <Buttons
        isLoading={isLoading}
        scope={ScopeItems.Users}
        refreshButton={
          <IconButton
            aria-label={t('users:refresh')}
            onClick={handleRefresh}
            size='large'
            sx={{
              mb: 2
            }}
          >
            <RefreshIcon />
          </IconButton>
        }
        createButton={
          <Fab
            aria-label={t('users:createUser')}
            onClick={handleNew}
            color='primary'
          >
            <AddIcon />
          </Fab>
        }
      />
      <AppDialog
        actions={
          <>
            <Button
              autoFocus
              id="user-delete-button-close"
              onClick={handleClose}
            >
              {t('labels:close')}
            </Button>
            <LoadingButton
              id="user-delete-button-submit"
              loading={isLoading}
              type="submit"
              variant="contained"
              onClick={handleDelete}
            >
              {t('labels:delete')}
            </LoadingButton>
          </>
        }
        id="user-delete"
        dialogTitle={t('users:delete-question-title')}
        contentText={t('users:delete-question-text')}
        open={open}
      />
    </>
  );
};
