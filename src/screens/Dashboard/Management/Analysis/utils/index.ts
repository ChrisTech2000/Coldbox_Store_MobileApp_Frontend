import { GetMovementsHistoryResponse } from '#types/api.responses';
import { ESortingOptions } from '#screens/Dashboard/Main/History/components/SortMenu';

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
    case ESortingOptions.COOLING_USER_NAME:
      return a.owner.toLowerCase().localeCompare(b.owner.toLowerCase());
    default:
      return 0;
  }
}
