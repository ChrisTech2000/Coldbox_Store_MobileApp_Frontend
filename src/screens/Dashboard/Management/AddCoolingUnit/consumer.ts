import { useMemo } from 'react';

import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';

export type Datum = { id: number; name: string };

export function useConsumer(companyId?: number) {
  const { data: locations, isLoading: isLoadingLocations } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    companyId as number,
    {
      skip: !companyId,
      defaultData: [],
    }
  );

  const { data: companyDetails, isLoading: isLoadingCompanyDetails } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    companyId as number,
    {
      skip: !companyId,
      defaultData: undefined,
    }
  );

  const { data: allCrops, isLoading: isLoadingAllCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      skip: !companyId,
      defaultData: [],
    }
  );

  const { data: operators, isLoading: isLoadingOperators } = useApiCall(
    'getOperators',
    ColdtivateService.getOperators,
    companyId as number,
    {
      skip: !companyId,
      defaultData: [],
    }
  );

  const [companyCrops, companyOperators, companyLocations] = useMemo(() => {
    const crops: Array<Datum> = [];
    for (const crop of allCrops) {
      if (!companyDetails.crop.includes(crop.id)) continue;
      crops.push({ id: crop.id, name: crop.name });
    }

    const operatorsList: Array<Datum> = [];
    for (const { id, user } of operators) {
      if (!user?.phone) continue;
      operatorsList.push({ id, name: [user.firstName, user.lastName].join(' ') });
    }

    return [
      crops,
      operatorsList,
      locations.map((location) => ({ id: location.id, name: location.name }) satisfies Datum),
    ];
  }, [allCrops, companyDetails, operators, locations]);

  return {
    companyCrops,
    companyOperators,
    companyLocations,
    isLoading:
      isLoadingLocations || isLoadingCompanyDetails || isLoadingAllCrops || isLoadingOperators,
  };
}
