import * as yup from "yup";
import i18n from '@eco/locales';
import { ContactItems } from '@eco/types';
import { testIco } from "./helpers/ico";
import { testDic } from "./helpers/dic";

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
    [ContactItems.Ico]: yup.string().nullable().test(
      ContactItems.Ico,
      t('validation:icoFormat'),
      testIco
    ),
    [ContactItems.Vat]: yup.string().nullable().test(
      ContactItems.Vat,
      t('validation:vatFormat'),
      testDic
    ),
  });
}
