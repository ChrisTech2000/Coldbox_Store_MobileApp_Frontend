import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { getLocales } from 'react-native-localize';

import type { RecursiveKeyOf } from '#types/miscellaneous';
import { APP_LOCALES, DEFAULT_APP_LOCALE } from './constants';
import englishTranslations, { type Translations } from './transl/en';
import frenchTranslations from './transl/fr';
import gujaratiTranslations from './transl/gu';
import hindiTranslations from './transl/hi';
import oriyaTranslations from './transl/or';
import portugueseTranslations from './transl/pt';
import hausaTranslations from './transl/ha';
import igboTranslations from './transl/ig';
import yorubaTranslations from './transl/yo';

import { LanguageManager } from './utils';

export type TranslationPaths = RecursiveKeyOf<Translations>;

export const isRTL = getLocales().at(0)?.isRTL ?? false;

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

function _optionsFactory() {
  const initialLanguage = LanguageManager.read();
  return {
    resources: {
      [APP_LOCALES.ENGLISH]: {
        translation: englishTranslations,
      },
      [APP_LOCALES.HINDI]: {
        translation: hindiTranslations,
      },
      [APP_LOCALES.PORTUGUESE]: {
        translation: portugueseTranslations,
      },
      [APP_LOCALES.FRENCH]: {
        translation: frenchTranslations,
      },
      [APP_LOCALES.GUJARATI]: {
        translation: gujaratiTranslations,
      },
      [APP_LOCALES.ORIYA]: {
        translation: oriyaTranslations,
      },
      [APP_LOCALES.HAUSA]: {
        translation: hausaTranslations,
      },
      [APP_LOCALES.IGBO]: {
        translation: igboTranslations,
      },
      [APP_LOCALES.YORUBA]: {
        translation: yorubaTranslations,
      },
    },
    lng: initialLanguage,
    fallbackLng: DEFAULT_APP_LOCALE,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    compatibilityJSON: 'v3',
  } satisfies InitOptions;
}

i18n.use(initReactI18next).init(_optionsFactory());
i18n.on('languageChanged', LanguageManager.persist);

export default i18n;
