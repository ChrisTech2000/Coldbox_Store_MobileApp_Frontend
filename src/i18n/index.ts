import { I18nManager } from 'react-native';
import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import englishTranslations, { type Translations } from './en';
import type { RecursiveKeyOf, ValueOf } from '#ui/types/general';
import { mmkv } from '#stores/lib/storage';

export type TranslationPaths = RecursiveKeyOf<Translations>;

const systemLocale = getLocales().at(0);

export const isRTL = systemLocale?.isRTL ?? false;

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export const APP_LOCALES = {
  EN: 'en',
} as const;

export type TranslationLocales = ValueOf<typeof APP_LOCALES>;

const STORAGE_KEY = 'i18n-locale';

function _optionsFactory(): InitOptions {
  const initialLanguage = mmkv.getString(STORAGE_KEY) ?? APP_LOCALES.EN;
  return {
    resources: {
      [APP_LOCALES.EN]: {
        translation: englishTranslations,
      },
    },
    lng: initialLanguage,
    fallbackLng: APP_LOCALES.EN,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  };
}

i18n.use(initReactI18next).init(_optionsFactory());

i18n.on('languageChanged', (selectedValue) => {
  mmkv.set(STORAGE_KEY, selectedValue);
});

export default i18n;
