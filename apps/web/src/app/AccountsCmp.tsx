import { useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  useShallowEqualSelector, useAppDispatch, selectAccounts, apiGetAccounts, selectIsUserLoggedIn
} from '@eco/redux';
import LoginWrapper from './user/LoginWrapper';

export const AccountsCmp = () => {
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
      <Typography variant='h3' mb={2}>Accounts</Typography>
      <LoginWrapper>
        {accounts.map(({name, iban}) => (
          <Card key={iban} variant="outlined" sx={{mb: 2}}>
            <CardContent>
              <Typography variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant='body1' color="text.secondary" gutterBottom>
                {iban}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </LoginWrapper>
    </Box>
  );
};
