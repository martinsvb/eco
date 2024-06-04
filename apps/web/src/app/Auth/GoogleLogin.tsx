import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { getLanguageCode } from '@eco/locales';
import { apiPostLoginGoogle, setLoginGoogleError, useAppDispatch } from '@eco/redux';

const GoogleLoginCmp = () => {

  const { i18n: { language } } = useTranslation();

  const dispatch = useAppDispatch();

  const handleSuccess = useCallback(
    async ({ credential }: CredentialResponse) => {
      dispatch(
        apiPostLoginGoogle({
          idToken: credential,
          language: getLanguageCode(language),
        })
      );
    },
    [dispatch, language]
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
