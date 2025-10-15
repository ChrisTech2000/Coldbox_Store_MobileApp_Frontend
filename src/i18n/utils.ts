import { zodResolver } from '@hookform/resolvers/zod';
import { isValid, type Locale } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { enGB as englishLocale } from 'date-fns/locale/en-GB';
import { fr as frenchLocale } from 'date-fns/locale/fr';
import { gu as gujaratiLocale } from 'date-fns/locale/gu';
import { hi as hindiLocale } from 'date-fns/locale/hi';
import { ar as arabicLocale } from 'date-fns/locale/ar';
import { pt as portugueseLocale } from 'date-fns/locale';
import { parseISO } from 'date-fns/parseISO';
import type { TOptions } from 'i18next';
import moize from 'moize';
import ms from 'ms';
import { useCallback, useMemo } from 'react';
import { I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getLocales, getTimeZone } from 'react-native-localize';
import { z } from 'zod';
import RNRestart from 'react-native-restart';

import type { RecursiveKeyOf } from '#types/miscellaneous';
import { mmkv } from '#stores/lib/storage';

import type { Translations } from './transl/en';
import { APP_LOCALES, DEFAULT_APP_LOCALE, type TranslationLocales } from './constants';
import { ha as hausaLocale } from './plugins/ha';
import { ig as igboLocale } from './plugins/ig';
import { or as oriyaLocale } from './plugins/or';
import { yo as yorubaLocale } from './plugins/yo';

export type TranslationPaths = RecursiveKeyOf<Translations>;

///
// Storage Manager
///

let _currentDateFnsLocale: Locale;

export class LanguageManager {
  private static readonly _KEY = 'i18n-locale';
  private static readonly _locales = new Set<string>(Object.values(APP_LOCALES));
  private static readonly _rtlLocales = new Set<string>([APP_LOCALES.ARABIC]);

  public static initializeLanguage(): TranslationLocales {
    const language = LanguageManager.read();
    LanguageManager._setLayoutDirection(language);
    LanguageManager._setDateFnsLocale(language);
    return language;
  }

  public static onLanguageChange(language: string): void {
    const validatedLanguage = LanguageManager.safeValue(language);
    mmkv.set(LanguageManager._KEY, validatedLanguage);
    LanguageManager._getPersistedValue.clear();
    LanguageManager._setLayoutDirection(validatedLanguage);
    LanguageManager._setDateFnsLocale(validatedLanguage);
  }

  public static read(): TranslationLocales {
    const storedLanguage = LanguageManager._getPersistedValue();
    const preferredLanguage = storedLanguage || LanguageManager._derivedSystemLocale();
    return LanguageManager.safeValue(preferredLanguage);
  }

  public static safeValue(locale?: string): TranslationLocales {
    if (locale && LanguageManager._locales.has(locale)) {
      return locale as TranslationLocales;
    }
    return DEFAULT_APP_LOCALE;
  }

  public static get isRTL(): boolean {
    return this._rtlLocales.has(LanguageManager.read());
  }

  private static _setDateFnsLocale(locale: TranslationLocales): void {
    const _localeMap: Record<TranslationLocales, Locale> = {
      hi: hindiLocale,
      pt: portugueseLocale,
      gu: gujaratiLocale,
      fr: frenchLocale,
      ha: hausaLocale,
      ig: igboLocale,
      or: oriyaLocale,
      yo: yorubaLocale,
      en: englishLocale,
      ar: arabicLocale,
    };
    _currentDateFnsLocale = _localeMap[locale];
  }

  private static _getPersistedValue = moize(() => mmkv.getString(LanguageManager._KEY), {
    maxAge: ms('3 seconds'),
  });

  private static _derivedSystemLocale = moize(() => getLocales().at(0)?.languageCode, {
    maxAge: ms('3 seconds'),
  });

  private static _setLayoutDirection(locale: string): void {
    const isRTL = this._rtlLocales.has(locale);
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      RNRestart.restart();
    }
  }
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

type Options = Parameters<typeof formatInTimeZone>[3];

export function dateFmt(
  timestamp: string | number | Date,
  dateFormat = 'dd/MM/yyyy',
  opts?: Options
): string {
  const d =
    timestamp instanceof Date
      ? timestamp
      : typeof timestamp === 'number'
        ? new Date(timestamp) // epoch ms
        : parseISO(timestamp); // string → Date

  if (!isValid(d)) return '';

  const timeZone = getTimeZone();
  const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const zoneToUse = timeZone || defaultTimeZone;

  try {
    return formatInTimeZone(d, zoneToUse, dateFormat ?? 'dd/MM/yyyy', {
      ...opts,
      locale: _currentDateFnsLocale,
    });
  } catch {
    return '';
  }
}
