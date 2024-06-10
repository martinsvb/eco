import * as yup from "yup";
import i18n from '@eco/locales';
import { CompanyItems } from '@eco/types';

export const getCompanyEditValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [CompanyItems.Name]: yup.string()
      .required(t('validation:required', {Field: t('labels:name')})),
    [CompanyItems.Country]: yup.string()
      .required(t('validation:required', {Field: t('labels:country')})),
    [CompanyItems.Email]: yup.string().nullable()
      .email(t('validation:email')),
    [CompanyItems.Address]: yup.string().nullable(),
    [CompanyItems.Ico]: yup.string().nullable(),
    [CompanyItems.Vat]: yup.string().nullable(),
  });
}
