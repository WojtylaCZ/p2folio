import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    // keySeparator: false, // we do not use keys in form messages.welcome
    saveMissing: true,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
