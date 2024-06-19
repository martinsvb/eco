import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridRowModes, useGridApiRef } from '@mui/x-data-grid';
import * as qs from 'qs';
import { UserItems } from '@eco/types';
import { apiGetUsers, selectUsers, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getDataGridSx, getDataGridWrapperSx, useDialog } from '../components';
import { useMobilePortraitDetection } from '../hooks';
import { UsersErrors, initUsersErrors, useUsersColumns } from './useUsersColumns';
import { UsersColumnMenu } from './UsersColumnMenu';
import UsersButtons from './UsersButtons';
import UsersDialog from './UsersDialog';
import { useUsersHandlers } from './useUsersHandlers';
import { UsersToolbar } from './UsersToolbar';

export const Users = () => {

  const { t } = useTranslation();

  const theme = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const [ errors, setErrors ] = useState<UsersErrors>(initUsersErrors);

  const dispatch = useAppDispatch();

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  const apiRef = useGridApiRef();

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

  const { open, setOpen, dialogItemId, handleClickOpen, handleClose } = useDialog();

  const { columns, rowModesModel, setRowModesModel } = useUsersColumns(apiRef, handleClickOpen, errors, setErrors);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useUsersHandlers(apiRef, setRowModesModel, setOpen, setErrors, dialogItemId);

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users')}</Typography>
      <Box sx={getDataGridWrapperSx(theme, isMobilePortrait)}>
        <DataGrid
          apiRef={apiRef}
          rows={users}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          rowModesModel={rowModesModel}
          {...dataGridHandlers}
          getRowHeight={({id}) => {
            return apiRef.current.getRowMode(id) === GridRowModes.Edit ? 62 : 52
          }}
          slots={{
            columnMenu: UsersColumnMenu,
            toolbar: UsersToolbar,
          }}
          sx={getDataGridSx(theme.palette, isMobilePortrait)}
        />
      </Box>
      <UsersButtons
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        handleNew={handleNew}
      />
      <UsersDialog
        isLoading={isLoading}
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};
