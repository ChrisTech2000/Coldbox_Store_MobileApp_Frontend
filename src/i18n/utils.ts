import i18n, { type TOptions } from 'i18next';
import type { Locale } from 'date-fns';
import { formatDate } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { enGB } from 'date-fns/locale/en-GB';

import type { TranslationPaths, TranslationLocales } from './index';

///
// Translation Related
///

export function translation(path: TranslationPaths, opts?: TOptions): string {
  return i18n.t(path, opts);
}

export function onLanguageChange(locale: TranslationLocales): void {
  i18n.changeLanguage(locale);
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
