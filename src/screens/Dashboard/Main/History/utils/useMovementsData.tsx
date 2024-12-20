import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import moize from 'moize';
import ms from 'ms';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { ERoles, type CoolingUnit, type User, type Company } from '#types/global';
import { resolveCropInfo, resolveOwnerName } from '#services/utils/resolvers';

export function useMovementsHistory(
  farmerId: number | null,
  user: User,
  coolingUnit: CoolingUnit | null
) {
  return useApiCall(
    'getMovementsHistory',
    async function () {
      const movements = await ColdtivateService.getMovementsHistory({
        ...(user?.role === ERoles.COOLING_USER ? { farmerId: farmerId as number } : {}),
        coolingUnit: coolingUnit?.id as number,
      });

      return Promise.all(
        movements.map(async (movement) => {
          const processedMovement = { ...movement };

          if (!isEmpty(movement.checkin)) {
            processedMovement.checkin = {
              ...movement.checkin,
              ownerName: await resolveOwnerName(
                movement.checkin?.ownedByUserId,
                movement.checkin?.ownedOnBehalfOfCompanyId
              ),
              crates: await Promise.all(
                movement.checkin?.crates.map(async (crate) => ({
                  ...crate,
                  crop: await resolveCropInfo(crate.cropId),
                }))
              ),
            };
          }

          if (!isEmpty(movement.checkout)) {
            processedMovement.checkout = {
              ...movement.checkout,
              crates: await Promise.all(
                movement.checkout?.crates.map(async (crate) => ({
                  ...crate,
                  ownerName: await resolveOwnerName(
                    crate.ownedByUserId,
                    crate.ownedOnBehalfOfCompanyId
                  ),
                  crop: await resolveCropInfo(crate.cropId),
                }))
              ),
            };
          }

          return processedMovement;
        })
      );
    },
    undefined,
    {
      skip: (user?.role === ERoles.COOLING_USER && !farmerId) || !coolingUnit?.id,
      defaultData: [],
    }
  );
}
