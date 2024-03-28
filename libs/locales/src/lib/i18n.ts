import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { languages } from './languages';
import accountsCs from './locale-cs-accounts.json';
import labelsCs from './locale-cs-labels.json';
import registrationCs from './locale-cs-registration.json';
import translationCs from './locale-cs-translation.json';
import validationCs from './locale-cs-validation.json';
import accountsEn from './locale-en-accounts.json';
import labelsEn from './locale-en-labels.json';
import registrationEn from './locale-en-registration.json';
import translationEn from './locale-en-translation.json';
import validationEn from './locale-en-validation.json';

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
        registration: registrationCs,
        accounts: accountsCs,
        labels: labelsCs,
        validation: validationCs,
      },
      en: {
        translation: translationEn,
        registration: registrationEn,
        accounts: accountsEn,
        labels: labelsEn,
        validation: validationEn,
      },
    },
    fallbackLng: languages.en,
    interpolation: {
      // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      escapeValue: false,
    },
    returnNull: false
  })
  .then();

export default i18n;
