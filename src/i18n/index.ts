import { useEffect, useState } from 'react';
import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ENVIRONMENT } from '#constants/environment';

import { APP_LOCALES, DEFAULT_APP_LOCALE } from './constants';
import englishTranslations from './transl/en';
import frenchTranslations from './transl/fr';
import gujaratiTranslations from './transl/gu';
import hindiTranslations from './transl/hi';
import oriyaTranslations from './transl/or';
import portugueseTranslations from './transl/pt';
import hausaTranslations from './transl/ha';
import igboTranslations from './transl/ig';
import yorubaTranslations from './transl/yo';
import arabicTranslations from './transl/ar';

import { LanguageManager } from './utils';

async function _initializeI18nConfiguration(): Promise<void> {
  const initialLanguage = LanguageManager.initializeLanguage();

  if (!i18n.isInitialized) {
    i18n.use(initReactI18next);
  }

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
      [APP_LOCALES.ARABIC]: {
        translation: arabicTranslations,
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
    debug: typeof ENVIRONMENT === 'string' && ENVIRONMENT === 'development',
    compatibilityJSON: 'v3',
  } satisfies InitOptions);

  i18n.on('languageChanged', LanguageManager.onLanguageChange);
}

export function useI18n(): boolean {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function bootstrap(): Promise<void> {
      await _initializeI18nConfiguration();
      setIsReady(true);
    }
    void bootstrap();
  }, []);

  return isReady;
}
