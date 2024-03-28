import * as yup from "yup";
import i18n from '@eco/locales';
import { AccountItems } from '@eco/types';

export const getAccountValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [AccountItems.name]: yup.string()
      .required(t('validation:required', {Field: t('labels:email')})),
    [AccountItems.iban]: yup.string()
      .required(t('validation:required', {Field: t('labels:email')})),
    [AccountItems.description]: yup.string(),
  });
}
