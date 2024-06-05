import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as qs from 'qs';
import { UserItems } from '@eco/types';
import { apiGetUsers, selectUsers, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getDataGridSx, getDataGridWrapperSx, useDialog } from '../components';
import { useMobilePortraitDetection } from '../hooks';
import { useUsersColumns } from './useUsersColumns';
import { UsersColumnMenu } from './UsersColumnMenu';
import UsersButtons from './UsersButtons';
import UsersDialog from './UsersDialog';
import { useUsersHandlers } from './useUsersHandlers';

export const Users = () => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

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

  const { columns, rowModesModel, setRowModesModel } = useUsersColumns(handleClickOpen);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useUsersHandlers(setRowModesModel, setOpen, dialogItemId);

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users:title')}</Typography>
      <Box sx={getDataGridWrapperSx(isMobilePortrait)}>
        <DataGrid
          rows={users}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          rowModesModel={rowModesModel}
          {...dataGridHandlers}
          slots={{
            columnMenu: UsersColumnMenu,
          }}
          sx={getDataGridSx(palette, isMobilePortrait)}
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
