import React, { createContext, useContext, useMemo, type PropsWithChildren } from 'react';

import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useTranslatedCrops } from '../../CompanyDetails/utils';

export type Datum = Record<number, string>;

type Context = {
  companyCrops: Datum;
  companyOperators: Datum;
  companyLocations: Datum;
  companyCurrency: string | null;
  isLoading: boolean;
};

const DataAggregatorContext = createContext<Context>({
  companyCrops: {} as Datum,
  companyOperators: {} as Datum,
  companyLocations: {} as Datum,
  companyCurrency: null,
  isLoading: false,
});

export default function DataAggregator(props: PropsWithChildren<{ companyId?: number }>) {
  const { data: locations, isLoading: isLoadingLocations } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    props?.companyId as number,
    {
      skip: !props?.companyId,
      defaultData: [],
    }
  );

  const { data: companyDetails, isLoading: isLoadingCompanyDetails } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    props?.companyId as number,
    {
      skip: !props?.companyId,
      defaultData: undefined,
    }
  );

  const { data: cropsResult, isLoading: isLoadingAllCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      skip: !props?.companyId,
      defaultData: [],
    }
  );

  const { data: operators, isLoading: isLoadingOperators } = useApiCall(
    'getOperators',
    ColdtivateService.getOperators,
    props?.companyId as number,
    {
      skip: !props?.companyId,
      defaultData: [],
    }
  );

  const allCrops = useTranslatedCrops(cropsResult);

  const [companyCrops, companyOperators, companyLocations] = useMemo(() => {
    const crops: Array<[number, string]> = [];
    for (const crop of allCrops) {
      if (!companyDetails.crop.includes(crop.id)) continue;
      crops.push([crop.id, crop.name]);
    }

    const operatorsList: Array<[number, string]> = [];
    for (const { user } of operators) {
      if (!user?.phone) continue;
      operatorsList.push([user.id, [user.firstName, user.lastName].join(' ')]);
    }

    return [
      Object.fromEntries(crops),
      Object.fromEntries(operatorsList),
      Object.fromEntries(locations.map((location) => [location.id, location.name])),
    ];
  }, [allCrops, companyDetails, operators, locations]);

  const isLoading =
    isLoadingLocations || isLoadingCompanyDetails || isLoadingAllCrops || isLoadingOperators;

  return (
    <DataAggregatorContext.Provider
      value={{
        companyCrops,
        companyOperators,
        companyLocations,
        companyCurrency: companyDetails?.currency ?? null,
        isLoading,
      }}
    >
      {props.children}
    </DataAggregatorContext.Provider>
  );
}

function useDataAggregator(): Context {
  const ctx = useContext(DataAggregatorContext);
  if (!ctx) throw new Error('useDataAggregator must be within DataAggregator Provider');
  return useMemo(() => ({ ...ctx }), [ctx]);
}

DataAggregator.useDataAggregator = useDataAggregator;
