import { DashboardProduce } from '#types/global';
import { ESortingOptions } from '../components/SortMenu';

export function sortProduces(a: DashboardProduce, b: DashboardProduce, sorting: ESortingOptions) {
  let hasMinShelfLifeA: boolean;
  let hasMinShelfLifeB: boolean;

  switch (sorting) {
    case ESortingOptions.CROP_TYPE:
      return a.cropName.toLowerCase().localeCompare(b.cropName.toLowerCase());
    case ESortingOptions.PICK_UP_TIME:
      hasMinShelfLifeA =
        Number.isInteger(a.minimumRemainingShelfLife) && a.runDt && a.qualityDt !== -1;
      hasMinShelfLifeB =
        Number.isInteger(b.minimumRemainingShelfLife) && b.runDt && b.qualityDt !== -1;

      if (!hasMinShelfLifeA && hasMinShelfLifeB) return 1;
      if (hasMinShelfLifeA && !hasMinShelfLifeB) return -1;
      if (!hasMinShelfLifeA && !hasMinShelfLifeB) return 0;

      return (
        (hasMinShelfLifeA ? a.minimumRemainingShelfLife : a.currentStorageDays) -
        (hasMinShelfLifeB ? b.minimumRemainingShelfLife : b.currentStorageDays)
      );
    case ESortingOptions.CHECK_IN_DATE:
      return (
        new Date(a.checkedInCrates[0].checkinDate).getTime() -
        new Date(b.checkedInCrates[0].checkinDate).getTime()
      );
    case ESortingOptions.CHECK_IN_DATE_REVERSE:
      return (
        new Date(b.checkedInCrates[0].checkinDate).getTime() -
        new Date(a.checkedInCrates[0].checkinDate).getTime()
      );
    case ESortingOptions.COOLING_USER:
      return a.owner.toLowerCase().localeCompare(b.owner.toLowerCase());
    default:
      return 0;
  }
}
