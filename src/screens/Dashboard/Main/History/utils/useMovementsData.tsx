import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import moize from 'moize';
import ms from 'ms';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { ERoles, type CoolingUnit, type User, type Company } from '#types/global';
import { stringToHash } from '#ui/lib/hash';
import { GetAllCropsResponse } from 'types/api.responses';

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

    function _getOwnerName(
      onBehalfOfCompanyId: number | null | undefined,
      ownedByUserId: number | null | undefined
    ): string {
      if (onBehalfOfCompanyId) return getCompanyOwnerName(onBehalfOfCompanyId, companies ?? []);
      return getUserOwnerName(ownedByUserId, users ?? []);
    }

    return movements.map((movement) => {
      const processedMovement = { ...movement };

      if (!isEmpty(movement.checkin)) {
        processedMovement.checkin = {
          ...movement.checkin,
          ownerName: _getOwnerName(
            movement.checkin.ownedOnBehalfOfCompanyId,
            movement.checkin.ownedByUserId
          ),
          crates: movement.checkin.crates.map((crate) => ({
            ...crate,
            crop: getCropInfo(crate.cropId, crops ?? []),
          })),
        };
      }

      if (!isEmpty(movement.checkout)) {
        processedMovement.checkout = {
          ...movement.checkout,
          crates: movement.checkout.crates.map((crate) => ({
            ...crate,
            ownerName: _getOwnerName(crate.ownedOnBehalfOfCompanyId, crate.ownedByUserId),
            crop: getCropInfo(crate.cropId, crops ?? []),
          })),
        };
      }

      return processedMovement;
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

export const getCompanyOwnerName = moize(
  (companyId: number | null | undefined, companies: Array<Company>) =>
    companies.find(({ id }) => id === companyId)?.name ?? '',
  {
    maxAge: ms('10 seconds'),
    isSerialized: true,
    serializer: ([companyId, companies]) => [
      stringToHash([companyId, JSON.stringify(companies)].join(':::')),
    ],
  }
);

export const getUserOwnerName = moize(
  (userId: number | null | undefined, users: Array<User>) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName ?? ''} ${user.lastName ?? ''}` : '';
  },
  {
    maxAge: ms('10 seconds'),
    isSerialized: true,
    serializer: ([userId, users]) => [stringToHash([userId, JSON.stringify(users)].join(':::'))],
  }
);

export const getCropInfo = moize(
  (cropId: number, crops: Array<GetAllCropsResponse>) => {
    const crop = crops.find((c) => c.id === cropId);
    return crop ? { id: cropId, name: crop.name } : { id: cropId, name: '' };
  },
  {
    maxAge: ms('10 seconds'),
    isSerialized: true,
    serializer: ([cropId, crops]) => [stringToHash([cropId, JSON.stringify(crops)].join(':::'))],
  }
);