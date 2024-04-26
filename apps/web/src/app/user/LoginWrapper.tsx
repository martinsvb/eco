import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { isRouteScopeAvailable } from '@eco/types';
import { selectIsUserLoggedIn, selectUserAuth, useAppSelector, useShallowEqualSelector } from '@eco/redux';
import LoginPage from './LoginPage';
import NoRights from './NoRigts';

interface LoginWrapperProps {
  children: ReactNode;
}

const LoginWrapper = ({children}: LoginWrapperProps) => {

  const { pathname } = useLocation();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { rights: { scopes } } = useShallowEqualSelector(selectUserAuth);

  return (
    isUserLoggedIn && isRouteScopeAvailable(pathname, scopes) ?
      children
      :
      isUserLoggedIn ?
        <NoRights />
        :
        <LoginPage />
  );
}

export default LoginWrapper;
