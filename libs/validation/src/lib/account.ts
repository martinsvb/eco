import * as yup from "yup";
import i18n from '@eco/locales';
import { AccountItems } from '@eco/types';

export const getAccountValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [AccountItems.name]: yup.string()
      .required(t('validation:required', {Field: t('labels:name')})),
    [AccountItems.iban]: yup.string()
      .required(t('validation:required', {Field: t('labels:iban')}))
      .min(24, t('validation:minLength', {length: 24}))
      .max(34, t('validation:maxLength', {length: 34})),
    [AccountItems.number]: yup.string()
      .required(t('validation:required', {Field: t('labels:accountNumber')})),
    [AccountItems.bic]: yup.string()
      .required(t('validation:required', {Field: t('labels:bic')})),
    [AccountItems.currency]: yup.string()
      .required(t('validation:required', {Field: t('labels:currency')})),
    [AccountItems.description]: yup.string(),
  });
}
