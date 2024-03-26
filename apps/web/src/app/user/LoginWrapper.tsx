import { ReactNode } from 'react';
import { selectIsUserLoggedIn, useShallowEqualSelector } from '@eco/redux';
import LoginButton from './LoginButton';
import { Stack, Typography } from '@mui/material';
import RegisterButton from './RegistrationButton';

interface LoginWrapperProps {
  children: ReactNode;
}

const LoginWrapper = ({children}: LoginWrapperProps) => {

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  return (
    isUserLoggedIn ?
      children
      :
      <Stack direction="row" justifyContent="flex-start">
        <LoginButton />
        <Typography variant='h6' mx={1}>/</Typography>
        <RegisterButton />
      </Stack>
  );
}

export default LoginWrapper;
