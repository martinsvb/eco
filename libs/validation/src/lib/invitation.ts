import * as yup from "yup";
import i18n from '@eco/locales';
import { UserItems } from '@eco/types';

export const getInvitationValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [UserItems.Name]: yup.string()
      .required(t('validation:required', {Field: t('labels:name')})),
    [UserItems.Email]: yup.string()
      .required(t('validation:required', {Field: t('labels:email')}))
      .email(t('validation:email')),
    [UserItems.Password]: yup.string()
      .required(t('validation:required', {Field: t('labels:password')})),
    [UserItems.PasswordConfirmation]: yup.string()
      .required(t('validation:required', {Field: t('labels:passwordConfirmation')}))
      .oneOf(
        [yup.ref(UserItems.Password)],
        t('validation:equal', {Field: t('labels:password')})
      ),
  });
}
