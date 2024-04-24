import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Fab, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridEventListener,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { nanoid } from '@reduxjs/toolkit';
import { selectUsers, useAppDispatch, useShallowEqualSelector, apiGetUsers } from '@eco/redux';
import { ScopeItems } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';
import { useUsersColumns } from './UsersColumns';

export const Users = () => {

  const { t } = useTranslation();

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isMobilePortrait = useMediaQuery((theme: Theme) => {
    return `${theme.breakpoints.down('sm')} and (orientation: portrait)`
  });

  useEffect(
    () => {
      if (!loaded) {
        dispatch(apiGetUsers(''));
      }
    },
    [loaded, dispatch]
  );

  const handleNew = useCallback(
    () => {
      const id = nanoid();
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    },
    [navigate]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  const { columns, rowModesModel, setRowModesModel } = useUsersColumns();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    return { ...newRow, isNew: false };
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users:title')}</Typography>
      <>
        <Box
          sx={{
            height: `calc(100vh - ${isMobilePortrait ? 200 : 180}px)`,
            width: `calc(100vw - ${isMobilePortrait ? 100 : 350}px)`,
            boxShadow: 2,
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            editMode="row"
            loading={isLoading}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
          />
        </Box>
        <Buttons
          isLoading={isLoading}
          scope={ScopeItems.Accounts}
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
              aria-label={t('users:createAccount')}
              onClick={handleNew}
              color='primary'
            >
              <AddIcon />
            </Fab>
          }
        />
      </>
    </>
  );
};
