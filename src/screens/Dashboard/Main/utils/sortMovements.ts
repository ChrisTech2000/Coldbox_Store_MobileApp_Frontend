import { GetMovementsHistoryResponse } from '#types/api.responses';
import { ESortingOptions } from '../History/components/SortMenu';

type Movement = GetMovementsHistoryResponse[number];

export function sortMovements(a: Movement, b: Movement, sorting: ESortingOptions): number {
  switch (sorting) {
    case ESortingOptions.CROP_TYPE:
      return a.movementCrops[0].name
        .toLowerCase()
        .localeCompare(b.movementCrops[0].name.toLowerCase());
    case ESortingOptions.MOVEMENT_DATE:
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    case ESortingOptions.MOVEMENT_DATE_REVERSE:
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    case ESortingOptions.CHECK_IN_FIRST:
      return new Date(a.checkinDate).getTime() - new Date(b.checkinDate).getTime();
    case ESortingOptions.CHECK_OUT_FIRST:
      return new Date(b.checkinDate).getTime() - new Date(a.checkinDate).getTime();
    default:
      return 0;
  }
}
