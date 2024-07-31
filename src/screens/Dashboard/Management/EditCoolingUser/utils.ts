import type { Farmer } from '#types/global';
import ColdtivateService from '#services/ColdtivateService';
import FarmerService from '#services/FarmerService';
import { useManagementStore } from '#stores/management';

export class CoolingUserLoader {
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

  static async loadFarmerInfoAndCompanies(farmer: Farmer) {
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

  static async loadFarmerCoolingUnits(farmer: Farmer, companyId?: number) {
    const allCoolingUnits = await ColdtivateService.getCoolingUnits({ company: companyId });

    const farmerCoolingUnits =
      allCoolingUnits?.filter((unit) => farmer.coolingUnits.includes(unit.id)) ?? [];

    return { farmerCoolingUnits, contextualCoolingUnitId: farmerCoolingUnits.at(0)?.id };
  }

  static async loadFarmerAnalytics(farmer: Farmer) {
    const [farmerSliceResult, impactSliceResult] = await Promise.allSettled([
      FarmerService.getFarmerSlice(farmer),
      FarmerService.getImpactSlice(farmer),
    ]);

    return {
      farmerSlice: farmerSliceResult.status === 'fulfilled' ? farmerSliceResult.value : undefined,
      impactSlice: impactSliceResult.status === 'fulfilled' ? impactSliceResult.value : undefined,
    };
  }
}
