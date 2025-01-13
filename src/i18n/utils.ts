import { zodResolver } from '@hookform/resolvers/zod';
import type { Locale } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { enGB as englishLocale } from 'date-fns/locale/en-GB';
import { fr as frenchLocale } from 'date-fns/locale/fr';
import { gu as gujaratiLocale } from 'date-fns/locale/gu';
import { hi as hindiLocale } from 'date-fns/locale/hi';
import { pt as portugueseLocale } from 'date-fns/locale';
import { parseISO } from 'date-fns/parseISO';
import type { TOptions } from 'i18next';
import moize from 'moize';
import ms from 'ms';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocales, getTimeZone } from 'react-native-localize';
import { z } from 'zod';

import { mmkv } from '#stores/lib/storage';

import { APP_LOCALES, DEFAULT_APP_LOCALE, type TranslationLocales } from './constants';
import type { TranslationPaths } from './index';
import { ha as hausaLocale } from './plugins/ha';
import { ig as igboLocale } from './plugins/ig';
import { or as oriyaLocale } from './plugins/or';
import { yo as yorubaLocale } from './plugins/yo';

///
// Storage Manager
///

export class LanguageManager {
  private static readonly _KEY = 'i18n-locale';
  private static readonly _locales = new Set<string>(Object.values(APP_LOCALES));

  public static persist(language: string): void {
    mmkv.set(LanguageManager._KEY, language);
  }

  public static read(useCache = true): TranslationLocales {
    const storedValue = useCache
      ? LanguageManager._getCachedValue()
      : LanguageManager._getPersistedValue();
    const languageToUse = storedValue || LanguageManager._derivedSystemLocale();
    return LanguageManager.safeValue(languageToUse);
  }

  public static safeValue(locale?: string): TranslationLocales {
    if (locale && LanguageManager._locales.has(locale)) {
      return locale as TranslationLocales;
    }
    return DEFAULT_APP_LOCALE;
  }

  private static _getPersistedValue(): string | undefined {
    return mmkv.getString(LanguageManager._KEY);
  }

  private static _getCachedValue = moize(LanguageManager._getPersistedValue, {
    maxAge: ms('3 seconds'),
  });

  private static _derivedSystemLocale = moize(
    () => {
      const devicePrimaryLocale = getLocales().at(0);
      return devicePrimaryLocale?.languageCode;
    },
    { maxAge: ms('3 seconds') }
  );
}

///
// Translation Related
///

type ZodResolverCb<T> = (zod: typeof z, t: T) => z.ZodSchema;
export type Path = TranslationPaths | [basePath: TranslationPaths, dynamicKey: string];
export type Translator = (path: Path, opts?: TOptions) => string;

export function useTranslationUtils() {
  const { t, i18n } = useTranslation();

  const _translation = useCallback(
    (path: Path, opts?: TOptions): string =>
      t(typeof path === 'string' ? path : path.join('.'), opts),
    []
  );

  const _fireMutation = useCallback(async (locale: TranslationLocales) => {
    try {
      const language = LanguageManager.safeValue(locale);
      await i18n.changeLanguage(language);
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
  switch (LanguageManager.read()) {
    case 'hi':
      return hindiLocale;
    case 'pt':
      return portugueseLocale;
    case 'gu':
      return gujaratiLocale;
    case 'fr':
      return frenchLocale;
    case 'ha':
      return hausaLocale;
    case 'ig':
      return igboLocale;
    case 'or':
      return oriyaLocale;
    case 'yo':
      return yorubaLocale;
    default:
      return englishLocale;
  }
}

type Options = Parameters<typeof formatInTimeZone>[3];

export function dateFmt(timestamp: string, dateFormat?: string, opts?: Options): string {
  return formatInTimeZone(parseISO(timestamp), getTimeZone(), dateFormat ?? 'dd/MM/yyyy', {
    ...opts,
    locale: _derivedLocale(),
  });
}
