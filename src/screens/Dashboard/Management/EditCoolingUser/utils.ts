import cloneDeep from 'lodash/cloneDeep';

import type { Farmer, FarmerImpactMetrics } from '#types/global';
import type { FarmersSliceResponse, GetAllCropsResponse } from '#types/api.responses';
import ColdtivateService from '#services/ColdtivateService';
import FarmerService, { STATIC_START_DATE } from '#services/FarmerService';
import { useManagementStore } from '#stores/management';
import { dateFmt } from '#i18n/utils';

import { countriesDict } from '../CompanyDetails/utils';

type FarmerRevenueImpactMetrics = FarmerImpactMetrics & { currency: string };
type FarmerCoolingUnitStats = Omit<FarmersSliceResponse, 'firstName' | 'lastName' | 'userType'>;

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
    if (!farmer) return undefined; // safe guard

    const { farmerCompanies, contextualCompanyId } =
      await DataLoader._loadFarmerInfoAndCompanies(farmer);

    // TODO: improve this return
    if (!(farmerCompanies.length >= 1) || !contextualCompanyId) {
      throw new Error('farmer not assigned to any company');
    }

    const { farmerCoolingUnits, contextualCoolingUnitId } =
      await DataLoader._loadFarmerCoolingUnits(farmer, contextualCompanyId);
    if (!(farmerCoolingUnits.length >= 1) || !contextualCoolingUnitId) {
      throw new Error('farmer does not have any check-ins');
    }

    const countryCurrency = countriesDict().getValueByName(farmer.country);

    const { farmerSlice, impactSlice } = await DataLoader._loadFarmerAnalytics(farmer);
    if (!farmerSlice || !impactSlice) throw new Error('farmer dit not fill in any surveys');

    const start = dateFmt(STATIC_START_DATE, 'LL');
    const end = dateFmt(new Date().toISOString(), 'LL');
    const aggregatedImpactData = { ...impactSlice.aggregated };
    const surveys = { ...impactSlice.surveys.at(0) };
    const loss = { ...impactSlice.top5FoodLossEvolution };
    const revenue = { ...impactSlice.top5RevenueEvolution };
    const names = farmerCoolingUnits.map((unit) => unit.name);

    const tempUnitName: Record<string, string> = {};
    const losses: Array<FarmerImpactMetrics> = [];
    const revenues: Array<FarmerRevenueImpactMetrics> = [];
    const units = names.join(', ');

    for (const key in impactSlice.top5FoodLossEvolution) {
      tempUnitName[key] = names[Number(key)];
      losses.push(impactSlice.top5FoodLossEvolution[key]);
      revenues.push({
        ...impactSlice.top5RevenueEvolution[key],
        currency: countryCurrency?.currencyCode ?? 'NGN',
      });
    }

    const farmerSliceCopy = cloneDeep(farmerSlice);
    farmerSliceCopy[1].unitName = tempUnitName;
    const slice = farmerSliceCopy[1];

    const cools: Array<FarmerCoolingUnitStats> = [];
    for (const lossKey in impactSlice.top5FoodLossEvolution) {
      const cool = {} as FarmerCoolingUnitStats;
      for (const metric in slice) {
        // eslint-disable-next-line
        // @ts-ignore
        cool[metric] = slice[metric][lossKey];
      }
      cools.push(cool);
    }

    const checkInCrates = DataLoader._sortFarmerCoolingUnitStatsByKey('checkInCratesCrop', cools);
    const checkInKg = DataLoader._sortFarmerCoolingUnitStatsByKey('checkInKgCrop', cools);
    const checkOutCrates = DataLoader._sortFarmerCoolingUnitStatsByKey('checkOutCratesCrop', cools);
    const checkOutKg = DataLoader._sortFarmerCoolingUnitStatsByKey('checkOutKgCrop', cools);

    const allCrops = await ColdtivateService.getAllCrops();

    const checkInCratesImages = DataLoader._getStatsImageByMetric(
      'checkInCratesCrop',
      cools,
      allCrops
    );
    console.log(checkInCratesImages);

    return farmer;
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
    // TODO: when fetching do not deserialize some fields such as crop names
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
    cools: Array<FarmerCoolingUnitStats>
  ): Array<[string, V]> {
    const set = cools.at(0);
    if (!set) return [];
    const obj = set[key];
    if (typeof obj !== 'object') return [];
    const entries = Object.entries(obj);
    entries.sort((a, b) => b[1] - a[1]);
    return entries;
  }

  private static _getStatsImageByMetric(
    metric: keyof FarmerCoolingUnitStats,
    cools: Array<FarmerCoolingUnitStats>,
    crops: Array<GetAllCropsResponse>
  ): Array<string | null> {
    const set = cools.at(0);
    if (!set) return [];
    const commodities = set[metric];
    if (typeof commodities !== 'object') return [];
    const list: Array<string | null> = [];
    for (const commodity in commodities) {
      const imageURL = crops.find((crop) => crop.name === commodity)?.image;
      if (imageURL) list.push(imageURL);
      else list.push(null);
    }
    return list;
  }
}
