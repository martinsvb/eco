import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LocalStorageItems } from "@eco/config";
import { Languages } from './languages';
import accountsCs from './locale-cs-accounts.json';
import accountsLibsCs from './locale-cs-accountsLibs.json';
import authLibsCs from './locale-cs-authLibs.json';
import companiesCs from './locale-cs-companies.json';
import contentCs from './locale-cs-content.json';
import contentLibsCs from './locale-cs-contentLibs.json';
import editorCs from './locale-cs-editor.json';
import labelsCs from './locale-cs-labels.json';
import companiesLibsCs from './locale-cs-companiesLibs.json';
import registrationCs from './locale-cs-registration.json';
import translationCs from './locale-cs-translation.json';
import validationCs from './locale-cs-validation.json';
import usersCs from './locale-cs-users.json';
import usersLibsCs from './locale-cs-usersLibs.json';
import accountsEn from './locale-en-accounts.json';
import accountsLibsEn from './locale-en-accountsLibs.json';
import contentLibsEn from './locale-en-contentLibs.json';
import editorEn from './locale-en-editor.json';
import authLibsEn from './locale-en-authLibs.json';
import companiesEn from './locale-en-companies.json';
import contentEn from './locale-en-content.json';
import labelsEn from './locale-en-labels.json';
import companiesLibsEn from './locale-en-companiesLibs.json';
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
        accountsLibs: accountsLibsCs,
        authLibs: authLibsCs,
        companies: companiesCs,
        content: contentCs,
        contentLibs: contentLibsCs,
        editor: editorCs,
        labels: labelsCs,
        companiesLibs: companiesLibsCs,
        users: usersCs,
        usersLibs: usersLibsCs,
        validation: validationCs,
      },
      en: {
        translation: translationEn,
        registration: registrationEn,
        accounts: accountsEn,
        accountsLibs: accountsLibsEn,
        authLibs: authLibsEn,
        companies: companiesEn,
        content: contentEn,
        contentLibs: contentLibsEn,
        editor: editorEn,
        labels: labelsEn,
        companiesLibs: companiesLibsEn,
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
