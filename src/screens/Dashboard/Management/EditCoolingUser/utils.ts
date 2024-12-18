import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import camelCase from 'lodash/camelCase';

import type { Top5Data, Farmer, FarmerData, BankAccount, Company } from '#types/global';
import ColdtivateService from '#services/ColdtivateService';
import FarmerImpactService from '#services/FarmerImpactService';
import { useManagementStore } from '#stores/management';
import MarketplaceService from '#services/MarketplaceService';

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
import { dateFmt, type Translator } from '#i18n/utils';

import { countriesDict } from '../CompanyDetails/utils';
import type { GetAllCropsResponse } from '#types/api.responses';

export const CONSTRAINT_EXCEPTIONS = {
  FARMER_NOT_FOUND: 'farmer not found',
  NO_COMPANY_ASSIGNED: 'farmer not assigned to any company',
  NO_CHECK_INS: 'farmer does not have any check-ins',
  NO_SURVEYS: 'farmer dit not fill-in any surveys',
} as const;

const STATIC_START_DATE = '2022-10-01';

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
type ContextualFarmer = {
  farmer: Farmer;
  payoutDetails: BankAccount | null;
};
export type AggregateFarmerDataArgs = {
  farmer: Farmer;
  companies: Array<Company>;
  crops: Array<GetAllCropsResponse>;
};

export class DataLoader {
  //
  // Public Methods
  //
  public static async loadFarmerRecord(farmerId: number): Promise<ContextualFarmer> {
    // load farmer record
    const farmer = await ColdtivateService.getFarmerById(farmerId);
    if (!farmer) throw new Error(CONSTRAINT_EXCEPTIONS.FARMER_NOT_FOUND);

    const [payoutDetailsResult, farmerResultsResult] = await Promise.allSettled([
      MarketplaceService.getFarmerBankAccounts(farmer.user.id),
      ColdtivateService.getFarmerByUserId(farmer.user.id),
    ]);

    const payoutDetails =
      payoutDetailsResult.status === 'fulfilled' ? payoutDetailsResult.value : null;
    const farmerResults =
      farmerResultsResult.status === 'fulfilled' ? farmerResultsResult.value : null;

    const contextualFarmer = farmerResults?.at(0);
    if (!contextualFarmer) throw new Error(CONSTRAINT_EXCEPTIONS.FARMER_NOT_FOUND);

    return { farmer: contextualFarmer, payoutDetails };
  }

  public static async aggregateFarmerData(args: AggregateFarmerDataArgs) {
    const { farmer, companies, crops } = args;

    const { farmerInfo, farmerCompanies, contextualCompanyId } =
      await DataLoader._loadFarmerInfoAndCompanies(farmer, companies);
    if (!(farmerCompanies.length >= 1) || !contextualCompanyId) {
      throw new Error(CONSTRAINT_EXCEPTIONS.NO_COMPANY_ASSIGNED);
    }

    const { farmerCoolingUnits, contextualCoolingUnitId } =
      await DataLoader._loadFarmerCoolingUnits(farmer, contextualCompanyId);
    if (!(farmerCoolingUnits.length >= 1) || !contextualCoolingUnitId) {
      throw new Error(CONSTRAINT_EXCEPTIONS.NO_CHECK_INS);
    }

    const { farmerSlice, impactSlice } = await DataLoader._loadFarmerAnalytics(farmer);
    if (!farmerSlice || !impactSlice) throw new Error(CONSTRAINT_EXCEPTIONS.NO_SURVEYS);

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
      set(revenue, 'currency', countryCurrency?.currency ?? 'NGN');
      revenues.push(revenue as FarmerRevenueImpactMetrics);
    }

    const sliceCopy = cloneDeep(farmerSlice[1]);
    sliceCopy.unitName = tempUnitName;

    const builder = await DataLoader._commoditiesLookupBuilder(crops);

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
        currencyCode: countryCurrency?.currency ?? 'NGN',
        units: coolingUnitsNames.join(', '),
        farmerCompanies,
        farmerCoolingUnits,
      },
    };
  }

  //
  // Private Methods
  //
  // - data fetching
  //
  private static async _loadFarmerInfoAndCompanies(farmer: Farmer, companies: Array<Company>) {
    // load farmer base stats
    const farmerInfo = await FarmerImpactService.getFarmerBaseImpact(farmer.id);

    const companiesSet = new Set<number>(farmer.companies);
    const farmerCompanies = companies.filter((company) => companiesSet.has(company.id));

    return {
      farmerInfo,
      farmerCompanies,
      contextualCompanyId: useManagementStore.getState().company?.id || farmerCompanies.at(0)?.id,
    };
  }

  private static async _loadFarmerCoolingUnits(farmer: Farmer, companyId: number) {
    const allCoolingUnits = await ColdtivateService.getCoolingUnits({ company: companyId });

    const unitsSet = new Set<number>(farmer.coolingUnits);
    const farmerCoolingUnits = (allCoolingUnits ?? []).filter((unit) => unitsSet.has(unit.id));

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
  private static async _commoditiesLookupBuilder(crops: Array<GetAllCropsResponse>) {
    const _cropsMap: CropsLookupMap = new Map(
      crops.map((crop) => [
        camelCase(crop.name),
        {
          cropId: crop.id,
          name: crop.name,
          imageURL: crop.image,
        },
      ])
    );

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

export function getPdfContent(data: AggregatedFarmerData, t: Translator): string {
  const foodLossEvolution = data.stats.aggregatedImpactData.avgMonthlyPercFoodlossEvolution;
  const foodLossOutcome =
    foodLossEvolution > 0
      ? t('Dashboard.Analytics.farmersAnalytics.increaseInFoodLoss')
      : foodLossEvolution < 0
        ? t('Dashboard.Analytics.farmersAnalytics.decreaseInFoodLoss')
        : t('Dashboard.Analytics.farmersAnalytics.noChangeFoodLoss');

  const revenueEvolution = data.stats.aggregatedImpactData.avgMonthlyPercRevenueIncreaseEvolution;
  const revenueOutcome =
    revenueEvolution > 0 ? 'increase' : revenueEvolution < 0 ? 'reduction' : 'no-change';

  const baselineSurveyOutcome =
    data.stats.surveys.numFilledBaselineSurveys === data.stats.surveys.numOfPossibleBaselineSurveys
      ? '🤝'
      : t('Dashboard.Analytics.farmersAnalytics.baseLineSurveyMessage', {
          amount:
            (data.stats.surveys.numOfPossibleBaselineSurveys ?? 0) -
            (data.stats.surveys.numFilledBaselineSurveys ?? 0),
        });

  const postcheckoutSurveyOutcome =
    data.stats.surveys.numOfFilledPostcheckoutSurveys ===
    data.stats.surveys.numOfPossiblePostcheckoutSurveys
      ? '🤝'
      : t('Dashboard.Analytics.farmersAnalytics.postCheckOutSurveyMessage', {
          amount:
            (data.stats.surveys.numOfPossiblePostcheckoutSurveys ?? 0) -
            (data.stats.surveys.numOfFilledPostcheckoutSurveys ?? 0),
        });

  return html(
    DetailsContainer({
      datums: [
        {
          label: t('Dashboard.Management.EditCoolingUsers.pdf.dateRange'),
          value: `${dateFmt(data.dateRange.start, 'MMMM dd, yyyy')} - ${dateFmt(data.dateRange.end, 'MMMM dd, yyyy')}`,
        },
        {
          label: t('Dashboard.Management.EditCoolingUsers.pdf.selectedUnits'),
          value: data.datums.units,
        },
      ],
    }),
    PillContainer({
      datums: [
        {
          label: t('Dashboard.Analytics.farmersAnalytics.coolingUserName'),
          value: [data.farmerInfo?.firstName?.[0] ?? '', data.farmerInfo?.lastName?.[0] ?? ''].join(
            ' '
          ),
        },
        {
          label: t('Dashboard.Analytics.farmersAnalytics.coolingUserType'),
          value: data.farmerInfo?.userType?.[0] ?? '',
        },
        {
          label: t('Dashboard.Analytics.farmersAnalytics.avgStorageTime'),
          value: `${data.farmerInfo?.avgStorageDays?.['0']?.toFixed(2)} day(s)`,
        },
        {
          label: t('Dashboard.Analytics.farmersAnalytics.coldStorageCost'),
          value:
            data.farmerInfo?.totalStorageCost?.['0']?.toLocaleString('en-US', {
              style: 'currency',
              currency: data.datums.currencyCode,
            }) ?? '',
        },
      ],
    }),
    Section({ label: t('Dashboard.Analytics.totalCratesLabel') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        crates: {
          name: t('Dashboard.Analytics.comparisonTab.cratesTab.crates'),
          subHeaders: {
            checkIn: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn'),
            checkOut: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut'),
          },
        },
      },
      rows:
        data?.stats?.cools?.map((cool, index) => ({
          unit: cool.unitName?.[index] ?? '',
          checkIn: cool.roomCratesIn?.[index] ?? 0,
          checkOut: cool.roomCratesOut?.[index] ?? 0,
        })) ?? [],
    }),
    Section({ label: t('Dashboard.Analytics.totalQuantityLabel') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        metric: {
          name: t('Dashboard.Analytics.comparisonTab.cratesTab.kg'),
          subHeaders: {
            checkIn: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn'),
            checkOut: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut'),
          },
        },
      },
      rows:
        data?.stats?.cools?.map((cool, index) => ({
          unit: cool.unitName?.[index] ?? '',
          checkIn: cool.roomKgIn?.[index] ?? 0,
          checkOut: cool.roomKgOut?.[index] ?? 0,
        })) ?? [],
    }),
    Section({ label: t('Dashboard.Analytics.totalOperations') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        operations: {
          name: t('Dashboard.Analytics.comparisonTab.cratesTab.operations'),
          subHeaders: {
            checkIn: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn'),
            checkOut: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut'),
          },
        },
      },
      rows:
        data?.stats?.cools?.map((cool, index) => ({
          unit: cool.unitName?.[index] ?? '',
          checkIn: cool.roomOpsIn?.[index] ?? 0,
          checkOut: cool.roomOpsOut?.[index] ?? 0,
        })) ?? [],
    }),
    Section({ label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInCropDistribution') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        crates: t('Dashboard.Analytics.comparisonTab.cratesTab.crates'),
        crop: t('Dashboard.Analytics.comparisonTab.cratesTab.checkInCropDistribution'),
      },
      // eslint-disable-next-line
      // @ts-ignore
      rows: data?.stats.cools?.map((cool, index) => ({
        unit: cool.unitName?.[index] ?? '',
        crates: cool.checkInCratesCrop.map((item) => item[1]),
        crop: cool.checkInCratesCrop.map((item) => item[0]),
      })),
    }),
    Section({ label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        crates: t('Dashboard.Analytics.comparisonTab.cratesTab.crates'),
        crop: t('Dashboard.Analytics.comparisonTab.cratesTab.checkOutCropDistribution'),
      },
      // eslint-disable-next-line
      // @ts-ignore
      rows: data?.stats.cools?.map((cool, index) => ({
        unit: cool.unitName?.[index] ?? '',
        crates: cool.checkOutCratesCrop.map((item) => item[1]),
        crop: cool.checkOutCratesCrop.map((item) => item[0]),
      })),
    }),
    Section({ label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        weight: t('Dashboard.Analytics.comparisonTab.cratesTab.kg'),
        crop: t('Dashboard.Analytics.comparisonTab.cratesTab.checkInCropDistribution'),
      },
      // eslint-disable-next-line
      // @ts-ignore
      rows: data?.stats.cools?.map((cool, index) => ({
        unit: cool.unitName?.[index] ?? '',
        weight: cool.checkInKgCrop.map((item) => item[1]),
        crop: cool.checkInKgCrop.map((item) => item[0]),
      })),
    }),
    Section({ label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutKgDistribution') }),
    Table({
      columns: {
        unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
        weight: t('Dashboard.Analytics.comparisonTab.cratesTab.kg'),
        crop: t('Dashboard.Analytics.comparisonTab.cratesTab.checkOutCropDistribution'),
      },
      // eslint-disable-next-line
      // @ts-ignore
      rows: data?.stats.cools?.map((cool, index) => ({
        unit: cool.unitName?.[index] ?? '',
        weight: cool.checkOutKgCrop.map((item) => item[1]),
        crop: cool.checkOutKgCrop.map((item) => item[0]),
      })),
    }),
    SurveyStatsCounter({
      datums: [
        {
          title: t('Dashboard.Analytics.farmersAnalytics.baselineSurveyButton'),
          max: data.stats.surveys.numOfPossibleBaselineSurveys ?? 0,
          current: data.stats.surveys.numFilledBaselineSurveys ?? 0,
          message: baselineSurveyOutcome,
        },
        {
          title: t('Dashboard.Analytics.farmersAnalytics.postCheckOutSurveyButton'),
          max: data.stats.surveys.numOfPossiblePostcheckoutSurveys ?? 0,
          current: data.stats.surveys.numOfFilledPostcheckoutSurveys ?? 0,
          message: postcheckoutSurveyOutcome,
        },
      ],
    }),
    ImpactEvolution({
      title: t('Dashboard.Analytics.comparisonTab.impactTab.foodLossLabel'),
      subtitle: foodLossOutcome,
      from: `${data.stats.aggregatedImpactData.avgBaselinePercLossMonth.toFixed(2)}%`,
      to: `${data.stats.aggregatedImpactData.avgMonthlyPercLoss.toFixed(2)}%`,
    }),
    Section({ label: t('Dashboard.Analytics.farmersAnalytics.foodLossEvolution'), kind: 'impact' }),
    Table({
      columns: {
        crop: t('Dashboard.Analytics.farmersAnalytics.crops'),
        change: t('Dashboard.Analytics.farmersAnalytics.changePercentage'),
        loss: t('Dashboard.Analytics.farmersAnalytics.foodLossLevels'),
      },
      rows: data.stats.losses?.map((item) => ({
        crop: item.cropName ?? '',
        change: item.avgMonthlyPercFoodlossEvolution ?? 0,
        loss: `${(item.avgBaselinePercLossMonth ?? 0).toFixed(2)}% to ${(item.avgMonthlyPercLoss ?? 0).toFixed(2)}%`,
      })),
    }),
    ImpactEvolution({
      title: t('Dashboard.Analytics.farmersAnalytics.revenueEvolution'),
      subtitle: `${revenueOutcome} in user revenue`,
      from: `${data.datums.currencyCode} ${data.stats.aggregatedImpactData.avgBaselineFarmerRevenueMonth.toFixed(2)}`,
      to: `${data.datums.currencyCode} ${data.stats.aggregatedImpactData.avgMonthlyFarmerRevenue.toFixed(2)}`,
    }),
    Section({
      label: t('Dashboard.Analytics.farmersAnalytics.revenueCropEvolution'),
      kind: 'impact',
    }),
    Table({
      columns: {
        crop: t('Dashboard.Analytics.farmersAnalytics.crops'),
        change: t('Dashboard.Analytics.farmersAnalytics.changePercentage'),
        revenue: t('Dashboard.Analytics.farmersAnalytics.revenueLevels'),
      },
      rows: data.stats.revenues?.map((item) => ({
        crop: item.cropName ?? '',
        change: item.avgMonthlyPercRevenueIncreaseEvolution ?? 0,
        revenue: `${data.datums.currencyCode} ${(item.avgBaselineFarmerRevenueMonth ?? 0).toFixed(2)} to ${data.datums.currencyCode} ${(item.avgMonthlyFarmerRevenue ?? 0).toFixed(2)}`,
      })),
    }),
    SurveyStatsPercentage({
      title: t('Dashboard.Analytics.farmersAnalytics.baselineSurveyLabel'),
      chipText: t('Dashboard.Analytics.farmersAnalytics.baselineSurveyButton'),
      current: data.stats.surveys.numFilledBaselineSurveys ?? 0,
      max: data.stats.surveys.numOfPossibleBaselineSurveys ?? 0,
    }),
    SurveyStatsPercentage({
      title: t('Dashboard.Analytics.farmersAnalytics.postCheckoutSurveyLabel'),
      chipText: t('Dashboard.Analytics.farmersAnalytics.postCheckOutSurveyButton'),
      current: data.stats.surveys.numOfFilledPostcheckoutSurveys ?? 0,
      max: data.stats.surveys.numOfPossiblePostcheckoutSurveys ?? 0,
    })
  );
}
