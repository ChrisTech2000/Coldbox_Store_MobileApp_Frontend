import { useMemo } from 'react';
import { CurrencyStandardization } from 'currency-format-utils';

import type { Company } from '#types/global';
import type { GetAllCropsResponse, GetCoolingUnitResponse } from '#types/api.responses';
import type { GetAvailableListingParams } from '#types/api.params';
import { useMap } from '#ui/hooks/useMap';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import ColdtivateService from '#services/ColdtivateService';

import { useMarketplaceFilters, useMarketplaceQueryParams } from './store';

export type AvailableListingDatum = {
  id: number;
  movementCode: string;
  crateWeight: number;
  crateId: number;
  price: number;
  shelfLife: number | null;
  crop: {
    id: number;
    name: string;
    image: string;
  };
  company: {
    id: number;
    name: string;
    locationId: number | null;
  };
  coolingUnit: {
    id: number;
    name: string;
  };
  distance: number;
  currencyValue: string;
};

export function useMarketplaceListing() {
  const queryParams = useMarketplaceQueryParams();
  const filters = useMarketplaceFilters((store) => store.filters);

  const [companyMap, companyActions] = useMap<number, Company>();
  const [coolingUnitMap, coolingUnitActions] = useMap<number, GetCoolingUnitResponse>();
  const [cropsMap, cropsActions] = useMap<number, GetAllCropsResponse>();

  const filtering = useMemo(
    () => ({
      unitsToFilterIn: new Set<number>(
        filters
          .filter(({ key }) => key === 'coolingUnits')
          .map(({ value }) => value) as Array<number>
      ),
      companiesToFilterIn: new Set<number>(
        filters.filter(({ key }) => key === 'companies').map(({ value }) => value) as Array<number>
      ),
      cropsToFilterIn: new Set<number>(
        filters.filter(({ key }) => key === 'crops').map(({ value }) => value) as Array<number>
      ),
      priceRangeFilter: filters.find(({ key }) => key === 'priceRange')?.value as
        | [number, number]
        | undefined,
    }),
    [filters]
  );

  const { data: datums, ...rest } = useApiCall(
    'getMarketplaceAvailableListing',
    async (params: GetAvailableListingParams) => {
      const listing = await MarketplaceService.getAvailableListing(params);

      // companies aggregation
      const companyIds = new Set<number>(listing.nodes.map((node) => node.relCompanyId));
      const companies = await Promise.all(
        Array.from(companyIds)
          .filter((companyId) => !companyMap.has(companyId))
          .map(async (companyId) => await ColdtivateService.getCompanyById(companyId))
      );

      const companiesMapCopy = new Map(companyMap);
      for (const company of companies) {
        companiesMapCopy.set(company.id, company);
      }
      companyActions.setAll(companiesMapCopy);

      // cooling units aggregation
      const uniqueUnitReq = new Set<string>();
      const units = await Promise.all(
        listing.nodes
          .map(async (node) => {
            if (coolingUnitMap.has(node.relCoolingUnitId)) return null;
            const key = [node.relCompanyId, node.relCoolingUnitId].join('::');
            if (uniqueUnitReq.has(key)) return null;
            uniqueUnitReq.add(key);
            return await ColdtivateService.getCoolingUnit({
              coolingUnitId: node.relCoolingUnitId,
              companyId: node.relCompanyId,
            });
          })
          .filter((item) => item !== null)
      );

      const unitsMapCopy = new Map(coolingUnitMap);
      for (const unit of units) {
        if (unit === null) continue;
        unitsMapCopy.set(unit.id, unit);
      }
      coolingUnitActions.setAll(unitsMapCopy);

      // crops aggregation
      const crops = await ColdtivateService.getAllCrops();
      const cropsToAdd = crops.filter((crop) => !cropsMap.has(crop.id));

      const cropsMapCopy = new Map(cropsMap);
      for (const cropToAdd of cropsToAdd) {
        cropsMapCopy.set(cropToAdd.id, cropToAdd);
      }
      cropsActions.setAll(cropsMapCopy);

      // marketplace listing datums
      return listing.nodes.map((node) => {
        const contextualCrop = cropsMapCopy.get(node.relCropId);
        const contextualUnit = unitsMapCopy.get(node.relCoolingUnitId);
        const company = companiesMapCopy.get(node.relCompanyId);
        const currencyFormat = CurrencyStandardization.currencyCode({
          code: node.currency,
          value: node.producePricePerKg,
        });
        return {
          id: node.id,
          distance: node.distance,
          crateId: node.crateId,
          crateWeight: node.availableWeightInKg,
          shelfLife: node.relCrateRemainingShelfLife,
          price: node.producePricePerKg,
          company: {
            id: node.relCompanyId,
            name: company?.name ?? '',
            locationId: contextualUnit?.location ?? null,
          },
          coolingUnit: {
            id: contextualUnit?.id ?? 0,
            name: contextualUnit?.name ?? '',
          },
          crop: {
            id: contextualCrop?.id ?? 0,
            name: contextualCrop?.name ?? '',
            image: contextualCrop?.image ?? '',
          },
          movementCode: node.relCheckInMovementCode,
          currencyValue: currencyFormat.getValueFormated(),
        } satisfies AvailableListingDatum;
      });
    },
    {
      page: 1,
      itemsPerPage: 300,
      sortBy: queryParams.sortBy,
      location: queryParams.location,
      filterByMaxDistanceInKm: queryParams.filterByMaxDistanceInKm,
      filterByCoolingUnitsIds: Array.from(filtering.unitsToFilterIn),
    },
    { skip: (queryParams?.location ?? []).length === 0, defaultData: [], errorRetryCount: 1 }
  );

  return {
    ...rest,
    data: useMemo(() => {
      const { companiesToFilterIn, cropsToFilterIn, priceRangeFilter } = filtering;

      // apply filters to the remapped listings
      return datums.filter((datum) => {
        const isInCompanyFilter =
          !companiesToFilterIn.size || companiesToFilterIn.has(datum.company.id);
        const isInCropFilter = !cropsToFilterIn.size || cropsToFilterIn.has(datum.crop.id);

        const isInPriceRange =
          !priceRangeFilter ||
          (datum.price >= priceRangeFilter[0] && datum.price <= priceRangeFilter[1]);

        return isInCompanyFilter && isInCropFilter && isInPriceRange;
      });
    }, [datums, filtering]),
  };
}
