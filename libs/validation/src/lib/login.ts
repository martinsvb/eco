import * as yup from "yup";
import i18n from '@eco/locales';
import { UserItems } from '@eco/types';

export const getLoginValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [UserItems.Email]: yup.string()
      .email(t('validation:email'))
      .required(t('validation:required', {Field: t('labels:email')})),
    [UserItems.Password]: yup.string()
      .required(t('validation:required', {Field: t('labels:password')})),
  });
}
