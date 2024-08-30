import { I18nManager } from 'react-native';
import i18n, { type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import type { RecursiveKeyOf } from '#types/miscellaneous';
import englishTranslations, { type Translations } from './transl/en';
import hindiTranslations from './transl/hi';
import portugueseTranslations from './transl/pt';
import { APP_LOCALES } from './constants';
import { LanguageStorage } from './utils';

export type TranslationPaths = RecursiveKeyOf<Translations>;

const systemLocale = getLocales().at(0);

export const isRTL = systemLocale?.isRTL ?? false;

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

function _optionsFactory() {
  const initialLanguage = LanguageStorage.read();
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
    },
    lng: initialLanguage,
    fallbackLng: APP_LOCALES.ENGLISH,
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
i18n.on('languageChanged', LanguageStorage.persist);

export default i18n;
