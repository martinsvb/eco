import * as yup from "yup";
import i18n from '@eco/locales';
import { LoginItems } from '@eco/types';

export const getLoginValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [LoginItems.email]: yup.string()
      .email(t('validation:email'))
      .required(t('validation:required', {Field: t('labels:email')})),
    [LoginItems.password]: yup.string()
      .required(t('validation:required', {Field: t('labels:password')})),
  });
}
