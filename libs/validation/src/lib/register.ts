import * as yup from "yup";
import i18n from '@eco/locales';
import { RegisterItems } from '@eco/types';

export const getRegisterValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [RegisterItems.name]: yup.string(),
    [RegisterItems.email]: yup.string()
      .email(t('validation:email'))
      .required(t('validation:required', {Field: t('labels:email')})),
    [RegisterItems.password]: yup.string()
      .required(t('validation:required', {Field: t('labels:password')})),
    [RegisterItems.passwordConfirmation]: yup.string()
      .required(t('validation:required', {Field: t('labels:passwordConfirmation')}))
      .when(RegisterItems.password, ([password], schema) => {
        return schema.test({
          test: passwordConfirmation => {
            return !!password && !!passwordConfirmation && password === passwordConfirmation
          },
          message: t('validation:equal', {Field1: t('labels:password'), Field2: t('labels:passwordConfirmation')})
        })
      }),
  });
}
