import * as yup from "yup";
import i18n from '@eco/locales';
import { UserItems } from '@eco/types';

export const getUserEditValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [UserItems.Name]: yup.string()
      .required(t('validation:required', {Field: t('labels:name')})),
    [UserItems.Email]: yup.string()
      .required(t('validation:required', {Field: t('labels:email')}))
      .email(t('validation:email')),
    [UserItems.PasswordOld]: yup.string(),
    [UserItems.Password]: yup.string(),
    [UserItems.PasswordConfirmation]: yup.string()
      .oneOf(
        [yup.ref(UserItems.Password)],
        t('validation:equal', {Field: t('labels:password')})
      ),
  });
}
