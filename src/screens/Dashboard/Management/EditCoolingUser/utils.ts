import cloneDeep from 'lodash/cloneDeep';
import camelCase from 'lodash/camelCase';

import type { Farmer, FarmerImpactMetrics } from '#types/global';
import type { FarmersSliceResponse } from '#types/api.responses';
import ColdtivateService from '#services/ColdtivateService';
import FarmerService, { STATIC_START_DATE } from '#services/FarmerService';
import { useManagementStore } from '#stores/management';
import { dateFmt } from '#i18n/utils';

import { countriesDict } from '../CompanyDetails/utils';

type FarmerRevenueImpactMetrics = FarmerImpactMetrics & { currency: string };
type FarmerCoolingUnitStats = Omit<FarmersSliceResponse, 'firstName' | 'lastName' | 'userType'>;
type CropsLookupMap = Map<string, { cropId: number; name: string; imageURL: string }>;

export class DataLoader {
  //
  // Public Methods
  //
  static async loadFarmerRecord(farmerId: number): Promise<Farmer> {
    // load farmer record
    const farmer = await ColdtivateService.getFarmerById(farmerId);
    if (!farmer) throw new Error('farmer not found');

    // load farmer companies and cooling units
    const farmerResults = await ColdtivateService.getFarmerByUserId(farmer.user.id);
    const contextualFarmer = farmerResults?.at(0);
    if (!contextualFarmer) throw new Error('farmer not found');

    return contextualFarmer;
  }

  static async aggregateFarmerData(farmer: Farmer) {
    const { farmerInfo, farmerCompanies, contextualCompanyId } =
      await DataLoader._loadFarmerInfoAndCompanies(farmer);

    if (!(farmerCompanies.length >= 1) || !contextualCompanyId) {
      throw new Error('farmer not assigned to any company');
    }

    const { farmerCoolingUnits, contextualCoolingUnitId } =
      await DataLoader._loadFarmerCoolingUnits(farmer, contextualCompanyId);
    if (!(farmerCoolingUnits.length >= 1) || !contextualCoolingUnitId) {
      throw new Error('farmer does not have any check-ins');
    }

    const { farmerSlice, impactSlice } = await DataLoader._loadFarmerAnalytics(farmer);
    if (!farmerSlice || !impactSlice) throw new Error('farmer dit not fill-in any surveys');

    const coolingUnitsNames = farmerCoolingUnits.map((unit) => unit.name);
    const countryCurrency = countriesDict().getByValue(farmer.country);

    const tempUnitName: Record<string, string> = {};
    const losses: Array<FarmerImpactMetrics> = [];
    const revenues: Array<FarmerRevenueImpactMetrics> = [];

    for (const key in impactSlice.top5FoodLossEvolution) {
      tempUnitName[key] = coolingUnitsNames[Number(key)];
      losses.push(impactSlice.top5FoodLossEvolution[key]);
      revenues.push({
        ...impactSlice.top5RevenueEvolution[key],
        currency: countryCurrency?.currencyCode ?? 'NGN',
      });
    }

    const farmerSliceCopy = cloneDeep(farmerSlice);
    farmerSliceCopy[1].unitName = tempUnitName;
    const slice = farmerSliceCopy[1];

    const farmerCoolingUnitsStats: Array<FarmerCoolingUnitStats> = [];
    for (const lossKey in impactSlice.top5FoodLossEvolution) {
      const datum = {} as FarmerCoolingUnitStats;
      for (const metric in slice) {
        // eslint-disable-next-line
        // @ts-ignore
        datum[metric] = slice[metric][lossKey];
      }
      farmerCoolingUnitsStats.push(datum);
    }

    const checkInCrates = DataLoader._sortFarmerCoolingUnitStatsByKey(
      'checkInCratesCrop',
      farmerCoolingUnitsStats
    );
    const checkInKg = DataLoader._sortFarmerCoolingUnitStatsByKey(
      'checkInKgCrop',
      farmerCoolingUnitsStats
    );
    const checkOutCrates = DataLoader._sortFarmerCoolingUnitStatsByKey(
      'checkOutCratesCrop',
      farmerCoolingUnitsStats
    );
    const checkOutKg = DataLoader._sortFarmerCoolingUnitStatsByKey(
      'checkOutKgCrop',
      farmerCoolingUnitsStats
    );

    const lookupImages = await DataLoader._commoditiesLookupBuilder();

    return {
      dateRange: {
        start: dateFmt(STATIC_START_DATE, 'LL'),
        end: dateFmt(new Date().toISOString(), 'LL'),
      },
      farmerInfo,
      stats: {
        aggregatedImpactData: { ...impactSlice.aggregated },
        surveys: { ...impactSlice.surveys.at(0) },
        loss: { ...impactSlice.top5FoodLossEvolution },
        revenue: { ...impactSlice.top5RevenueEvolution },
        cools: farmerCoolingUnitsStats,
      },
      datums: {
        units: coolingUnitsNames.join(', '),
        checkInCrates,
        checkInKg,
        checkOutCrates,
        checkOutKg,
        checkInCratesImages: lookupImages(checkInCrates),
        checkInKgImages: lookupImages(checkInKg),
        checkOutCratesImages: lookupImages(checkOutCrates),
        checkOutKgImages: lookupImages(checkOutKg),
      },
    };
  }
  //
  // Private Methods
  //
  // - data fetching
  //
  private static async _loadFarmerInfoAndCompanies(farmer: Farmer) {
    const [baseStatsResult, allCompaniesResult] = await Promise.allSettled([
      // load farmer base stats
      FarmerService.getFarmerBaseSlice(farmer.id),
      // load all companies
      ColdtivateService.getCompanies(),
    ]);

    // safe values
    const farmerInfo = baseStatsResult.status === 'fulfilled' ? baseStatsResult.value : undefined;
    const allCompanies =
      allCompaniesResult.status === 'fulfilled' ? allCompaniesResult.value : undefined;

    const farmerCompanies =
      allCompanies?.filter((company) => farmer.companies.includes(company.id)) ?? [];

    return {
      farmerInfo,
      farmerCompanies,
      contextualCompanyId: useManagementStore.getState().company?.id || farmerCompanies.at(0)?.id,
    };
  }

  private static async _loadFarmerCoolingUnits(farmer: Farmer, companyId: number) {
    const allCoolingUnits = await ColdtivateService.getCoolingUnits({ company: companyId });

    const farmerCoolingUnits =
      allCoolingUnits?.filter((unit) => farmer.coolingUnits.includes(unit.id)) ?? [];

    return { farmerCoolingUnits, contextualCoolingUnitId: farmerCoolingUnits.at(0)?.id };
  }

  private static async _loadFarmerAnalytics(farmer: Farmer) {
    const [farmerSliceResult, impactSliceResult] = await Promise.allSettled([
      FarmerService.getFarmerSlice(farmer),
      FarmerService.getImpactSlice(farmer),
    ]);

    return {
      farmerSlice: farmerSliceResult.status === 'fulfilled' ? farmerSliceResult.value : undefined,
      impactSlice: impactSliceResult.status === 'fulfilled' ? impactSliceResult.value : undefined,
    };
  }
  //
  // - data transformation
  //
  private static _sortFarmerCoolingUnitStatsByKey<V = number>(
    key: keyof FarmerCoolingUnitStats,
    farmerCoolingUnitsStats: Array<FarmerCoolingUnitStats>
  ): Array<[string, V]> {
    const set = farmerCoolingUnitsStats.at(0);
    if (!set) return [];
    const obj = set[key];
    if (typeof obj !== 'object') return [];
    const entries = Object.entries(obj);
    entries.sort((a, b) => b[1] - a[1]);
    return entries;
  }

  private static async _commoditiesLookupBuilder() {
    const allCrops = await ColdtivateService.getAllCrops();

    const cropsMap: CropsLookupMap = new Map();
    for (const crop of allCrops) {
      cropsMap.set(camelCase(crop.name), {
        cropId: crop.id,
        name: crop.name,
        imageURL: crop.image,
      });
    }

    return function lookupImages<V = number>(entries: Array<[string, V]>) {
      if (!(entries.length >= 1)) return [];
      const list: Array<string | null> = [];
      for (const [commodity] of entries) {
        const cropDatum = cropsMap.get(camelCase(commodity));
        if (cropDatum) list.push(cropDatum.imageURL);
        else list.push(null);
      }
      return list;
    };
  }
}
