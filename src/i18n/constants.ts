import type { ValueOf } from '#types/miscellaneous';

export const APP_LOCALES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  ORIYA: 'or',
  GUJARATI: 'gu',
  FRENCH: 'fr',
  PORTUGUESE: 'pt',
  YORUBA: 'yo',
  HAUSA: 'ha',
  IGBO: 'ig',
  ARABIC: 'ar',
} as const;

export type TranslationLocales = ValueOf<typeof APP_LOCALES>;

export const DEFAULT_APP_LOCALE = APP_LOCALES.ENGLISH;
