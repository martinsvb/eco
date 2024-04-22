import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { t } from 'i18next';
import { selectUsers, useAppDispatch, useShallowEqualSelector, apiGetUsers } from '@eco/redux';
import { ScopeItems } from '@eco/types';
import { routes } from '@eco/config';
import { Buttons } from '../components/buttons/Buttons';

export const Users = () => {

  const { users, isLoading, loaded } = useShallowEqualSelector(selectUsers);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
      navigate(routes.accountsNew);
    },
    [navigate]
  );

  const handleRefresh = useCallback(
    () => {
      dispatch(apiGetUsers(''));
    },
    [dispatch]
  );

  return (
    <>
      <Typography variant='h3' mb={3}>{t('users:title')}</Typography>
      <>
        {users.length > 0 &&
          <div><pre>{JSON.stringify(users, undefined, 2)}</pre></div>
        }
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
