import type { ValueOf } from '#types/miscellaneous';

export const APP_LOCALES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  ORIYA: 'or',
  GUJARATI: 'gu',
  FRENCH: 'fr',
  PORTUGUESE: 'pt',
} as const;

export type TranslationLocales = ValueOf<typeof APP_LOCALES>;

export const APP_LANGUAGES = {
  [APP_LOCALES.ENGLISH]: {
    value: APP_LOCALES.ENGLISH,
    label: 'English',
  },
  [APP_LOCALES.HINDI]: {
    value: APP_LOCALES.HINDI,
    label: 'Hindi',
  },
  [APP_LOCALES.ORIYA]: {
    value: APP_LOCALES.ORIYA,
    label: 'Oriya',
  },
  [APP_LOCALES.GUJARATI]: {
    value: APP_LOCALES.GUJARATI,
    label: 'Gujarati',
  },
  [APP_LOCALES.FRENCH]: {
    value: APP_LOCALES.FRENCH,
    label: 'French',
  },
  [APP_LOCALES.PORTUGUESE]: {
    value: APP_LOCALES.PORTUGUESE,
    label: 'Portuguese',
  },
} satisfies Record<TranslationLocales, { value: string; label: string }>;
