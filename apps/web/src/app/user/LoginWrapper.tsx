import { ReactNode } from 'react';
import { selectIsUserLoggedIn, useShallowEqualSelector } from '@eco/redux';
import LoginButton from './LoginButton';

interface LoginWrapperProps {
  children: ReactNode;
}

const LoginWrapper = ({children}: LoginWrapperProps) => {

  const isUserLoggedIn = useShallowEqualSelector(selectIsUserLoggedIn);

  return (
    <>
      {isUserLoggedIn ?
        children
        :
        <LoginButton />
      }
    </>
  );
}

export default LoginWrapper;
