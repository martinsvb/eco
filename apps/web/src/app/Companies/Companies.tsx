import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as qs from 'qs';
import { CompanyItems } from '@eco/types';
import { apiGetCompanies, selectCompanies, setFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getDataGridSx, getDataGridWrapperSx, useDialog } from '../components';
import { useMobilePortraitDetection } from '../hooks';
import { useCompaniesColumns } from './useCompaniesColumns';
import { CompaniesColumnMenu } from './CompaniesColumnMenu';
import CompaniesButtons from './CompaniesButtons';
import CompaniesDialog from './CompaniesDialog';
import { useCompaniesHandlers } from './useCompaniesHandlers';

export const Companies = () => {

  const { t } = useTranslation();

  const { palette } = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { companies, isLoading, loaded } = useShallowEqualSelector(selectCompanies);

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  useEffect(
    () => { 
      if (!loaded) {
        dispatch(apiGetCompanies(''));
      }
    },
    [loaded, dispatch]
  );

  useEffect(
    () => { 
      if (!!filter[CompanyItems.Name] || !!filter[CompanyItems.Country]) {
        dispatch(setFilterData(filter));
      }
    },
    [filter, dispatch]
  );

  const { open, setOpen, dialogItemId, handleClickOpen, handleClose } = useDialog();

  const { columns, rowModesModel, setRowModesModel } = useCompaniesColumns(handleClickOpen);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useCompaniesHandlers(setRowModesModel, setOpen, dialogItemId);

  return (
    <>
      <Typography variant='h3' mb={3}>{t('companies:title')}</Typography>
      <Box sx={getDataGridWrapperSx(isMobilePortrait)}>
        <DataGrid
          rows={companies}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          rowModesModel={rowModesModel}
          {...dataGridHandlers}
          slots={{
            columnMenu: CompaniesColumnMenu,
          }}
          sx={getDataGridSx(palette, isMobilePortrait)}
        />
      </Box>
      <CompaniesButtons
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        handleNew={handleNew}
      />
      <CompaniesDialog
        isLoading={isLoading}
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </>
  );
};
