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

  return a.localeCompare(b);
}
