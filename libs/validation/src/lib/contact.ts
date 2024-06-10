import * as yup from "yup";
import i18n from '@eco/locales';
import { ContactItems } from '@eco/types';

export const getContactEditValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [ContactItems.Name]: yup.string()
      .required(t('validation:required', {Field: t('labels:name')})),
    [ContactItems.Country]: yup.string()
      .required(t('validation:required', {Field: t('labels:country')})),
    [ContactItems.Email]: yup.string().nullable()
      .email(t('validation:email')),
    [ContactItems.Phone]: yup.string().nullable(),
    [ContactItems.Address]: yup.string().nullable(),
    [ContactItems.Ico]: yup.string().nullable(),
    [ContactItems.Vat]: yup.string().nullable(),
  });
}
