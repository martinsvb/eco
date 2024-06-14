import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridRowModes, useGridApiRef } from '@mui/x-data-grid';
import * as qs from 'qs';
import { CompanyItems, UserRoles } from '@eco/types';
import {
  apiGetCompanies,
  selectCompanies,
  selectUserAuth,
  setFilterData,
  useAppDispatch,
  useShallowEqualSelector
} from '@eco/redux';
import { getDataGridSx, getDataGridWrapperSx, useDialog } from '../components';
import { useMobilePortraitDetection } from '../hooks';
import {
  CompaniesButtons,
  CompaniesColumnMenu,
  CompaniesDialog,
  CompaniesErrors,
  initCompanieErrors,
  useCompaniesColumns,
  useCompaniesHandlers
} from '.';

export const Companies = () => {

  const { t } = useTranslation();

  const theme = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const [ errors, setErrors ] = useState<CompaniesErrors>(initCompanieErrors);

  const { role } = useShallowEqualSelector(selectUserAuth);

  const { companies, isLoading, loaded } = useShallowEqualSelector(selectCompanies);

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  const apiRef = useGridApiRef();

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

  const { columns, rowModesModel, setRowModesModel } = useCompaniesColumns(apiRef, handleClickOpen, errors, setErrors);

  const {
    dataGridHandlers,
    handleDelete,
    handleRefresh,
    handleNew
  } = useCompaniesHandlers(apiRef, setRowModesModel, setOpen, dialogItemId, setErrors);

  return (
    <>
      <Typography variant='h3' mb={3}>{role === UserRoles.Admin ? t('companies') : t('company')}</Typography>
      <Box sx={getDataGridWrapperSx(theme, isMobilePortrait)}>
        <DataGrid
          apiRef={apiRef}
          rows={companies}
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
            columnMenu: CompaniesColumnMenu,
          }}
          sx={getDataGridSx(theme.palette, isMobilePortrait)}
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
