import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { selectUsers, useShallowEqualSelector } from '@eco/redux';
import { useUsersColumns } from './useUsersColumns';
import { useDialog } from '../components/dialog/AppDialog';
import { UsersColumnMenu } from './UsersColumnMenu';
import { getDataGridSx, getDataGridWrapperSx } from '../components/dataGrid/design';
import UsersButtons from './UsersButtons';
import UsersDialog from './UsersDialog';
import { useUsersHandlers } from './useUsersHandlers';
import { useMobilePortraitDetection } from '../hooks/useMobileDetection';

export const Users = () => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const { open, setOpen, dialogItemId, handleClickOpen, handleClose } = useDialog();

  const { columns, rowModesModel, setRowModesModel } = useUsersColumns(handleClickOpen);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useUsersHandlers(loaded, setRowModesModel, setOpen, dialogItemId);

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
