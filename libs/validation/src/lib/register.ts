import * as yup from "yup";
import i18n from '@eco/locales';
import { CompanyItems, RegistrationItems, UserItems, VerificationItems } from '@eco/types';

export const getRegistrationValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [UserItems.Name]: yup.string(),
    [UserItems.Email]: yup.string()
      .email(t('validation:email'))
      .required(t('validation:required', {Field: t('labels:email')})),
    [UserItems.Password]: yup.string()
      .required(t('validation:required', {Field: t('labels:password')})),
    [UserItems.PasswordConfirmation]: yup.string()
      .required(t('validation:required', {Field: t('labels:passwordConfirmation')}))
      .oneOf(
        [yup.ref(UserItems.Password)],
        t('validation:equal', {Field: t('labels:password')})
      ),
    [RegistrationItems.companyName]: yup.string()
      .required(t('validation:required', {Field: t('labels:companyName')})),
    [CompanyItems.Country]: yup.string()
      .required(t('validation:required', {Field: t('labels:country')})),
    [CompanyItems.Address]: yup.string().nullable(),
    [CompanyItems.Ico]: yup.string().nullable(),
    [CompanyItems.Vat]: yup.string().nullable(),
  });
}

export const getVerificationValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [VerificationItems.otp]: yup.number()
      .required(t('validation:required', {Field: t('labels:otp')})),
  });
}
