import { EInitiatedFor } from '#types/global';
import { GetMovementsHistoryResponse } from '#types/api.responses';

import { ESortingOptions } from '../components/SortMenu';

type Movement = GetMovementsHistoryResponse[number];

const compareByDate = (dateA: Date | undefined, dateB: Date | undefined) => {
  return new Date(dateA || 0).getTime() - new Date(dateB || 0).getTime();
};

export function sortMovements(a: Movement, b: Movement, sorting: ESortingOptions): number {
  const movementACrops = sortMovementCrops(a).join(', ');
  const movementBCrops = sortMovementCrops(b).join(', ');

  switch (sorting) {
    case ESortingOptions.CROP_TYPE:
      return movementACrops.toLowerCase().localeCompare(movementBCrops.toLowerCase());
    case ESortingOptions.MOVEMENT_DATE:
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    case ESortingOptions.MOVEMENT_DATE_REVERSE:
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    case ESortingOptions.CHECK_OUT_FIRST: {
      if (a.initiatedFor === EInitiatedFor.CHECK_OUT && b.initiatedFor !== EInitiatedFor.CHECK_OUT)
        return -1;
      if (b.initiatedFor === EInitiatedFor.CHECK_OUT && a.initiatedFor !== EInitiatedFor.CHECK_OUT)
        return 1;

      return compareByDate(b.date, a.date);
    }
    case ESortingOptions.CHECK_IN_FIRST: {
      if (a.initiatedFor === EInitiatedFor.CHECK_IN && b.initiatedFor !== EInitiatedFor.CHECK_IN)
        return -1;
      if (b.initiatedFor === EInitiatedFor.CHECK_IN && a.initiatedFor !== EInitiatedFor.CHECK_IN)
        return 1;

      return compareByDate(b.date, a.date);
    }
    default:
      return 0;
  }
}
export function sortMovementCrops(movement: Movement): Array<string> {
  let crops: string[];
  switch (movement.initiatedFor) {
    case EInitiatedFor.CHECK_IN:
      crops = _getCropNames(movement.checkin);
      break;
    case EInitiatedFor.CHECK_OUT:
      crops = _getCropNames(movement.checkout);
      break;
    default:
      crops = [..._getCropNames(movement.checkin), ..._getCropNames(movement.checkout)];
  }

  return Array.from(new Set(crops)).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

function _getCropNames(data: Movement['checkin'] | Movement['checkout']): Array<string> {
  if (!data?.crates) return [];
  return data.crates.flatMap((crate) => crate.crop?.name || []);
}
