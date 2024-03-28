import { useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  useShallowEqualSelector, useAppDispatch, selectAccounts, apiGetAccounts, selectIsUserLoggedIn
} from '@eco/redux';
import LoginWrapper from '../user/LoginWrapper';
import { useTranslation } from 'react-i18next';

export const Accounts = () => {

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  const accounts = useShallowEqualSelector(selectAccounts)

  useEffect(
    () => {
      if (isUserLoggedIn && !accounts.length) {
        dispatch(apiGetAccounts(''));
      }
    },
    [accounts, isUserLoggedIn, dispatch]
  );

  return (
    <Box>
      <Typography variant='h3' mb={2}>{t('accounts:title')}</Typography>
      <LoginWrapper>
        <Grid container rowSpacing={4} columnSpacing={2}>
          {accounts.map(({name, iban}) => (
            <Grid xl={3} lg={4} md={6} xs={12}>
              <Card key={iban} variant="outlined" sx={{mb: 2}}>
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
