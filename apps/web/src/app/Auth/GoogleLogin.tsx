import { memo, useCallback } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { apiPostLoginGoogle, setLoginGoogleError, useAppDispatch } from '@eco/redux';

const GoogleLoginCmp = () => {

  const dispatch = useAppDispatch();

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

export default memo(GoogleLoginCmp);
