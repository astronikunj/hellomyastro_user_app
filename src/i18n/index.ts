import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './translations/en-US.json';
import hi from './translations/hi-IN.json';
import bn from './translations/bn-IN.json';
import ta from './translations/ta-IN.json';

const LANGUAGE_PREFERENCE_KEY = 'user-language';

const getSavedLanguage = async () => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    return savedLang || 'en';
  } catch (e) {
    console.warn('Error fetching saved language', e);
    return 'en';
  }
};

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  ta: { translation: ta },
};

// Main initialization function
const initI18n = async () => {
  const selectedLang = await getSavedLanguage();

  // Make sure to return the promise so caller can await
  return i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4', // needed for react-native
      resources,
      lng: selectedLang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already escapes
      },
    });
};

export { initI18n, i18n, LANGUAGE_PREFERENCE_KEY };
