import i18n, { type TOptions } from 'i18next';
import type { Locale } from 'date-fns';
import { formatDate } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { enGB } from 'date-fns/locale/en-GB';

import { mmkv } from '#stores/lib/storage';
import type { TranslationPaths } from './index';
import { APP_LOCALES, type TranslationLocales } from './constants';

///
// Storage Manager
///

export class LanguageStorage {
  static persist(value: string) {
    mmkv.set('i18n-locale', value);
  }

  static read() {
    const value = mmkv.getString('i18n-locale') ?? APP_LOCALES.ENGLISH;
    return value as TranslationLocales;
  }
}

///
// Translation Related
///

export function translation(path: TranslationPaths, opts?: TOptions): string {
  return i18n.t(path, opts);
}

export async function onLanguageChange(locale: TranslationLocales): Promise<void> {
  try {
    await i18n.changeLanguage(locale);
  } catch {
    // silent error
  }
}

///
// Date Format Related
///

function _derivedLocale(): Locale {
  const currentLocale = i18n.language.slice();

  const shortHand = currentLocale.includes('-')
    ? (currentLocale.split('-').at(0) as TranslationLocales)
    : (currentLocale as TranslationLocales);

  switch (shortHand) {
    default:
      return enGB;
  }
}

type Options = Parameters<typeof formatDate>[2];

export function dateFmt(timestamp: string, dateFormat?: string, opts?: Options): string {
  return formatDate(parseISO(timestamp), dateFormat ?? 'dd/mm/yyyy', {
    ...opts,
    locale: _derivedLocale(),
  });
}
