import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { alpha, Fab, IconButton, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { routes } from '@eco/config';
import { useShallowEqualSelector, useAppDispatch, selectAccounts, apiGetAccounts } from '@eco/redux';
import { ScopeItems } from '@eco/types';
import { Buttons } from '../components/buttons/Buttons';
import { AccountItem } from './AccountItem';

export const Accounts = () => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { palette, shape } = useTheme();

  const { accounts, isLoading, loaded } = useShallowEqualSelector(selectAccounts);

  useEffect(
    () => {
      if (!loaded) {
        dispatch(apiGetAccounts(''));
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
      dispatch(apiGetAccounts(''));
    },
    [dispatch]
  );

  return (
    <>
      <Typography variant='h3' mb={3}>{t('accounts:title')}</Typography>
      <>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          mr={2}
          p={2}
          sx={{
            background: alpha(palette.info.light, .5),
            borderRadius: shape.borderRadius / 4
          }}
        >
          {accounts.map((account) => (
            <Grid key={account.id} xl={3} lg={4} md={6} xs={12}>
              <AccountItem {...account} />
            </Grid>
          ))}
        </Grid>
        <Buttons
          isLoading={isLoading}
          scope={ScopeItems.Accounts}
          refreshButton={
            <IconButton
              aria-label={t('accounts:refresh')}
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
              aria-label={t('accounts:createAccount')}
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
