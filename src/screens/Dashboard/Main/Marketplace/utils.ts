import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useMemo } from 'react';

import DataloaderService from '#services/DataloaderService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import type { GetAvailableListingParams } from '#types/api.params';
import type { Company, User } from '#types/global';
import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import { useMarketplaceFilters, useMarketplaceQueryParams } from './store';

export const DEFAULT_COORDINATES: [number, number] = [0, 0];
export const DEFAULT_CURRENCY_CODE = 'NGN';

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
    standardWeight: number;
  };
  distance: number;
  currencyValue: string;
  owner: {
    name: string;
    contact: string;
    isPhonePublic: boolean;
  };
};

export function useMarketplaceListing() {
  const queryParams = useMarketplaceQueryParams();
  const filters = useMarketplaceFilters((store) => store.filters);

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

      // marketplace listing datums
      return Promise.all(
        listing.nodes.map(async (node) => {
          const contextualCrop = await DataloaderService.crops.getById(node.relCropId);
          const contextualUnit = await DataloaderService.coolingUnits.getById(
            node.relCoolingUnitId
          );
          const contextualCompany = await DataloaderService.companies.getById(node.relCompanyId);
          const owner = node.ownedOnBehalfOfCompanyId
            ? await DataloaderService.companies.getById(node.ownedOnBehalfOfCompanyId)
            : node.ownedByUserId
              ? await DataloaderService.users.getById(node.ownedByUserId)
              : null;

          return {
            id: node.id,
            distance: node.distance,
            crateId: node.crateId,
            crateWeight: node.availableWeightInKg,
            shelfLife: node.relCrateRemainingShelfLife,
            price: node.producePricePerKg,
            owner: {
              name: node.ownedOnBehalfOfCompanyId
                ? ((owner as Company)?.name ?? '')
                : node.ownedByUserId
                  ? `${(owner as User)?.firstName ?? ''} ${(owner as User)?.lastName ?? ''}`
                  : '',
              contact: node.ownedOnBehalfOfCompanyId ? '' : ((owner as User)?.phone ?? ''),
              isPhonePublic: !node.ownedOnBehalfOfCompanyId && !!(owner as User)?.isPhonePublic,
            },
            company: {
              id: node.relCompanyId,
              name: contextualCompany?.name ?? '',
              locationId: contextualUnit?.location ?? null,
            },
            coolingUnit: {
              id: contextualUnit?.id ?? 0,
              name: contextualUnit?.name ?? '',
              standardWeight: contextualUnit?.crateWeight ?? 0,
            },
            crop: {
              id: contextualCrop?.id ?? 0,
              name: contextualCrop?.name ?? '',
              image: contextualCrop?.image ?? '',
            },
            movementCode: node.relCheckInMovementCode,
            currencyValue: formatCurrencyWithSymbol(node.currency, node.producePricePerKg),
          } satisfies AvailableListingDatum;
        })
      );
    },
    {
      page: 1,
      itemsPerPage: 400,
      sortBy: queryParams.sortBy,
      location: queryParams.location,
      filterByMaxDistanceInKm: queryParams.filterByMaxDistanceInKm,
      filterByCoolingUnitsIds: Array.from(filtering.unitsToFilterIn),
    },
    {
      skip: (queryParams?.location ?? []).length === 0,
      defaultData: [],
      errorRetryCount: 1,
    }
  );

  return {
    ...rest,
    data: useMemo(() => {
      const { companiesToFilterIn, cropsToFilterIn, priceRangeFilter } = filtering;

      if (isEmpty(companiesToFilterIn) && isEmpty(cropsToFilterIn) && isNil(priceRangeFilter))
        return datums;

      // apply filters to the remapped listings
      return datums.filter((datum) => {
        const isInCompanyFilter =
          !companiesToFilterIn.size || companiesToFilterIn.has(datum.company.id);
        const isInCropFilter = !cropsToFilterIn.size || cropsToFilterIn.has(datum.crop.id);

        // check if price is within range filter, if filter exists
        // returns true if:
        // 1. no price filter is set (!priceRangeFilter), or
        // 2. price is greater than or equal to min (index 0) if set and not 0
        //    AND price is less than or equal to max (index 1) if set and not 0
        const isInPriceRange =
          !priceRangeFilter ||
          ((priceRangeFilter[0] === undefined ||
            priceRangeFilter[0] === 0 ||
            datum.price >= priceRangeFilter[0]) &&
            (priceRangeFilter[1] === undefined ||
              priceRangeFilter[1] === 0 ||
              datum.price <= priceRangeFilter[1]));

        return isInCompanyFilter && isInCropFilter && isInPriceRange;
      });
    }, [datums, filtering]),
  };
}
