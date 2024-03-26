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
      .when(RegistrationItems.password, ([password], schema) => {
        return schema.test({
          test: passwordConfirmation => {
            return !!password && !!passwordConfirmation && password === passwordConfirmation
          },
          message: t('validation:equal', {Field1: t('labels:password'), Field2: t('labels:passwordConfirmation')})
        })
      }),
  });
}

export const getVerificationValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [VerificationItems.otp]: yup.number()
      .required(t('validation:required', {Field: t('labels:otp')})),
  });
}
