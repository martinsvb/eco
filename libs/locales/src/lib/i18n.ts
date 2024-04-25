import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LocalStorageItems } from "@eco/config";
import { Languages } from './languages';
import accountsCs from './locale-cs-accounts.json';
import contentCs from './locale-cs-content.json';
import labelsCs from './locale-cs-labels.json';
import registrationCs from './locale-cs-registration.json';
import translationCs from './locale-cs-translation.json';
import validationCs from './locale-cs-validation.json';
import usersCs from './locale-cs-users.json';
import usersLibsCs from './locale-cs-usersLibs.json';
import accountsEn from './locale-en-accounts.json';
import contentEn from './locale-en-content.json';
import labelsEn from './locale-en-labels.json';
import registrationEn from './locale-en-registration.json';
import translationEn from './locale-en-translation.json';
import validationEn from './locale-en-validation.json';
import usersEn from './locale-en-users.json';
import usersLibsEn from './locale-en-usersLibs.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.on('languageChanged', (lng: string) => {
  localStorage.setItem(LocalStorageItems.Language, lng);
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
        content: contentCs,
        labels: labelsCs,
        users: usersCs,
        usersLibs: usersLibsCs,
        validation: validationCs,
      },
      en: {
        translation: translationEn,
        registration: registrationEn,
        accounts: accountsEn,
        content: contentEn,
        labels: labelsEn,
        users: usersEn,
        usersLibs: usersLibsEn,
        validation: validationEn,
      },
    },
    fallbackLng: Languages.en,
    interpolation: {
      // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      escapeValue: false,
    },
    returnNull: false
  })
  .then();

export default i18n;
