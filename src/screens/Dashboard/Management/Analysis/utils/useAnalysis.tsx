import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { type CoolingUnit, type User } from '#types/global';

import { PaymentOption } from '../RevenueAnalysis';

export function useAnalysis(
  user: User,
  selectedUnits: CoolingUnit[],
  paymentMethods?: PaymentOption[]
) {
  const { data: usage, isLoading: isUsageDataLoaging } = useApiCall(
    'getUsageAnalysis',
    ColdtivateService.getUsageAnalysis,
    selectedUnits.map((unit) => unit.id) as number[],
    {
      skip: !selectedUnits || !selectedUnits.length || !!paymentMethods,
      defaultData: [],
    }
  );

  const { data: revenue, isLoading: isRevenueDataLoading } = useApiCall(
    'getRevenueAnalysis',
    ColdtivateService.getRevenueAnalysis,
    {
      coolingUnits: selectedUnits?.map((unit) => unit.id) as number[],
      paymentMethods: (paymentMethods ?? []).flatMap((method) => method.value),
    },
    {
      skip: !selectedUnits || !selectedUnits.length || !paymentMethods,
      defaultData: [],
    }
  );

  const { data: users, isLoading: areUsersLoading } = useApiCall(
    'getUsageUsers',
    async () => {
      const userIds = usage
        .filter((movement) => {
          return (
            (movement.checkin?.ownedByUserId && !movement.checkin?.ownedOnBehalfOfCompanyId) ||
            (movement.checkout?.ownedByUserId && !movement.checkout?.ownedOnBehalfOfCompanyId)
          );
        })
        .flatMap((movement) => [
          movement.checkin?.ownedByUserId,
          ...(movement.checkout?.ownedByUserId ? [movement.checkout.ownedByUserId] : []),
        ]);

      const uniqueUserIds = new Set(userIds);
      return await Promise.all(
        Array.from(uniqueUserIds)
          .filter(Boolean)
          .map(async (id) => await ColdtivateService.getUser(id))
      );
    },
    undefined,
    {
      defaultData: [],
      skip: !usage?.length || !!paymentMethods,
    }
  );

  const { data: revUsers, isLoading: areRevUsersLoading } = useApiCall(
    'getRevenueUsers',
    async () => {
      const userIds = revenue
        .filter((movement) => {
          return (
            (movement.checkin?.ownedByUserId && !movement.checkin?.ownedOnBehalfOfCompanyId) ||
            (movement.checkout?.ownedByUserId && !movement.checkout?.ownedOnBehalfOfCompanyId)
          );
        })
        .flatMap((movement) => [
          movement.checkin?.ownedByUserId,
          ...(movement.checkout?.ownedByUserId ? [movement.checkout.ownedByUserId] : []),
        ]);

      const uniqueUserIds = new Set(userIds);
      return await Promise.all(
        Array.from(uniqueUserIds)
          .filter(Boolean)
          .map(async (id) => await ColdtivateService.getUser(id))
      );
    },
    undefined,
    {
      defaultData: [],
      skip: !revenue?.length || !paymentMethods,
    }
  );

  const { data: crops, isLoading: areCropsLoading } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
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

  const usageData = useMemo(() => {
    if (!companies?.length || !crops?.length || !usage?.length) return [];

    return usage.map((movement) => {
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
                ownerName: movement.checkout.ownedOnBehalfOfCompanyId
                  ? companies?.find(
                      (company) => company.id === movement.checkout.ownedOnBehalfOfCompanyId
                    )?.name
                  : (() => {
                      const user = users.find(
                        (user) => user.id === movement.checkout.ownedByUserId
                      );
                      return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
                    })(),
                crates: movement.checkout.crates.map((crate) => {
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
      };
    });
  }, [companies, crops, usage, users]);

  const revenueData = useMemo(() => {
    if (!companies?.length || !crops?.length || !revenue?.length) return [];

    return revenue.map((movement) => {
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
                      const user = revUsers.find(
                        (user) => user.id === movement.checkin.ownedByUserId
                      );
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
                ownerName: movement.checkout.ownedOnBehalfOfCompanyId
                  ? companies?.find(
                      (company) => company.id === movement.checkout.ownedOnBehalfOfCompanyId
                    )?.name
                  : (() => {
                      const user = revUsers.find(
                        (user) => user.id === movement.checkout.ownedByUserId
                      );
                      return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
                    })(),
                crates: movement.checkout.crates.map((crate) => {
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
      };
    });
  }, [companies, crops, usage, revUsers]);

  return {
    isLoading:
      areCropsLoading ||
      areRevUsersLoading ||
      areCompaniesLoading ||
      areUsersLoading ||
      isUsageDataLoaging ||
      isRevenueDataLoading,
    usageData,
    revenueData,
    crops,
  };
}
