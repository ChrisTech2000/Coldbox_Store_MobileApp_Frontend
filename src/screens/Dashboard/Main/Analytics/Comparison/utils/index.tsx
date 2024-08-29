import { ESortingOptions } from '../components/SortMenu';

export function sortData<T extends { sum: number; coolingUnitName: string }>(
  data: T[],
  sorting: ESortingOptions
) {
  return data.sort((a, b) => {
    switch (sorting) {
      case ESortingOptions.ASCENDING:
        return a.sum - b.sum;
      case ESortingOptions.DESCENDING:
        return b.sum - a.sum;
      case ESortingOptions.COOLING_UNIT:
        return a.coolingUnitName.localeCompare(b.coolingUnitName);
      default:
        return 0;
    }
  });
}
