import { GetMovementsHistoryResponse } from '#types/api.responses';
import { ESortingOptions } from '#screens/Dashboard/Main/History/components/SortMenu';
import { sortMovementCrops } from '#screens/Dashboard/Main/History/utils/sortMovements';
import { EInitiatedFor } from '#types/global';

type Movement = GetMovementsHistoryResponse[number];

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
    case ESortingOptions.COOLING_USER_NAME:
      return (
        a[a.initiatedFor === EInitiatedFor.CHECK_OUT ? 'checkout' : 'checkin']?.ownerName ?? ''
      )
        ?.toLowerCase()
        .localeCompare(
          (
            b[a.initiatedFor === EInitiatedFor.CHECK_OUT ? 'checkout' : 'checkin']?.ownerName ?? ''
          )?.toLowerCase()
        );
    default:
      return 0;
  }
}
