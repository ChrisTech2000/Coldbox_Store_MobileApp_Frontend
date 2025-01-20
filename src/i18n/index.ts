import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { APP_LOCALES, DEFAULT_APP_LOCALE, type TranslationLocales } from './constants';
import englishTranslations from './transl/en';
import frenchTranslations from './transl/fr';
import gujaratiTranslations from './transl/gu';
import hindiTranslations from './transl/hi';
import oriyaTranslations from './transl/or';
import portugueseTranslations from './transl/pt';
import hausaTranslations from './transl/ha';
import igboTranslations from './transl/ig';
import yorubaTranslations from './transl/yo';

import { LanguageManager } from './utils';

export default async function initI18n(): Promise<TranslationLocales> {
  const initialLanguage = LanguageManager.read();

  i18n.use(initReactI18next);

  await i18n.init({
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
  } satisfies InitOptions);

  i18n.on('languageChanged', LanguageManager.persist);

  return initialLanguage;
}
