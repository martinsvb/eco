import * as yup from "yup";
import i18n from '@eco/locales';
import { CompanyItems } from '@eco/types';
import { testIco } from "./helpers/ico";
import { testDic } from "./helpers/dic";

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
    [CompanyItems.Ico]: yup.string().nullable().test(
      CompanyItems.Ico,
      t('validation:icoFormat'),
      testIco
    ),
    [CompanyItems.Vat]: yup.string().nullable().test(
      CompanyItems.Vat,
      t('validation:vatFormat'),
      testDic
    ),
  });
}
