import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Fab, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { routes } from '@eco/config';
import {
  useShallowEqualSelector,
  useAppDispatch,
  selectAccounts,
  apiGetAccounts,
  selectIsUserLoggedIn,
  useAppSelector,
} from '@eco/redux';
import LoginWrapper from '../user/LoginWrapper';
import { Buttons } from '../components/buttons/Buttons';
import { AccountItem } from './AccountItem';

export const Accounts = () => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { accounts, isLoading } = useShallowEqualSelector(selectAccounts);

  useEffect(
    () => {
      if (isUserLoggedIn && !accounts.length) {
        dispatch(apiGetAccounts(''));
      }
    },
    [accounts, isUserLoggedIn, dispatch]
  );

  const handleNew = useCallback(
    () => {
      navigate(`${routes.base}${routes.accountsNew}`);
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
      <LoginWrapper>
        <>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {accounts.map((account) => (
              <Grid key={account.id} xl={3} lg={4} md={6} xs={12}>
                <AccountItem {...account} />
              </Grid>
            ))}
          </Grid>
          <Buttons>
            {isLoading ?
              <CircularProgress
                sx={{
                  alignSelf: 'baseline'
                }}
              />
              :
              isUserLoggedIn && 
                <Stack alignItems='center'>
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
                  <Fab
                    aria-label={t('accounts:createAccount')}
                    onClick={handleNew}
                    color='primary'
                  >
                    <AddIcon />
                  </Fab>
                </Stack>
            }
          </Buttons>
        </>
      </LoginWrapper>
    </>
  );
};
