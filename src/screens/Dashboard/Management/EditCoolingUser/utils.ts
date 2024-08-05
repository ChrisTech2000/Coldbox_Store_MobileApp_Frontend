import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import camelCase from 'lodash/camelCase';

import type { Top5Data, Farmer, FarmerData } from '#types/global';
import ColdtivateService from '#services/ColdtivateService';
import FarmerImpactService from '#services/FarmerImpactService';
import { useManagementStore } from '#stores/management';

import { html } from '#ui/lib/templating/internals';
import {
  DetailsContainer,
  ImpactEvolution,
  PillContainer,
  Section,
  SurveyStatsCounter,
  SurveyStatsPercentage,
  Table,
} from '#ui/lib/templating/partials';
import { dateFmt } from '#i18n/utils';

import { countriesDict } from '../CompanyDetails/utils';
import { STATIC_START_DATE } from './index';

type FarmerRevenueImpactMetrics = Top5Data & { currency: string };
type FarmerCoolingUnitStats = Omit<FarmerData, 'firstName' | 'lastName' | 'userType'> & {
  checkInCratesImages?: Array<string>;
  checkInCratesCrop: Array<[string, number]>;
  checkInKgImages?: Array<string>;
  checkInKgCrop: Array<[string, number]>;
  checkOutCratesImages?: Array<string>;
  checkOutCratesCrop: Array<string>;
  checkOutKgImages?: Array<string>;
  checkOutKgCrop: Array<string>;
};
type CropsLookupMap = Map<string, { cropId: number; name: string; imageURL: string }>;

export class DataLoader {
  //
  // Public Methods
  //
  public static async loadFarmerRecord(farmerId: number): Promise<Farmer> {
    // load farmer record
    const farmer = await ColdtivateService.getFarmerById(farmerId);
    if (!farmer) throw new Error('farmer not found');

    // load farmer companies and cooling units
    const farmerResults = await ColdtivateService.getFarmerByUserId(farmer.user.id);
    const contextualFarmer = farmerResults?.at(0);
    if (!contextualFarmer) throw new Error('farmer not found');

    return contextualFarmer;
  }

  public static async aggregateFarmerData(farmer: Farmer) {
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
    const losses: Array<Top5Data> = [];
    const revenues: Array<FarmerRevenueImpactMetrics> = [];

    for (const key in impactSlice.top5FoodLossEvolution) {
      tempUnitName[key] = coolingUnitsNames[Number(key)];
      // --
      losses.push(cloneDeep(impactSlice.top5FoodLossEvolution[key]));
      // --
      const revenue = cloneDeep(impactSlice.top5RevenueEvolution[key]);
      set(revenue, 'currency', countryCurrency?.currencyCode ?? 'NGN');
      revenues.push(revenue as FarmerRevenueImpactMetrics);
    }

    const sliceCopy = cloneDeep(farmerSlice[1]);
    sliceCopy.unitName = tempUnitName;

    const builder = await DataLoader._commoditiesLookupBuilder();

    const farmerCoolingUnitsStats: Array<FarmerCoolingUnitStats> = [];
    for (const lossKey in impactSlice.top5FoodLossEvolution) {
      const datum = {} as FarmerCoolingUnitStats;
      for (const metric in sliceCopy) {
        // eslint-disable-next-line
        // @ts-ignore
        const clonedSet = cloneDeep(sliceCopy[metric][lossKey]);
        const key = metric as keyof FarmerData;

        switch (key) {
          case 'checkInCratesCrop':
          case 'checkInKgCrop':
          case 'checkOutCratesCrop':
          case 'checkOutKgCrop': {
            // eslint-disable-next-line
            // @ts-ignore
            datum[key] = builder.sort(clonedSet);
            // eslint-disable-next-line
            // @ts-ignore
            datum[key.replace('Crop', 'Images')] = builder.lookupImages(datum[key]);
            continue;
          }
          default: {
            // eslint-disable-next-line
            // @ts-ignore
            datum[key] = clonedSet;
            continue;
          }
        }
      }

      farmerCoolingUnitsStats.push(datum);
    }

    return {
      dateRange: {
        start: STATIC_START_DATE,
        end: new Date().toISOString().split('T')[0],
      },
      farmerInfo,
      stats: {
        aggregatedImpactData: { ...impactSlice.aggregated },
        surveys: { ...impactSlice.surveys.at(0) },
        loss: { ...impactSlice.top5FoodLossEvolution },
        revenue: { ...impactSlice.top5RevenueEvolution },
        cools: farmerCoolingUnitsStats,
        losses,
        revenues,
      },
      datums: {
        currencyCode: countryCurrency?.currencyCode ?? 'NGN',
        units: coolingUnitsNames.join(', '),
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
      FarmerImpactService.getFarmerBaseImpact(farmer.id),
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
    const startDate = new Date(STATIC_START_DATE);
    const endDate = new Date();

    const [farmerSliceResult, impactSliceResult] = await Promise.allSettled([
      FarmerImpactService.getFarmerImpact({
        farmerId: farmer.id,
        unitIds: farmer.coolingUnits,
        startDate,
        endDate,
      }),
      FarmerImpactService.getImpact({
        farmerId: farmer.id,
        unitIds: farmer.coolingUnits,
        startDate,
        endDate,
      }),
    ]);

    return {
      farmerSlice: farmerSliceResult.status === 'fulfilled' ? farmerSliceResult.value : undefined,
      impactSlice: impactSliceResult.status === 'fulfilled' ? impactSliceResult.value : undefined,
    };
  }
  //
  // - data transformation
  //
  private static async _commoditiesLookupBuilder() {
    const allCrops = await ColdtivateService.getAllCrops();

    const _cropsMap: CropsLookupMap = new Map();
    for (const crop of allCrops) {
      _cropsMap.set(camelCase(crop.name), {
        cropId: crop.id,
        name: crop.name,
        imageURL: crop.image,
      });
    }

    return {
      sort(set: Record<string, number>): Array<[string, number]> {
        return Object.entries(set)
          .sort((a, b) => b[1] - a[1])
          .map(([key, value]) => [_cropsMap.get(key)?.name ?? key, value]);
      },
      lookupImages<V = number>(entries: Array<[string, V]>) {
        if (!(entries.length >= 1)) return [];
        const list: Array<string | null> = [];
        for (const [commodity] of entries) {
          const cropDatum = _cropsMap.get(camelCase(commodity));
          if (cropDatum) list.push(cropDatum.imageURL);
          else list.push(null);
        }
        return list;
      },
    };
  }
}

export type AggregatedFarmerData = Awaited<ReturnType<typeof DataLoader.aggregateFarmerData>>;

export function getPdfContent(data: AggregatedFarmerData): string {
  const foodLossEvolution = data.stats.aggregatedImpactData.avgMonthlyPercFoodlossEvolution;
  const foodLossOutcome =
    foodLossEvolution > 0 ? 'increase' : foodLossEvolution < 0 ? 'reduction' : 'no-change';

  const revenueEvolution = data.stats.aggregatedImpactData.avgMonthlyPercRevenueIncreaseEvolution;
  const revenueOutcome =
    revenueEvolution > 0 ? 'increase' : revenueEvolution < 0 ? 'reduction' : 'no-change';

  return html(
    DetailsContainer({
      datums: [
        {
          label: 'Date range',
          value: `${dateFmt(data.dateRange.start, 'MMMM dd, yyyy')} - ${dateFmt(data.dateRange.end, 'MMMM dd, yyyy')}`,
        },
        {
          label: 'Selected cooling units',
          value: data.datums.units,
        },
      ],
    }),
    PillContainer({
      datums: [
        {
          label: 'Cooling User Name',
          value: [data.farmerInfo?.firstName?.[0] ?? '', data.farmerInfo?.lastName?.[0] ?? ''].join(
            ' '
          ),
        },
        {
          label: 'Cooling User Type',
          value: data.farmerInfo?.userType?.[0] ?? '',
        },
        {
          label: 'Avg Storage Time',
          value: `${data.farmerInfo?.avgStorageDays?.toFixed(2)} day(s)`,
        },
        {
          label: 'Cold Storage Cost',
          value: [data.datums.currencyCode, data.farmerInfo?.totalStorageCost].join(' '),
        },
      ],
    }),
    Section({ label: '🧺 Total crates' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        crates: {
          name: 'Crates',
          subHeaders: { checkIn: 'Checked In', checkOut: 'Checked Out' },
        },
      },
      rows:
        data?.stats?.cools?.map((cool) => ({
          unit: cool.unitName ?? '',
          checkIn: cool.roomCratesIn,
          checkOut: cool.roomCratesOut,
        })) ?? [],
    }),
    Section({ label: '📦 Total quantity (kg)' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        metric: {
          name: 'Kg',
          subHeaders: { checkIn: 'Checked In', checkOut: 'Checked Out' },
        },
      },
      rows:
        data?.stats?.cools?.map((cool) => ({
          unit: cool.unitName ?? '',
          checkIn: cool.roomKgIn,
          checkOut: cool.roomKgOut,
        })) ?? [],
    }),
    Section({ label: '👷🏽‍♂️ Total operations' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        operations: {
          name: 'Operations',
          subHeaders: { checkIn: 'Checked In', checkOut: 'Checked Out' },
        },
      },
      rows:
        data?.stats?.cools?.map((cool) => ({
          unit: cool.unitName ?? '',
          checkIn: cool.roomOpsIn,
          checkOut: cool.roomOpsOut,
        })) ?? [],
    }),
    Section({ label: '🧺 Check-in crop distribution (crates)' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        crates: 'Crates',
        crop: 'Check-in crop distribution',
      },
      rows: data?.stats.cools?.map((cool) => ({
        unit: cool.unitName ?? '',
        crates: cool.checkInCratesCrop.map((item) => item[1]),
        crop: cool.checkInCratesCrop.map((item) => item[0]),
      })),
    }),
    Section({ label: '🧺 Check-out crop distribution (crates)' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        crates: 'Crates',
        crop: 'Check-out crop distribution',
      },
      rows: data?.stats.cools?.map((cool) => ({
        unit: cool.unitName ?? '',
        crates: cool.checkOutCratesCrop.map((item) => item[1]),
        crop: cool.checkOutCratesCrop.map((item) => item[0]),
      })),
    }),
    Section({ label: '⚖️ Check-in crop distribution (kg)' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        weight: 'kg',
        crop: 'Check-in crop distribution',
      },
      rows: data?.stats.cools?.map((cool) => ({
        unit: cool.unitName ?? '',
        weight: cool.checkInKgCrop.map((item) => item[1]),
        crop: cool.checkInKgCrop.map((item) => item[0]),
      })),
    }),
    Section({ label: '⚖️ Check-out crop distribution (kg)' }),
    Table({
      columns: {
        unit: 'Cooling unit',
        weight: 'kg',
        crop: 'Check-out crop distribution',
      },
      rows: data?.stats.cools?.map((cool) => ({
        unit: cool.unitName ?? '',
        weight: cool.checkOutKgCrop.map((item) => item[1]),
        crop: cool.checkOutKgCrop.map((item) => item[0]),
      })),
    }),
    SurveyStatsCounter({
      datums: [
        {
          title: 'Fill Baseline Surveys',
          max: data.stats.surveys.numOfPossibleBaselineSurveys ?? 0,
          current: data.stats.surveys.numFilledBaselineSurveys ?? 0,
          message: `You have ${(data.stats.surveys.numOfPossibleBaselineSurveys ?? 0) - (data.stats.surveys.numFilledBaselineSurveys ?? 0)} surveys to complete 😟`,
        },
        {
          title: 'Fill Post Checkouts Surveys',
          max: data.stats.surveys.numOfPossiblePostcheckoutSurveys ?? 0,
          current: data.stats.surveys.numOfFilledPostcheckoutSurveys ?? 0,
          message: `You have ${(data.stats.surveys.numOfPossiblePostcheckoutSurveys ?? 0) - (data.stats.surveys.numOfFilledPostcheckoutSurveys ?? 0)} surveys to complete 😟`,
        },
      ],
    }),
    ImpactEvolution({
      title: '🥗 Food loss evolution',
      subtitle: `${foodLossOutcome} in food loss`,
      from: `${data.stats.aggregatedImpactData.avgBaselinePercLossMonth.toFixed(2)}%`,
      to: `${data.stats.aggregatedImpactData.avgMonthlyPercLoss.toFixed(2)}%`,
    }),
    Section({ label: '🥗 Food loss evolution per crop (top 5)', kind: 'impact' }),
    Table({
      columns: {
        crop: 'Crop',
        change: '% change',
        loss: 'Food loss levels',
      },
      rows: data.stats.losses?.map((item) => ({
        crop: item.cropName ?? '',
        change: item.avgMonthlyPercFoodlossEvolution ?? 0,
        loss: `${(item.avgBaselinePercLossMonth ?? 0).toFixed(2)}% to ${(item.avgMonthlyPercLoss ?? 0).toFixed(2)}%`,
      })),
    }),
    ImpactEvolution({
      title: '💰 Average revenue evolution',
      subtitle: `${revenueOutcome} in user revenue`,
      from: `${data.datums.currencyCode} ${data.stats.aggregatedImpactData.avgBaselineFarmerRevenueMonth.toFixed(2)}`,
      to: `${data.datums.currencyCode} ${data.stats.aggregatedImpactData.avgMonthlyFarmerRevenue.toFixed(2)}`,
    }),
    Section({ label: '💰 Average revenue evolution per crop (top 5)', kind: 'impact' }),
    Table({
      columns: {
        crop: 'Crop',
        change: '% change',
        revenue: 'Revenue levels',
      },
      rows: data.stats.revenues?.map((item) => ({
        crop: item.cropName ?? '',
        change: item.avgMonthlyPercRevenueIncreaseEvolution ?? 0,
        revenue: `${data.datums.currencyCode} ${(item.avgBaselineFarmerRevenueMonth ?? 0).toFixed(2)} to ${data.datums.currencyCode} ${(item.avgMonthlyFarmerRevenue ?? 0).toFixed(2)}`,
      })),
    }),
    SurveyStatsPercentage({
      title: '📊 No. of baseline surveys completed',
      chipText: 'Fill Baseline Surveys',
      current: data.stats.surveys.numFilledBaselineSurveys ?? 0,
      max: data.stats.surveys.numOfPossibleBaselineSurveys ?? 0,
    }),
    SurveyStatsPercentage({
      title: '📊 No. of post-checkout surveys completed',
      chipText: 'Fill Post Checkout Surveys',
      current: data.stats.surveys.numOfFilledPostcheckoutSurveys ?? 0,
      max: data.stats.surveys.numOfPossiblePostcheckoutSurveys ?? 0,
    })
  );
}
