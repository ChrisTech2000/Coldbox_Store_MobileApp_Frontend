import { currencies } from 'currencies.json';
import startCase from 'lodash/startCase';

import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { dateFmt, Translator } from '#i18n/utils';
import { ManagementCompany } from '#stores/management';
import {
  type CompanyData,
  type CoolingUnit,
  type CoolingUnitImpact,
  ECoolingUnitType,
  type ImpactData,
} from '#types/global';
import { html } from '#ui/lib/templating/internals';
import {
  DetailsContainer,
  ImpactEvolution,
  ImpactGeneralSection,
  PillContainer,
  ScrollView,
  Section,
  Table,
  UsersSection,
  UtilizationSection,
} from '#ui/lib/templating/partials';

import { getMetricName, getMetricValue } from '.';
import { ConfigData } from '../components/Configuration';

///////////////////// UTILS
function getValue(
  data: CompanyData | CoolingUnitImpact | undefined,
  companyKey: keyof CompanyData,
  coolingUnitKey?: keyof CoolingUnitImpact
) {
  if (data && companyKey in data) {
    return (data as CompanyData)[companyKey]?.[0] ?? 0;
  } else if (data && coolingUnitKey && coolingUnitKey in data) {
    const val = (data as CoolingUnitImpact)[coolingUnitKey]['0'];
    return typeof val === 'number'
      ? val
      : Object.values(val ?? {}).reduce((acc, current) => (acc += current), 0);
  }
  return 0;
}

///////////////////// PDF CONTENT
export function generatePDFContent(
  t: Translator,
  coolingUnits: Array<CoolingUnit> | undefined,
  company: ManagementCompany | undefined,
  companyData: CompanyData | CoolingUnitImpact | undefined,
  impactData: ImpactData | undefined,
  mode: 'company' | 'aggregated' | 'comparison',
  configData?: ConfigData
) {
  const currencySymbol = currencies.find((c) => c.code === company?.currency)?.symbol ?? '';

  return html(
    mode === 'company'
      ? generateGeneralHtmlContent(t, company, companyData as CompanyData, coolingUnits)
      : '',
    mode === 'aggregated' ? generateConfigSection(t, configData!) : '',
    mode !== 'comparison' ? generateUsersHtmlContent(t, companyData, mode) : '',
    mode === 'company' ? generateUtilizationHtmlContent(t, companyData as CompanyData) : '',
    mode === 'aggregated' ? generateCratesHtmlContent(t, companyData as CoolingUnitImpact) : '',
    mode !== 'comparison'
      ? generateImpactHtml(t, impactData, currencySymbol, mode, companyData as CoolingUnitImpact)
      : '',
    mode === 'comparison'
      ? generateComparisonHtmlContent(
          t,
          companyData as CoolingUnitImpact,
          impactData as ImpactData,
          configData!,
          currencySymbol
        )
      : ''
  );
}

///////////////////// GENERAL CONTENT — COMPANY TAB
function generateCounters(coolingUnits: Array<CoolingUnit>) {
  const counters = {
    farmGateUnits: 0,
    marketUnits: 0,
    movableUnits: 0,
  };

  if (coolingUnits) {
    coolingUnits.forEach((unit) => {
      switch (unit.coolingUnitType) {
        case ECoolingUnitType.FARM_GATE_STORAGE_ROOM:
          counters.farmGateUnits += 1;
          break;
        case ECoolingUnitType.MARKET_STORAGE_ROOM:
          counters.marketUnits += 1;
          break;
        case ECoolingUnitType.MOVABLE_UNIT:
          counters.movableUnits += 1;
          break;
        default:
          break;
      }
    });
  }

  return counters;
}

function generateGeneralHtmlContent(
  t: Translator,
  company: ManagementCompany | undefined,
  companyData: CompanyData | undefined,
  coolingUnits: Array<CoolingUnit> | undefined
) {
  const coolingUnitsContent =
    coolingUnits?.length && coolingUnits.length > 1
      ? t(`Dashboard.Analytics.companyTab.coolingUnitsContent`, { amount: coolingUnits.length })
      : t(`Dashboard.Analytics.companyTab.singleCoolingUnitContent`);

  const coolingUnitsCapacity = coolingUnits?.reduce(
    (acc, unit) => (acc += unit.capacityInMetricTons),
    0
  );

  const counters = generateCounters(coolingUnits ?? []);

  return PillContainer({
    datums: [
      {
        label: t('Dashboard.Analytics.companyTab.companyNameLabel'),
        value: company?.name ?? '',
      },
      {
        label: t('Dashboard.Analytics.companyTab.revenueLabel'),
        value:
          companyData?.compRevenue?.[0]?.toLocaleString('en-US', {
            style: 'currency',
            currency: companyData?.currency?.[0] ?? DEFAULT_CURRENCY_CODE,
          }) ?? '',
      },
      {
        label: t('Dashboard.Analytics.companyTab.coolingUnitsLabel'),
        value: coolingUnitsContent,
      },
      {
        label: t('Dashboard.Analytics.companyTab.capacityLabel'),
        value: coolingUnitsCapacity ?? '',
      },
      {
        label: t('Dashboard.Analytics.companyTab.coolingUnitTypeLabel'),
        value: [
          t('Dashboard.Analytics.companyTab.coolingUnitTypeMarket', {
            amount: counters.marketUnits,
          }),
          t('Dashboard.Analytics.companyTab.coolingUnitTypeFarmGate', {
            amount: counters.farmGateUnits,
          }),
          t('Dashboard.Analytics.companyTab.coolingUnitTypeMovable', {
            amount: counters.movableUnits,
          }),
        ],
      },
    ],
  });
}

///////////////////// USERS CONTENT — MULTIPLE TABS
function generateUsersSection(
  title: string,
  data: { male: string; female: string; other?: string }
) {
  return UsersSection({
    title,
    data,
  });
}

function generateUsersHtmlContent(
  t: Translator,
  data: CompanyData | CoolingUnitImpact | undefined,
  mode: 'company' | 'aggregated' | 'comparison'
) {
  const femaleBen = Math.round(getValue(data, 'compBeneficiariesFem', 'roomBeneficiariesFem') ?? 0);
  const maleBen = Math.round(getValue(data, 'compBeneficiariesMa', 'roomBeneficiariesMa') ?? 0);

  const { employees, operators, users, userTypes, beneficiaries } = {
    employees: {
      total: getValue(data, 'compRegUsers', 'roomActiveUsers'),
      female: getValue(data, 'compRegUsersFem', 'roomActiveFem'),
      male: getValue(data, 'compRegUsersMa', 'roomActiveMa'),
      other: getValue(data, 'compRegUsersOt', 'roomActiveOt'),
    },
    operators: {
      total: getValue(data, 'compOp', 'roomOp'),
      female: getValue(data, 'compOpFem', 'roomOpFem'),
      male: getValue(data, 'compOpMa', 'roomOpMa'),
      other: getValue(data, 'compOpOt', 'roomOpOt'),
    },
    users: {
      total: getValue(data, 'compCoolUsers', 'roomActiveUsers'),
      female: getValue(data, 'compCoolUsersFem', 'roomActiveFem'),
      male: getValue(data, 'compCoolUsersMa', 'roomActiveMa'),
      other: getValue(data, 'compCoolUsersOt', 'roomActiveOt'),
    },
    userTypes: {
      farmer: getValue(data, 'compFarmers', undefined),
      trader: getValue(data, 'compTraders', undefined),
    },
    beneficiaries: {
      total: Number(femaleBen) + Number(maleBen),
      female: femaleBen,
      male: maleBen,
    },
  };

  return ScrollView({
    divs: [
      mode === 'company'
        ? generateUsersSection(
            t('Dashboard.Analytics.companyTab.usersTab.employeesTotal', {
              amount: employees.total ?? 0,
            }),
            {
              male: t('Dashboard.Analytics.maleLabel', { amount: employees.male ?? 0 }),
              female: t('Dashboard.Analytics.femaleLabel', { amount: employees.female ?? 0 }),
              other: t('Dashboard.Analytics.otherLabel', { amount: employees.other }),
            }
          )
        : '',
      generateUsersSection(
        t('Dashboard.Analytics.operatorsTotal', { amount: operators.total ?? 0 }),
        {
          male: t('Dashboard.Analytics.maleLabel', { amount: operators.male ?? 0 }),
          female: t('Dashboard.Analytics.femaleLabel', { amount: operators.female ?? 0 }),
          other: t('Dashboard.Analytics.otherLabel', { amount: employees.other }),
        }
      ),
      generateUsersSection(t('Dashboard.Analytics.usersTotal', { amount: users.total ?? 0 }), {
        male: t('Dashboard.Analytics.maleLabel', { amount: users.male ?? 0 }),
        female: t('Dashboard.Analytics.femaleLabel', { amount: users.female ?? 0 }),
        other: t('Dashboard.Analytics.otherLabel', { amount: users.other }),
      }),
      mode === 'company'
        ? generateUsersSection(t('Dashboard.Analytics.companyTab.usersTab.usersType'), {
            male: t('Dashboard.Analytics.companyTab.usersTab.farmersLabel', {
              amount: userTypes.farmer ?? 0,
            }),
            female: t('Dashboard.Analytics.companyTab.usersTab.tradersLabel', {
              amount: userTypes.trader ?? 0,
            }),
          })
        : '',
      generateUsersSection(
        t('Dashboard.Analytics.beneficiariesTotal', { amount: beneficiaries.total ?? 0 }),
        {
          male: t('Dashboard.Analytics.maleLabel', { amount: beneficiaries.male }),
          female: t('Dashboard.Analytics.femaleLabel', { amount: beneficiaries.female }),
        }
      ),
    ],
  });
}

///////////////////// UTILIZATION CONTENT — COMPANY TAB
function generateUtilizationSectionContent(checkedInText: string, checkedOutText: string) {
  return `
    <div class="text-lg">
      ${checkedInText}
    </div>
    <div class="bg-green-800 w-px h-8"></div>
    <div class="text-lg">
      ${checkedOutText}
    </div>
  `;
}

function generateUtilizationHtmlContent(t: Translator, companyData: CompanyData | undefined) {
  return ScrollView({
    divs: [
      UtilizationSection({
        title: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel'),
        content: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
          amount: companyData?.compAverageRoomOccupancy?.[0] || 0,
        }),
      }),
      UtilizationSection({
        title: t('Dashboard.Analytics.totalCratesLabel'),
        content: generateUtilizationSectionContent(
          t('Dashboard.Analytics.checkedInLabel', {
            amount: companyData?.compCratesIn?.[0] || 0,
          }),
          t('Dashboard.Analytics.checkedOutLabel', {
            amount: companyData?.compCratesOut?.[0] || 0,
          })
        ),
      }),
      UtilizationSection({
        title: t('Dashboard.Analytics.totalQuantityLabel'),
        content: generateUtilizationSectionContent(
          t('Dashboard.Analytics.checkedInLabel', {
            amount: companyData?.compKgIn?.[0] || 0,
          }),
          t('Dashboard.Analytics.checkedOutLabel', {
            amount: companyData?.compKgOut?.[0] || 0,
          })
        ),
      }),
      UtilizationSection({
        title: t('Dashboard.Analytics.totalOperations'),
        content: generateUtilizationSectionContent(
          t('Dashboard.Analytics.checkedInLabel', {
            amount: companyData?.compOpsIn?.[0] || 0,
          }),
          t('Dashboard.Analytics.checkedOutLabel', {
            amount: companyData?.compOpsOut?.[0] || 0,
          })
        ),
      }),
    ],
  });
}

///////////////////// IMPACT CONTENT — MULTIPLE TABS
function generateImpactHtml(
  t: Translator,
  impactData: ImpactData | undefined,
  currencySymbol: string,
  type: 'company' | 'aggregated' | 'comparison',
  coolingUnitData: CoolingUnitImpact | undefined
) {
  const foodLossFrom =
    getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselinePercLossMonth) || 0;
  const foodLossTo = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercLoss) || 0;
  const foodLossEvolution =
    getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercFoodlossEvolution) || 0;

  const revenueFrom =
    getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth) || 0;
  const revenueTo = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue) || 0;
  const revenueEvolution = getMetricValue(
    impactData?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution
  );

  const co2From = getMetricValue(impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From) || 0;
  const co2To = getMetricValue(impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To) || 0;
  const co2Evolution = co2To - co2From;

  const surveyPercentage =
    (getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys) /
      getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)) *
    100;

  const occupancy = Math.round(coolingUnitData?.averageRoomOccupancy?.[0] || 0);
  const revenue = coolingUnitData?.roomRevenue?.[0] || 0;

  return ScrollView({
    divs: [
      type === 'aggregated'
        ? ImpactGeneralSection({
            title: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel'),
            content: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
              amount: occupancy,
            }),
          })
        : '',
      ImpactEvolution({
        title: t('Dashboard.Analytics.companyTab.impactTab.foodLossLabel'),
        subtitle:
          foodLossTo === foodLossFrom
            ? `<span style="color: gray;">=</span>`
            : foodLossTo > foodLossFrom
              ? `<span style="color: red;">${foodLossEvolution.toFixed(2)}% ↑</span>`
              : `<span style="color: green;">${foodLossEvolution.toFixed(2)}% ↓</span>`,
        from: `<strong>${foodLossFrom.toFixed(2)}</strong>%`,
        to: `<strong>${foodLossTo.toFixed(2)}</strong>%`,
      }),
      ImpactEvolution({
        title: t('Dashboard.Analytics.companyTab.impactTab.revenueLabel'),
        subtitle:
          revenueTo === revenueFrom
            ? `<span style="color: gray;">${revenueEvolution.toFixed(2)}% =</span>`
            : revenueTo < revenueFrom
              ? `<span style="color: red;">${revenueEvolution.toFixed(2)}% ↓</span>`
              : `<span style="color: green;">${revenueEvolution.toFixed(2)}% ↑</span>`,
        from: `<strong>${currencySymbol} ${revenueFrom.toFixed(2)}</strong>`,
        to: `<strong>${currencySymbol} ${revenueTo.toFixed(2)}</strong>`,
      }),
      type === 'aggregated'
        ? ImpactGeneralSection({
            title: t('Dashboard.Analytics.tabsShared.roomRevenue'),
            content: `${revenue}`,
          })
        : '',
      ImpactEvolution({
        title: t('Dashboard.Analytics.companyTab.impactTab.co2Label'),
        subtitle:
          co2To === co2From
            ? `<span style="color: gray;">${co2Evolution.toFixed(2)} Kg =</span>`
            : co2To < co2From
              ? `<span style="color: green;">${co2Evolution.toFixed(2)} Kg ↓</span>`
              : `<span style="color: red;">${co2Evolution.toFixed(2)} Kg ↑</span>`,
        from: `<strong>${co2From.toFixed(2)}</strong> ${t('Dashboard.Analytics.companyTab.impactTab.co2WithoutCooling')}`,
        to: `<strong>${co2To.toFixed(2)}</strong> ${t('Dashboard.Analytics.companyTab.impactTab.co2WithCooling')}`,
      }),
      ImpactGeneralSection({
        title: t('Dashboard.Analytics.companyTab.impactTab.surveysAmountLabel'),
        content: `
            <div class="flex justify-center items-baseline">
              <strong class="text-2xl">${getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys)}</strong>
              <span class="text-base ml-1">/${getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)}</span>
            </div>
            <div class="text-4xl text-[#9B5DE5] mt-2">
              (${Number.isNaN(surveyPercentage) ? 0 : surveyPercentage.toFixed(2)}%)
            </div>`,
      }),
    ],
  });
}

///////////////////// CRATES CONTENT — AGGREGATED TAB
function generateCratesHtmlContent(
  t: Translator,
  data: CompanyData | CoolingUnitImpact | undefined
) {
  return ScrollView({
    divs: [
      UtilizationSection({
        title: t('Dashboard.Analytics.totalCratesLabel'),
        content: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
          amount: generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: getValue(data, 'compCratesIn', 'roomCratesIn'),
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: getValue(data, 'compCratesOut', 'roomCratesOut'),
            })
          ),
        }).split('%')[0],
      }),
      UtilizationSection({
        title: t('Dashboard.Analytics.totalQuantityLabel'),
        content: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
          amount: generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: getValue(data, 'compKgIn', 'roomKgIn'),
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: getValue(data, 'compKgOut', 'roomKgOut'),
            })
          ),
        }).split('%')[0],
      }),
      UtilizationSection({
        title: `${t('Dashboard.Analytics.totalOperations')}:`,
        content: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
          amount: generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: getValue(data, 'compOpsIn', 'roomOpsIn'),
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: getValue(data, 'compOpsOut', 'roomOpsOut'),
            })
          ),
        }).split('%')[0],
      }),
      UtilizationSection({
        title: t('Dashboard.Analytics.tabsShared.totalCo2Label'),
        content: t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
          amount: `${(data && 'totCo2' in data ? (data.totCo2['0'] ?? 0) : 0).toFixed(2)}`,
        }).split('%')[0],
      }),
    ],
  });
}

///////////////////// CONFIG DATA
function generateConfigSection(t: Translator, configData: ConfigData) {
  if (!configData) return '';

  return DetailsContainer({
    datums: [
      {
        label: t('Dashboard.Management.EditCoolingUsers.pdf.dateRange'),
        value: `${dateFmt(configData.startDate.toISOString(), 'MMMM dd, yyyy')} - ${dateFmt(configData.endDate.toISOString(), 'MMMM dd, yyyy')}`,
      },
      {
        label: t('Dashboard.Management.EditCoolingUsers.pdf.selectedUnits'),
        value: configData.coolingUnits.map((unit) => unit.name).join(', '),
      },
    ],
  });
}

///////////////////// COMPARISON TAB
function generateComparisonHtmlContent(
  t: Translator,
  cuData: CoolingUnitImpact | undefined,
  data: ImpactData | undefined,
  configData: ConfigData,
  currency: string
) {
  if (!configData || !cuData) return '';

  const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

  return ScrollView({
    divs: [
      generateConfigSection(t, configData),
      Section({ label: t('Dashboard.Analytics.comparisonTab.usersTab.operators') }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          operators: {
            name: t('Dashboard.Analytics.comparisonTab.usersTab.operators'),
            subHeaders: {
              male: t('gender.male'),
              female: t('gender.female'),
              other: t('gender.other'),
            },
          },
          total: t('Dashboard.Analytics.comparisonTab.total'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              const female = cuData?.roomOpFem?.[i] ?? 0;
              const male = cuData?.roomOpMa?.[i] ?? 0;
              const other = cuData?.roomOpOt?.[i] ?? 0;
              const total = cuData?.roomOp?.[i] ?? 0;

              return {
                unit: cuData.unitName?.[i] ?? '',
                male,
                female,
                other,
                total,
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({ label: t('Dashboard.Analytics.comparisonTab.usersTab.activeUsers') }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          users: {
            name: t('Dashboard.Analytics.comparisonTab.usersTab.activeUsers'),
            subHeaders: {
              male: t('gender.male'),
              female: t('gender.female'),
              other: t('gender.other'),
            },
          },
          total: t('Dashboard.Analytics.comparisonTab.total'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              const male = cuData?.roomActiveMa?.[i] ?? 0;
              const female = cuData?.roomActiveFem?.[i] ?? 0;
              const other = cuData?.roomActiveOt?.[i] ?? 0;
              const total = cuData?.roomActiveUsers?.[i] ?? 0;

              return {
                unit: cuData?.unitName?.[i] ?? '',
                male,
                female,
                other,
                total,
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({ label: t('Dashboard.Analytics.comparisonTab.usersTab.beneficiaries') }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          users: {
            name: t('Dashboard.Analytics.comparisonTab.usersTab.beneficiaries'),
            subHeaders: {
              male: t('gender.male'),
              female: t('gender.female'),
            },
          },
          total: t('Dashboard.Analytics.comparisonTab.total'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              const female = Math.floor(cuData?.roomBeneficiariesFem?.[i] ?? 0);
              const male = Math.floor(cuData?.roomBeneficiariesMa?.[i] ?? 0);

              return {
                unit: cuData?.unitName?.[i] ?? '',
                male,
                female,
                total: female + male,
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({ label: t('Dashboard.Analytics.totalCratesLabel'), kind: 'aggregated' }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          data: {
            name: t('Dashboard.Analytics.tabsShared.crates'),
            subHeaders: {
              checkIn: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn'),
              checkOut: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut'),
            },
          },
          total: t('Dashboard.Analytics.comparisonTab.total'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              const checkIn = cuData?.roomCratesIn?.[i] ?? 0;
              const checkOut = cuData?.roomCratesOut?.[i] ?? 0;

              return {
                unit: cuData?.unitName?.[i] ?? '',
                checkIn,
                checkOut,
                total: checkIn + checkOut,
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({ label: t('Dashboard.Analytics.totalQuantityLabel'), kind: 'aggregated' }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          data: {
            name: t('Dashboard.Analytics.comparisonTab.cratesTab.kg'),
            subHeaders: {
              checkIn: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn'),
              checkOut: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut'),
            },
          },
          total: t('Dashboard.Analytics.comparisonTab.total'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              const checkIn = cuData?.roomKgIn?.[i] ?? 0;
              const checkOut = cuData?.roomKgOut?.[i] ?? 0;

              return {
                unit: cuData?.unitName?.[i] ?? '',
                checkIn,
                checkOut,
                total: checkIn + checkOut,
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({ label: t('Dashboard.Analytics.totalOperations'), kind: 'aggregated' }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          data: {
            name: t('Dashboard.Analytics.comparisonTab.cratesTab.operations'),
            subHeaders: {
              checkIn: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn'),
              checkOut: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut'),
            },
          },
          total: t('Dashboard.Analytics.comparisonTab.total'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              const checkIn = cuData?.roomOpsIn?.[i] ?? 0;
              const checkOut = cuData?.roomOpsOut?.[i] ?? 0;

              return {
                unit: cuData?.unitName?.[i] ?? '',
                checkIn,
                checkOut,
                total: checkIn + checkOut,
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInCropDistribution'),
        kind: 'aggregated',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          crates: t('Dashboard.Analytics.comparisonTab.cratesTab.crates'),
          distribution: t('Dashboard.Analytics.comparisonTab.cratesTab.checkInCropDistribution'),
        },
        // eslint-disable-next-line
        // @ts-ignore
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              return {
                unit: cuData?.unitName?.[i] ?? '',
                crates: Object.values(cuData?.checkInCratesCrop?.[i] ?? {})?.map((item) => item),
                distribution: Object.keys(cuData?.checkInCratesCrop?.[i] ?? {})?.map((item) =>
                  startCase(item)
                ),
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution'),
        kind: 'aggregated',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          crates: t('Dashboard.Analytics.comparisonTab.cratesTab.crates'),
          distribution: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution'),
        },
        // eslint-disable-next-line
        // @ts-ignore
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              return {
                unit: cuData?.unitName?.[i] ?? '',
                crates: Object.values(cuData?.checkOutCratesCrop?.[i] ?? {})?.map((item) => item),
                distribution: Object.keys(cuData?.checkOutCratesCrop?.[i] ?? {})?.map((item) =>
                  startCase(item)
                ),
              };
            }),
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution'),
        kind: 'aggregated',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          crates: t('Dashboard.Analytics.comparisonTab.cratesTab.kg'),
          distribution: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution'),
        },
        // eslint-disable-next-line
        // @ts-ignore
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              return {
                unit: cuData?.unitName?.[i] ?? '',
                crates: Object.values(cuData?.checkInKgCrop?.[i] ?? {})?.map((item) => item),
                distribution: Object.keys(cuData?.checkInKgCrop?.[i] ?? {})?.map((item) =>
                  startCase(item)
                ),
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutKgDistribution'),
        kind: 'aggregated',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          crates: t('Dashboard.Analytics.comparisonTab.cratesTab.kg'),
          distribution: t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutKgDistribution'),
        },
        // eslint-disable-next-line
        // @ts-ignore
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              return {
                unit: cuData?.unitName?.[i] ?? '',
                crates: Object.values(cuData?.checkOutKgCrop?.[i] ?? {})?.map((item) => item),
                distribution: Object.keys(cuData?.checkOutKgCrop?.[i] ?? {})?.map((item) =>
                  startCase(item)
                ),
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.cratesTab.co2'),
        kind: 'aggregated',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          crates: t('Dashboard.Analytics.comparisonTab.cratesTab.co2EmissionsLabel'),
          distribution: t('Dashboard.Analytics.comparisonTab.cratesTab.co2DistributionLabel'),
        },
        // eslint-disable-next-line
        // @ts-ignore
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              return {
                unit: cuData?.unitName?.[i] ?? '',
                crates: Object.values(cuData?.co2Crops?.[i] ?? {})?.map((item) => item.toFixed(2)),
                distribution: Object.keys(cuData?.co2Crops?.[i] ?? {})?.map((item) =>
                  startCase(item)
                ),
              };
            }),
        total: Object.values(cuData?.unitName ?? {}).length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.impactTab.occupancyLabel'),
        kind: 'impact',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          data: t('Dashboard.Analytics.comparisonTab.impactTab.occupancy'),
        },
        rows: !cuData.unitName?.[0]
          ? [{ unit: t('Dashboard.Analytics.emptyState') }]
          : Array.from({ length: coolingUnitsLength }, (_, i) => {
              return {
                unit: cuData?.unitName?.[i] ?? '',
                data: `${(cuData?.averageRoomOccupancy?.[i] ?? 0).toFixed(2)}%`,
              };
            }),
        total: configData?.coolingUnits.length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.impactTab.foodLossLabel'),
        kind: 'impact',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          change: t('Dashboard.Analytics.comparisonTab.impactTab.changePercentage'),
          levels: t('Dashboard.Analytics.comparisonTab.impactTab.foodLossLevels'),
        },
        rows: Array.from({ length: coolingUnitsLength }, (_, i) => {
          const from = getMetricValue(data?.impactMetrics?.[0]?.avgBaselinePercLossMonth, i) || 0;
          const to = getMetricValue(data?.impactMetrics?.[0]?.avgMonthlyPercLoss, i) || 0;
          const sum =
            getMetricValue(data?.impactMetrics?.[0]?.avgMonthlyPercFoodlossEvolution, i) || 0;

          return {
            unit: getMetricName(data?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
            change: `${sum.toFixed(2)}%`,
            levels: `${from.toFixed(2)}% to ${to.toFixed(2)}%`,
          };
        }),
        total: configData?.coolingUnits.length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.impactTab.revenueLabel'),
        kind: 'impact',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          change: t('Dashboard.Analytics.comparisonTab.impactTab.changePercentage'),
          levels: t('Dashboard.Analytics.comparisonTab.impactTab.revenueLevels'),
        },
        rows: Array.from({ length: coolingUnitsLength }, (_, i) => {
          const from =
            getMetricValue(data?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) || 0;
          const to = getMetricValue(data?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue, i) || 0;
          const sum =
            getMetricValue(data?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution, i) ||
            0;

          return {
            unit: getMetricName(data?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
            change: `${sum.toFixed(2)}%`,
            levels: `${from.toFixed(2)} to ${to.toFixed(2)}`,
          };
        }),
        total: configData?.coolingUnits.length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.impactTab.revenuePerRoomLabel'),
        kind: 'impact',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          data: t('Dashboard.Analytics.comparisonTab.impactTab.revenueLevels'),
        },
        rows: Array.from({ length: coolingUnitsLength }, (_, i) => {
          return {
            unit: getMetricName(data?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
            data: `${currency}${(cuData?.roomRevenue?.[i] ?? 0).toFixed(2)}`,
          };
        }),
        total: configData?.coolingUnits.length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.impactTab.co2Label'),
        kind: 'impact',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          change: t('Dashboard.Analytics.comparisonTab.impactTab.changePercentage'),
          levels: t('Dashboard.Analytics.comparisonTab.impactTab.co2EmissionsLabel'),
        },
        rows: Array.from({ length: coolingUnitsLength }, (_, i) => {
          const from = data?.co2Metrics?.[i]?.co2Crops?.co2From || 0;
          const to = data?.co2Metrics?.[i]?.co2Crops?.co2To || 0;
          const sum = ((to - from) / (from || 1)) * 100;

          return {
            unit: getMetricName(data?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
            change: `${sum.toFixed(2)}%`,
            levels: `${from.toFixed(2)} to ${to.toFixed(2)}`,
          };
        }),
        total: configData?.coolingUnits.length ?? 0,
      }),

      Section({
        label: t('Dashboard.Analytics.comparisonTab.impactTab.surveysAmountLabel'),
        kind: 'impact',
      }),
      Table({
        columns: {
          unit: t('Dashboard.Management.EditCoolingUsers.pdf.coolingUnit'),
          percentage: t('Dashboard.Analytics.comparisonTab.impactTab.completePercentage'),
          impact: t('Dashboard.Analytics.impact'),
        },
        rows: Array.from({ length: coolingUnitsLength }, (_, i) => {
          const percentage =
            (getMetricValue(data?.impactMetrics?.[0]?.numPostHarvestSurveys, i) /
              getMetricValue(data?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom, i)) *
            100;
          return {
            unit: getMetricName(data?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
            percentage: `${Number.isNaN(percentage) ? 0 : percentage.toFixed(2)}%`,
            impact: `${getMetricValue(data?.impactMetrics?.[0]?.numPostHarvestSurveys, i) ?? 0} / ${getMetricValue(data?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom, i) ?? 0}`,
          };
        }),
        total: configData?.coolingUnits.length ?? 0,
      }),
    ],
  });
}
