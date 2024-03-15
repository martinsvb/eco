import { useCallback } from 'react';
import { apiPostLoginGoogle, useAppDispatch } from '@eco/redux';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

export const GoogleLoginCmp = () => {

  const dispatch = useAppDispatch();

  const handleSuccess = useCallback(
    async ({ credential }: CredentialResponse) => {
      dispatch(apiPostLoginGoogle({ token: credential }));
    },
    [dispatch]
  );

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};
