import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '@eco/config';
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

  if (!isRouteScopeAvailable(pathname.replace(routes.app, ''), scopes)) {
    return isUserLoggedIn
      ? <NoRights />
      : <LoginPage />
  }

  return children;
}

export default LoginWrapper;
