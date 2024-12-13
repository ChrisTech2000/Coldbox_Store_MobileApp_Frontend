import { useMemo } from 'react';
import moize from 'moize';
import ms from 'ms';

import type { Company, CoolingUnit, User } from '#types/global';
import type { GetAvailableListingParams } from '#types/api.params';
import type { GetAllCropsResponse } from '#types/api.responses';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import ColdtivateService from '#services/ColdtivateService';
import { useMap } from '#ui/hooks/useMap';

import { useMarketplaceFilters, useMarketplaceQueryParams } from './store';
import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import { stringToHash } from '#ui/lib/hash';

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

  const [userMap, userMapActions] = useMap<number, User>();

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

  const { data: crops, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    { defaultData: [] }
  );

  const { data: coolingUnits, isLoading: isLoadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {},
    {
      defaultData: [],
    }
  );

  const { data: companies, isLoading: isLoadingCompanies } = useApiCall(
    'getCompanies',
    ColdtivateService.getCompanies,
    undefined,
    {
      defaultData: [],
    }
  );

  const { data: datums, ...rest } = useApiCall(
    'getMarketplaceAvailableListing',
    async (params: GetAvailableListingParams) => {
      const listing = await MarketplaceService.getAvailableListing(params);

      // companies (owners) aggregation
      const ownerCompaniesIds = new Set<number>(
        listing.nodes.map((node) => node.ownedOnBehalfOfCompanyId).filter(Boolean) as number[]
      );

      const ownerCompanies: Array<Company> = [];
      for (const companyId of ownerCompaniesIds) {
        if (!companies) break; // safe guard
        const item = _findCompanyById(companyId, companies);
        if (!item) continue; // safe guard
        ownerCompanies.push(item);
      }

      // users (owners) aggregation
      const ownerUsersIds = new Set<number>(
        listing.nodes.map((node) => node.ownedByUserId).filter(Boolean) as number[]
      );

      const ownerUsers = await Promise.all(
        Array.from(ownerUsersIds)
          .filter((id) => !userMap.has(id))
          .map(async (id) => await ColdtivateService.getUser(id))
      );

      const userMapCopy = new Map(userMap);
      for (const item of ownerUsers) {
        userMapCopy.set(item.id, item);
      }
      userMapActions.setAll(userMapCopy);

      // marketplace listing datums
      return listing.nodes.map((node) => {
        const contextualCrop = _findCropById(node.relCropId, crops ?? []);
        const contextualUnit = _findUnitById(node.relCoolingUnitId, coolingUnits ?? []);
        const contextualCompany = _findCompanyById(node.relCompanyId, companies ?? []);
        const owner = node.ownedOnBehalfOfCompanyId
          ? _findCompanyOwner(node.ownedOnBehalfOfCompanyId, ownerCompanies)
          : _findUserOwner(node.ownedByUserId, userMapCopy);

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
      });
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
      skip:
        (queryParams?.location ?? []).length === 0 ||
        isLoadingCrops ||
        isLoadingCoolingUnits ||
        isLoadingCompanies,
      defaultData: [],
      errorRetryCount: 1,
    }
  );

  return {
    ...rest,
    isLoading: isLoadingCrops || isLoadingCoolingUnits || isLoadingCompanies || rest.isLoading,
    data: useMemo(() => {
      const { companiesToFilterIn, cropsToFilterIn, priceRangeFilter } = filtering;

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

///
// internal util functions
///

const _findCompanyById = moize(
  (companyId: number, companies: Array<Company>) => companies.find(({ id }) => id === companyId),
  {
    maxAge: ms('5 seconds'),
    isSerialized: true,
    serializer: ([companyId, companies]) => [
      stringToHash([companyId, JSON.stringify(companies)].join(':::')),
    ],
  }
);

const _findCropById = moize(
  (cropId: number, crops: Array<GetAllCropsResponse>) => crops.find(({ id }) => id === cropId),
  {
    maxAge: ms('5 seconds'),
    isSerialized: true,
    serializer: ([cropId, crops]) => [stringToHash([cropId, JSON.stringify(crops)].join(':::'))],
  }
);

const _findUnitById = moize(
  (unitId: number, units: Array<CoolingUnit>) => units.find(({ id }) => id === unitId),
  {
    maxAge: ms('5 seconds'),
    isSerialized: true,
    serializer: ([unitId, units]) => [stringToHash([unitId, JSON.stringify(units)].join(':::'))],
  }
);

const _findCompanyOwner = moize(
  (ownedOnBehalfOfCompanyId: number | null, ownerCompanies: Array<Company>) =>
    ownerCompanies.find(({ id }) => id === ownedOnBehalfOfCompanyId),
  {
    maxAge: ms('5 seconds'),
    isSerialized: true,
    serializer: ([companyId, companies]) => [
      stringToHash([companyId, JSON.stringify(companies)].join(':::')),
    ],
  }
);

const _findUserOwner = moize(
  (ownedByUserId: number | null, userMap: Map<number, User>) => {
    return ownedByUserId ? userMap.get(ownedByUserId) : undefined;
  },
  {
    maxAge: ms('5 seconds'),
    isSerialized: true,
    serializer: ([userId, users]) => [stringToHash([userId, JSON.stringify(users)].join(':::'))],
  }
);
