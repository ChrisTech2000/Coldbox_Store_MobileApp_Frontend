import { useMarketplaceQueryParams } from './store';

import type { Company } from '#types/global';
import type { GetAllCropsResponse, GetCoolingUnitResponse } from '#types/api.responses';
import { useMap } from '#ui/hooks/useMap';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/Marketplace';
import ColdtivateService from '#services/ColdtivateService';

export type AvailableListingDatum = {
  id: number;
  cropName: string;
  movementCode: string;
  cropImage: string;
  crateWeight: number;
  price: number;
  shelfLife: number | null;
  company: {
    id: number;
    name: string;
    locationId: number | null;
  };
  coolingUnitName: string;
};

export function useMarketplaceListing() {
  const queryParams = useMarketplaceQueryParams();

  const [companyMap, companyActions] = useMap<number, Company>();
  const [coolingUnitMap, coolingUnitActions] = useMap<number, GetCoolingUnitResponse>();
  const [cropsMap, cropsActions] = useMap<number, GetAllCropsResponse>();

  return useApiCall(
    'getAvailableListing',
    async (params) => {
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

      // TODO: filter by marketplace filters
      // marketplace listing remap
      return listing.nodes.map((node) => {
        const contextualCrop = cropsMapCopy.get(node.relCropId);
        const contextualUnit = unitsMapCopy.get(node.relCoolingUnitId);
        return {
          id: node.id,
          crateWeight: node.availableWeightInKg,
          shelfLife: node.relCrateRemainingShelfLife,
          price: node.producePricePerKg,
          company: {
            id: node.relCompanyId,
            name: companiesMapCopy.get(node.relCompanyId)?.name ?? '',
            locationId: contextualUnit?.location ?? null,
          },
          coolingUnitName: contextualUnit?.name ?? '',
          cropImage: contextualCrop?.image ?? '',
          cropName: contextualCrop?.name ?? '',
          movementCode: node.relCheckInMovementCode,
        } satisfies AvailableListingDatum;
      });
    },
    {
      location: queryParams.location,
      sortBy: queryParams.sortBy,
      coolingUnitIds: queryParams.coolingUnitIds,
      page: queryParams.page,
      itemsPerPage: queryParams.itemsPerPage,
    },
    { skip: (queryParams?.location ?? []).length === 0, defaultData: undefined }
  );
}
