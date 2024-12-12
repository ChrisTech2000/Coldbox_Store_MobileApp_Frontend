import { EInitiatedFor } from '#types/global';
import { GetMovementsHistoryResponse } from '#types/api.responses';

import { ESortingOptions } from '../components/SortMenu';

type Movement = GetMovementsHistoryResponse[number];

const isMarketplaceOrder = (movement: Movement) =>
  movement.initiatedFor === EInitiatedFor.MARKETPLACE_ORDER;
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
      if (isMarketplaceOrder(a) && !isMarketplaceOrder(b)) return 1;
      if (!isMarketplaceOrder(a) && isMarketplaceOrder(b)) return -1;

      return compareByDate(a.date, b.date);
    }
    case ESortingOptions.CHECK_IN_FIRST: {
      if (isMarketplaceOrder(a) && !isMarketplaceOrder(b)) return 1;
      if (!isMarketplaceOrder(a) && isMarketplaceOrder(b)) return -1;

      return compareByDate(b.date, a.date);
    }
    default:
      return 0;
  }
}

export function sortMovementCrops(movement: Movement): Array<string> {
  let crops: string[] = [];

  if (movement.initiatedFor === EInitiatedFor.CHECK_IN) {
    crops = movement.checkin.crates.flatMap((crate) => crate.crop?.name || []);
  } else if (movement.initiatedFor === EInitiatedFor.CHECK_OUT) {
    crops = movement.checkout.crates.flatMap((crate) => crate.crop?.name || []);
  } else {
    crops = [
      ...movement.checkin.crates.flatMap((crate) => crate.crop?.name || []),
      ...movement.checkout.crates.flatMap((crate) => crate.crop?.name || []),
    ];
  }

  const uniqueCrops = Array.from(new Set(crops));

  return uniqueCrops.sort((cropA, cropB) => {
    const nameA = cropA.toLowerCase();
    const nameB = cropB.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}
