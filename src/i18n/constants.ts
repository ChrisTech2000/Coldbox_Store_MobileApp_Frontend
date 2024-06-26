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
