import * as yup from "yup";
import i18n from '@eco/locales';
import { ContentItems } from '@eco/types';

export const getContentValidationSchema = () => {
  const { t } = i18n;

  return yup.object().shape({
    [ContentItems.Title]: yup.string()
      .required(t('validation:required', {Field: t('labels:title')})),
    [ContentItems.Text]: yup.string().nullable(),
    [ContentItems.DateTime]: yup.date().nullable(),
  });
}
