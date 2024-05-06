import * as yup from "yup";
import i18n from '@eco/locales';
import { UserItems, UserRoles } from '@eco/types';

export const getUserEditValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [UserItems.Name]: yup.string()
      .required(t('validation:required', {Field: t('labels:name')})),
    [UserItems.Email]: yup.string()
      .required(t('validation:required', {Field: t('labels:email')}))
      .email(t('validation:email')),
    [UserItems.Role]: yup.string<UserRoles>()
      .required(t('validation:required', {Field: t('labels:role')})),
  });
}
