import * as yup from "yup";
import i18n from '@eco/locales';
import { RegistrationItems, VerificationItems } from '@eco/types';

export const getRegistrationValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [RegistrationItems.name]: yup.string(),
    [RegistrationItems.email]: yup.string()
      .email(t('validation:email'))
      .required(t('validation:required', {Field: t('labels:email')})),
    [RegistrationItems.password]: yup.string()
      .required(t('validation:required', {Field: t('labels:password')})),
    [RegistrationItems.passwordConfirmation]: yup.string()
      .required(t('validation:required', {Field: t('labels:passwordConfirmation')}))
      .oneOf(
        [yup.ref(RegistrationItems.password)],
        t('validation:equal', {Field: t('labels:password')})
      ),
  });
}

export const getVerificationValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [VerificationItems.otp]: yup.number()
      .required(t('validation:required', {Field: t('labels:otp')})),
  });
}
