import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LANGUAGES } from './languages';
import labelsCs from './locales-cs-labels.json';
import translationCs from './locales-cs-translation.json';
import labelsEn from './locales-en-labels.json';
import translationEn from './locales-en-translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.on('languageChanged', (lng: string) => {
  localStorage.setItem('i18nextLng', lng);
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      cs: {
        translation: translationCs,
        labels: labelsCs,
      },
      en: {
        translation: translationEn,
        labels: labelsEn,
      },
    },
    fallbackLng: LANGUAGES.cs,
    interpolation: {
      // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      escapeValue: false,
    },
    returnNull: false
  })
  .then();

export default i18n;
