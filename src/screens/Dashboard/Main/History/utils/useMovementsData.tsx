import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { ERoles, type CoolingUnit, type User } from '#types/global';

export function useMovementsHistory(
  farmerId: number | null,
  user: User,
  coolingUnit: CoolingUnit | null
) {
  const {
    data: movements,
    isLoading: areMovementsLoading,
    isValidating,
    refetch: refetchHistoryMovements,
  } = useApiCall(
    'getMovementsHistory',
    ColdtivateService.getMovementsHistory,
    {
      ...(user?.role === ERoles.COOLING_USER ? { farmerId: farmerId as number } : {}),
      coolingUnit: coolingUnit?.id as number,
    },
    {
      skip: (user?.role === ERoles.COOLING_USER && !farmerId) || !coolingUnit?.id,
      defaultData: [],
    }
  );

  const { data: users, isLoading: areUsersLoading } = useApiCall(
    'getMovementUsers',
    async () => {
      const checkInUserIds = movements
        .filter((movement) => {
          return movement.checkin?.ownedByUserId && !movement.checkin?.ownedOnBehalfOfCompanyId;
        })
        .flatMap((movement) => [movement.checkin?.ownedByUserId]);

      const checkOutUserIds = movements
        .flatMap((movements) => movements.checkout?.crates ?? [])
        .filter((crate) => crate.ownedByUserId && !crate.ownedOnBehalfOfCompanyId)
        .map((crate) => crate.ownedByUserId);

      const uniqueUserIds = Array.from(new Set([...checkOutUserIds, ...checkInUserIds])).filter(
        Boolean
      );
      return await Promise.all(
        uniqueUserIds.map(async (id) => await ColdtivateService.getUser(id as number))
      );
    },
    undefined,
    {
      defaultData: [],
      skip: !movements?.length,
    }
  );

  const { data: crops, isLoading: areCropsLoading } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60 * 60 * 1000,
      skip: !user?.id,
      defaultData: [],
    }
  );

  const { data: companies, isLoading: areCompaniesLoading } = useApiCall(
    'getCompanies',
    ColdtivateService.getCompanies,
    undefined,
    {
      defaultData: [],
    }
  );

  const updatedMovements = useMemo(() => {
    if (!companies?.length || !crops?.length || !movements?.length) return [];

    return movements.map((movement) => {
      return {
        ...movement,
        ...(!isEmpty(movement.checkin)
          ? {
              checkin: {
                ...movement.checkin,
                ownerName: movement.checkin.ownedOnBehalfOfCompanyId
                  ? companies?.find(
                      (company) => company.id === movement.checkin.ownedOnBehalfOfCompanyId
                    )?.name
                  : (() => {
                      const user = users.find((user) => user.id === movement.checkin.ownedByUserId);
                      return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
                    })(),
                crates: movement.checkin.crates.map((crate) => {
                  const crop = crops.find((c) => c.id === crate.cropId);
                  return {
                    ...crate,
                    crop: crop
                      ? { id: crate.cropId, name: crop.name }
                      : { id: crate.cropId, name: '' },
                  };
                }),
              },
            }
          : {}),
        ...(!isEmpty(movement.checkout)
          ? {
              checkout: {
                ...movement.checkout,
                crates: movement.checkout?.crates.map((crate) => {
                  const crop = crops.find((c) => c.id === crate.cropId);
                  return {
                    ...crate,
                    ownerName: crate.ownedOnBehalfOfCompanyId
                      ? companies?.find((company) => company.id === crate.ownedOnBehalfOfCompanyId)
                          ?.name
                      : (() => {
                          const user = users.find((user) => user.id === crate.ownedByUserId);
                          return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
                        })(),
                    crop: crop
                      ? { id: crate.cropId, name: crop.name }
                      : { id: crate.cropId, name: '' },
                  };
                }),
              },
            }
          : {}),
      };
    });
  }, [companies, crops, movements, users]);

  return {
    isLoading: areCropsLoading || areMovementsLoading || areCompaniesLoading || areUsersLoading,
    refetchHistoryMovements,
    movements: updatedMovements,
    isValidating: isValidating,
    crops,
  };
}
