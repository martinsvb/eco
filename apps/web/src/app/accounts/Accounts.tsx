import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import { ApiOperations } from '@eco/types';
import { routes } from '@eco/config';
import {
  useShallowEqualSelector,
  useAppDispatch,
  selectAccounts,
  apiGetAccounts,
  selectIsUserLoggedIn,
  useAppSelector,
  selectIsAccountsLoading
} from '@eco/redux';
import LoginWrapper from '../user/LoginWrapper';

export const Accounts = () => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  const accounts = useShallowEqualSelector(selectAccounts);

  const isLoading = useAppSelector((state) => selectIsAccountsLoading(state, ApiOperations.getList));

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
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant='h3'>{t('accounts:title')}</Typography>
        {isLoading ?
          <CircularProgress
            sx={{
              alignSelf: 'baseline'
            }}
          />
          :
          isUserLoggedIn && 
            <Box>
              <IconButton
                aria-label={t('accounts:createAccount')}
                onClick={handleNew}
                sx={{
                  alignSelf: 'baseline'
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                aria-label={t('accounts:refresh')}
                onClick={handleRefresh}
                sx={{
                  alignSelf: 'baseline'
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
        }
      </Stack>
      <LoginWrapper>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {accounts.map(({name, iban}) => (
            <Grid key={iban} xl={3} lg={4} md={6} xs={12}>
              <Card variant="outlined" sx={{mb: 2}}>
                <CardContent>
                  <Typography variant="h5" component="div" mb={1}>
                    {name}
                  </Typography>
                  <Typography variant='body1' color="text.secondary" gutterBottom>
                    {iban}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </LoginWrapper>
    </Box>
  );
};
