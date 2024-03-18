import { useCallback } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { apiPostLoginGoogle, setLoginGoogleError, useAppDispatch } from '@eco/redux';
import { useLoginSuccess } from './useLoginSuccess';

interface GoogleLoginCmpProps {
  handleClose: () => void;
}

export const GoogleLoginCmp = ({handleClose}: GoogleLoginCmpProps) => {

  const dispatch = useAppDispatch();

  useLoginSuccess(handleClose);

  const handleSuccess = useCallback(
    async ({ credential }: CredentialResponse) => {
      dispatch(apiPostLoginGoogle({ token: credential }));
    },
    [dispatch]
  );

  const handleError = useCallback(
    () => {
      dispatch(setLoginGoogleError('Login Failed'));
    },
    [dispatch]
  );

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};
