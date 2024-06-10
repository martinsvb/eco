import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as qs from 'qs';
import { ContactItems } from '@eco/types';
import { apiGetContacts, selectContacts, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getDataGridSx, getDataGridWrapperSx, useDialog } from '../components';
import { useMobilePortraitDetection } from '../hooks';
import { ContactsButtons, ContactsColumnMenu, ContactsDialog, useContactsColumns, useContactsHandlers } from '.';

export const Contacts = () => {

  const { t } = useTranslation();

  const theme = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { contacts, isLoading, loaded } = useShallowEqualSelector(selectContacts);

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  useEffect(
    () => { 
      if (!loaded) {
        dispatch(apiGetContacts(''));
      }
    },
    [loaded, dispatch]
  );

  useEffect(
    () => { 
      if (!!filter[ContactItems.Name] || !!filter[ContactItems.Country]) {
        dispatch(setFilterData(filter));
      }
    },
    [filter, dispatch]
  );

  const { open, setOpen, dialogItemId, handleClickOpen, handleClose } = useDialog();

  const { columns, rowModesModel, setRowModesModel } = useContactsColumns(handleClickOpen);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useContactsHandlers(setRowModesModel, setOpen, dialogItemId);

  return (
    <>
      <Typography variant='h3' mb={3}>{t('contacts')}</Typography>
      <Box sx={getDataGridWrapperSx(theme, isMobilePortrait)}>
        <DataGrid
          rows={contacts}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          rowModesModel={rowModesModel}
          {...dataGridHandlers}
          slots={{
            columnMenu: ContactsColumnMenu,
          }}
          sx={getDataGridSx(theme.palette, isMobilePortrait)}
        />
      </Box>
      <ContactsButtons
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        handleNew={handleNew}
      />
      <ContactsDialog
        isLoading={isLoading}
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};
