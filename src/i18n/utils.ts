import moize from 'moize';
import ms from 'ms';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TOptions } from 'i18next';
import type { Locale } from 'date-fns';
import { formatDate } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { enGB as englishLocale } from 'date-fns/locale/en-GB';
import { hi as hindiLocale } from 'date-fns/locale/hi';

import { mmkv } from '#stores/lib/storage';
import type { TranslationPaths } from './index';
import { APP_LOCALES, type TranslationLocales } from './constants';

///
// Storage Manager
///

const _memoizedRead = moize(() => mmkv.getString('i18n-locale'), { maxAge: ms('4 seconds') });

export class LanguageStorage {
  static persist(value: string) {
    mmkv.set('i18n-locale', value);
  }

  static read() {
    const value = _memoizedRead() ?? APP_LOCALES.ENGLISH;
    return value as TranslationLocales;
  }
}

///
// Translation Related
///

type Path = TranslationPaths | [basePath: TranslationPaths, dynamicKey: string];
type ZodResolverCb<T> = (zod: typeof z, t: T) => z.ZodSchema;

export function useTranslationUtils() {
  const { t, i18n } = useTranslation();

  const _translation = useCallback(
    (path: Path, opts?: TOptions) => t(typeof path === 'string' ? path : path.join('.'), opts),
    []
  );

  const _fireMutation = useCallback(async (locale: TranslationLocales) => {
    try {
      await i18n.changeLanguage(locale);
    } catch {
      // silent error
    }
  }, []);

  const _zodResolver = useMemo(() => {
    return (cb: ZodResolverCb<typeof _translation>) => {
      const schema = cb(z, _translation);
      return zodResolver(schema);
    };
  }, []);

  return { t: _translation, mutate: _fireMutation, zodResolver: _zodResolver };
}

///
// Date Format Related
///

function _derivedLocale(): Locale {
  switch (LanguageStorage.read()) {
    case 'hi':
      return hindiLocale;
    default:
      return englishLocale;
  }
}

type Options = Parameters<typeof formatDate>[2];

export function dateFmt(timestamp: string, dateFormat?: string, opts?: Options): string {
  return formatDate(parseISO(timestamp), dateFormat ?? 'dd/mm/yyyy', {
    ...opts,
    locale: _derivedLocale(),
  });
}
