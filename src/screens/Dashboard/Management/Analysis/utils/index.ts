import { Translator } from '#i18n/utils';
import { ESortingOptions } from '#screens/Dashboard/Main/History/components/SortMenu';
import { sortMovementCrops } from '#screens/Dashboard/Main/History/utils/sortMovements';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EInitiatedFor } from '#types/global';

type Movement = GetMovementsHistoryResponse[number];

export function sortMovements(
  a: Movement,
  b: Movement,
  sorting: ESortingOptions,
  t: Translator
): number {
  const movementACrops = sortMovementCrops(a, t).join(', ');
  const movementBCrops = sortMovementCrops(b, t).join(', ');
  const movementAOwners = sortMovementOwners(a).join(', ');
  const movementBOwners = sortMovementOwners(b).join(', ');

  switch (sorting) {
    case ESortingOptions.CROP_TYPE:
      return movementACrops.toLowerCase().localeCompare(movementBCrops.toLowerCase());
    case ESortingOptions.MOVEMENT_DATE:
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    case ESortingOptions.MOVEMENT_DATE_REVERSE:
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    case ESortingOptions.COOLING_USER_NAME:
      return movementAOwners.toLowerCase().localeCompare(movementBOwners.toLowerCase());
    default:
      return 0;
  }
}

export function sortMovementOwners(movement: Movement): Array<string> {
  let owners: string[] = [];

  if (movement.initiatedFor !== EInitiatedFor.CHECK_OUT) {
    owners = [movement.checkin.ownerName || ''];
  } else {
    owners = movement.checkout?.crates?.flatMap((crate) => crate.ownerName || []);
  }

  const uniqueOwners = Array.from(new Set(owners ?? []));

  return uniqueOwners.sort((ownerA, ownerB) => {
    const nameA = ownerA.toLowerCase();
    const nameB = ownerB.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}
