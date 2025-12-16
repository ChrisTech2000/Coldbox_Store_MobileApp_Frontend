import { LanguageManager } from '#i18n/utils';

const PINNED_COUNTRIES = ['Nigeria', 'India'];

export function customCountrySort(a: string, b: string) {
  const pinnedIndexA = PINNED_COUNTRIES.indexOf(a);
  const pinnedIndexB = PINNED_COUNTRIES.indexOf(b);

  if (pinnedIndexA !== -1 && pinnedIndexB === -1) {
    return -1;
  } else if (pinnedIndexA === -1 && pinnedIndexB !== -1) {
    return 1;
  } else if (pinnedIndexA !== -1 && pinnedIndexB !== -1) {
    return pinnedIndexA - pinnedIndexB;
  }

  const locale = LanguageManager.read();
  return a.localeCompare(b, locale, { sensitivity: 'base' });
}
