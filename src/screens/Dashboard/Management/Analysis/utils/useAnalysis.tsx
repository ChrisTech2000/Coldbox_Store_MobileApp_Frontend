import { useMemo } from 'react';
import moize from 'moize';
import ms from 'ms';

import ColdtivateService from '#services/ColdtivateService';
import DataloaderService from '#services/DataloaderService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { GetAllCropsResponse, GetMovementsHistoryResponse } from '#types/api.responses';
import { Company, type CoolingUnit, type User } from '#types/global';

import { PaymentOption } from '../RevenueAnalysis';
import { useTranslatedCrops } from '../../CompanyDetails/utils';

const getCompanyOwnerName = moize(
  (companyId: number | null | undefined, companies: Array<Company>) =>
    companies.find(({ id }) => id === companyId)?.name ?? '',
  {
    maxAge: ms('10 seconds'),
    isSerialized: true,
  }
);

const getUserOwnerName = moize(
  (userId: number | null | undefined, users: Array<User>) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName ?? ''} ${user.lastName ?? ''}` : '';
  },
  {
    maxAge: ms('10 seconds'),
    isSerialized: true,
  }
);

const fetchUsers = async (movements: GetMovementsHistoryResponse) => {
  const checkInUserIds = movements
    .filter(
      (movement) => movement.checkin?.ownedByUserId && !movement.checkin?.ownedOnBehalfOfCompanyId
    )
    .map((movement) => movement.checkin?.ownedByUserId);

  const checkOutUserIds = movements
    .flatMap((movement) => movement.checkout?.crates ?? [])
    .filter((crate) => crate.ownedByUserId && !crate.ownedOnBehalfOfCompanyId)
    .map((crate) => crate.ownedByUserId);

  const uniqueUserIds = Array.from(
    new Set([...checkInUserIds, ...(checkOutUserIds.filter(Boolean) as number[])])
  );

  return DataloaderService.users.getByIds(uniqueUserIds);
};

const processMovements = (
  movements: GetMovementsHistoryResponse,
  companies: Company[],
  crops: GetAllCropsResponse[],
  users: User[]
) =>
  movements.map((movement) => ({
    ...movement,
    ...(movement.checkin && {
      checkin: {
        ...movement.checkin,
        ownerName: movement.checkin?.ownedOnBehalfOfCompanyId
          ? getCompanyOwnerName(movement.checkin?.ownedOnBehalfOfCompanyId, companies ?? [])
          : getUserOwnerName(movement.checkin?.ownedByUserId, users ?? []),
        crates: movement.checkin?.crates.map((crate) => ({
          ...crate,
          crop: crops.find((crop) => crop.id === crate.cropId) || { id: crate.cropId, name: '' },
        })),
      },
    }),
    ...(movement.checkout && {
      checkout: {
        ...movement.checkout,
        crates: movement.checkout?.crates.map((crate) => ({
          ...crate,
          ownerName: crate.ownedOnBehalfOfCompanyId
            ? getCompanyOwnerName(crate.ownedOnBehalfOfCompanyId, companies ?? [])
            : getUserOwnerName(crate.ownedByUserId, users ?? []),
          crop: crops.find((crop) => crop.id === crate.cropId) || { id: crate.cropId, name: '' },
        })),
      },
    }),
  }));

export function useAnalysis(
  user: User,
  selectedUnits: CoolingUnit[],
  paymentMethods?: PaymentOption[]
) {
  const isDataSkippable = !selectedUnits?.length || !user?.id;

  const {
    data: usage,
    isLoading: isUsageDataLoading,
    isValidating: isValidatingUsage,
    refetch: refetchUsage,
  } = useApiCall(
    'getUsageAnalysis',
    ColdtivateService.getUsageAnalysis,
    selectedUnits.map((unit) => unit.id),
    {
      skip: isDataSkippable || !!paymentMethods,
      defaultData: [],
    }
  );

  const {
    data: revenue,
    isLoading: isRevenueDataLoading,
    isValidating: isValidatingRevenue,
    refetch: refetchRevenue,
  } = useApiCall(
    'getRevenueAnalysis',
    ColdtivateService.getRevenueAnalysis,
    {
      coolingUnits: selectedUnits.map((unit) => unit.id),
      paymentMethods: (paymentMethods ?? []).flatMap((method) => method.value),
    },
    {
      skip: isDataSkippable || !paymentMethods,
      defaultData: [],
    }
  );

  const { data: users, isLoading: areUsersLoading } = useApiCall(
    'getUsageUsers',
    () => fetchUsers(usage),
    undefined,
    {
      defaultData: [],
      skip: isDataSkippable || !!paymentMethods || !usage.length,
    }
  );

  const { data: revUsers, isLoading: areRevUsersLoading } = useApiCall(
    'getRevenueUsers',
    () => fetchUsers(revenue),
    undefined,
    {
      defaultData: [],
      skip: isDataSkippable || !paymentMethods || !revenue.length,
    }
  );

  const { data: cropsResult, isLoading: areCropsLoading } = useApiCall(
    'getAllCrops',
    DataloaderService.crops.getAll,
    undefined,
    {
      skip: isDataSkippable,
      defaultData: [],
    }
  );

  const crops = useTranslatedCrops(cropsResult);

  const { data: companies, isLoading: areCompaniesLoading } = useApiCall(
    'getCompanies',
    DataloaderService.companies.getAll,
    undefined,
    {
      defaultData: [],
    }
  );

  const usageData = useMemo(
    () => processMovements(usage, companies ?? [], crops, users),
    [usage, companies, crops, users]
  );

  const revenueData = useMemo(
    () => processMovements(revenue, companies ?? [], crops, revUsers),
    [revenue, companies, crops, revUsers]
  );

  return {
    isLoading:
      isUsageDataLoading ||
      isRevenueDataLoading ||
      areUsersLoading ||
      areRevUsersLoading ||
      areCropsLoading ||
      areCompaniesLoading,
    isValidatingRevenue,
    isValidatingUsage,
    usageData,
    revenueData,
    crops,
    refetchRevenue,
    refetchUsage,
  };
}
