import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import * as qs from 'qs';
import { ErrorItems } from '@eco/types';
import { apiGetErrors, selectErrors, setErrorsFilterData, useAppDispatch, useShallowEqualSelector } from '@eco/redux';
import { getDataGridSx, getDataGridWrapperSx } from '../components';
import { useMobilePortraitDetection } from '../hooks';
import { useErrorsColumns } from './useErrorsColumns';
import ErrorsButtons from './ErrorsButtons';
import { useErrorsHandlers } from './useErrorsHandlers';
import { ErrorsColumnMenu } from './ErrorsColumnMenu';

export const Errors = () => {

  const { t } = useTranslation();

  const theme = useTheme();

  const isMobilePortrait = useMobilePortraitDetection();

  const dispatch = useAppDispatch();

  const { errors, isLoading, loaded } = useShallowEqualSelector(selectErrors);

  const { search } = useLocation();

  const filter = qs.parse(search.substring(1));

  const apiRef = useGridApiRef();

  useEffect(
    () => { 
      if (!loaded) {
        dispatch(apiGetErrors(''));
      }
    },
    [loaded, dispatch]
  );

  useEffect(
    () => { 
      if (!!filter[ErrorItems.Id] || !!filter[ErrorItems.Name] || !!filter[ErrorItems.Email]) {
        dispatch(setErrorsFilterData(filter));
      }
    },
    [filter, dispatch]
  );

  const { columns } = useErrorsColumns();

  const {
    dataGridHandlers,
    handleRefresh
  } = useErrorsHandlers();

  return (
    <>
      <Typography variant='h3' mb={3}>{t('errors')}</Typography>
      <Box sx={getDataGridWrapperSx(theme, isMobilePortrait)}>
        <DataGrid
          apiRef={apiRef}
          rows={errors}
          columns={columns}
          editMode="row"
          filterMode="server"
          loading={isLoading}
          {...dataGridHandlers}
          slots={{
            columnMenu: ErrorsColumnMenu,
          }}
          sx={getDataGridSx(theme.palette, isMobilePortrait)}
        />
      </Box>
      <ErrorsButtons
        isLoading={isLoading}
        handleRefresh={handleRefresh}
      />
    </>
  );
};
