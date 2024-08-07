import { currencies } from 'currencies.json';

import { Translator } from '#i18n/utils';
import {
  type CompanyData,
  type CoolingUnit,
  type ImpactData,
  type CoolingUnitImpact,
  ECoolingUnitType,
} from '#types/global';
import { ManagementCompany } from '#stores/management';
import { getMetricValue } from './getMetricValue';

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
      : Object.values(val).reduce((acc, current) => (acc += current), 0);
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
  mode: 'company' | 'aggregated' | 'comparison'
) {
  const currencySymbol = currencies.find((c) => c.code === company?.currency)?.symbol ?? '';

  return `
    <html>
      <head>
         <style>
          html { -webkit-print-color-adjust: exact; }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }
          .card {
            background-color: #4b0082; 
            border-radius: 4px;
            padding: 8px 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .label {
            font-size: 18px; 
            color: #ffffff;
          }
          .value {
            font-size: 18px; 
            color: #ffffff; 
            font-weight: bold;
          }
          .scroll-view {
            width: 100%;
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .section {
            width: 100%;
            background-color: rgba(0, 128, 0, 0.2);
            padding: 8px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 8px 0;
          }
          .section2 {
            background-color: #e5e7eb;
          }
          .section3 {
            background-color: #eee9fd;
          }
          .section-title {
            font-size: 18px;
            margin-bottom: 8px;
          }
          .section-content {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
          }
          .divider {
            background-color: #008000;
            width: 1px;
            height: 32px;
          }
          .section-text {
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        ${mode === 'company' ? generateGeneralHtmlContent(t, company, companyData as CompanyData, coolingUnits) : ''}
        ${generateUsersHtmlContent(t, companyData, mode)}
        ${mode === 'company' ? generateUtilizationHtmlContent(t, companyData as CompanyData) : ''}
        ${mode === 'aggregated' ? generateCratesHtmlContent(t, companyData as CoolingUnitImpact) : ''}
        ${generateImpactHtml(t, impactData, currencySymbol, mode, companyData as CoolingUnitImpact)}
      </body>
    </html>
  `;
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

  return `
    <div class="container">
        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.companyNameLabel')}</div>
          <div class="value">${company?.name}</div>
        </div>

        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.revenueLabel')}</div>
          <div class="value">${companyData?.compRevenue?.[0]?.toLocaleString('en-US', {
            style: 'currency',
            currency: companyData?.currency?.[0] ?? 'NGN',
          })}</div>
        </div>

        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.coolingUnitsLabel')}</div>
          <div class="value">${coolingUnitsContent}</div>
        </div>

        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.capacityLabel')}</div>
          <div class="value">${coolingUnitsCapacity}</div>
        </div>

        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.coolingUnitTypeLabel')}</div>
          <div class="value">${t('Dashboard.Analytics.companyTab.coolingUnitTypeMarket', { amount: counters.marketUnits })}</div>
          <div class="value">${t('Dashboard.Analytics.companyTab.coolingUnitTypeFarmGate', { amount: counters.farmGateUnits })}</div>
          <div class="value">${t('Dashboard.Analytics.companyTab.coolingUnitTypeMovable', { amount: counters.movableUnits })}</div>
        </div>
      </div>
  `;
}

///////////////////// USERS CONTENT — MULTIPLE TABS
function generateUsersSection(
  title: string,
  data: { male: string; female: string; other?: string }
) {
  return `
  <div class="section">
    <div class="section-title">
      ${title}
    </div>
    <div class="section-content">
      <div class="section-text">
        ${data.male}
      </div>
      <div class="divider"></div>
      <div class="section-text">
        ${data.female}
      </div>
    </div>
    ${data.other ?? ''}
  </div>`;
}

function generateUsersHtmlContent(
  t: Translator,
  data: CompanyData | CoolingUnitImpact | undefined,
  mode: 'company' | 'aggregated' | 'comparison'
) {
  const femaleBen = getValue(data, 'compBeneficiariesFem', 'roomBeneficiariesFem') ?? 0;
  const maleBen = getValue(data, 'compBeneficiariesMa', 'roomBeneficiariesMa') ?? 0;

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

  return `
    <div class="scroll-view">
      ${
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
          : ''
      }

      ${generateUsersSection(
        t('Dashboard.Analytics.operatorsTotal', { amount: operators.total ?? 0 }),
        {
          male: t('Dashboard.Analytics.maleLabel', { amount: operators.male ?? 0 }),
          female: t('Dashboard.Analytics.femaleLabel', { amount: operators.female ?? 0 }),
          other: t('Dashboard.Analytics.otherLabel', { amount: employees.other }),
        }
      )}

      ${generateUsersSection(t('Dashboard.Analytics.usersTotal', { amount: users.total ?? 0 }), {
        male: t('Dashboard.Analytics.maleLabel', { amount: users.male ?? 0 }),
        female: t('Dashboard.Analytics.femaleLabel', { amount: users.female ?? 0 }),
        other: t('Dashboard.Analytics.otherLabel', { amount: users.other }),
      })}

      ${
        mode === 'company'
          ? generateUsersSection(t('Dashboard.Analytics.companyTab.usersTab.usersType'), {
              male: t('Dashboard.Analytics.companyTab.usersTab.farmersLabel', {
                amount: userTypes.farmer ?? 0,
              }),
              female: t('Dashboard.Analytics.companyTab.usersTab.tradersLabel', {
                amount: userTypes.trader ?? 0,
              }),
            })
          : ''
      }

      ${generateUsersSection(
        t('Dashboard.Analytics.beneficiariesTotal', { amount: beneficiaries.total ?? 0 }),
        {
          male: t('Dashboard.Analytics.maleLabel', { amount: beneficiaries.male }),
          female: t('Dashboard.Analytics.femaleLabel', { amount: beneficiaries.female }),
        }
      )}
    </div>
  `;
}

///////////////////// UTILIZATION CONTENT — COMPANY TAB
function generateUtilizationSectionContent(checkedInText: string, checkedOutText: string) {
  return `
    <div class="section-text">
      ${checkedInText}
    </div>
    <div class="divider"></div>
    <div class="section-text">
      ${checkedOutText}
    </div>
  `;
}

function generateUtilizationHtmlContent(t: Translator, companyData: CompanyData | undefined) {
  return `
    <div class="scroll-view">
      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel')}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', { amount: companyData?.compAverageRoomOccupancy?.[0] || 0 })}
          </div>
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.totalCratesLabel')}:
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: companyData?.compCratesIn?.[0] || 0,
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: companyData?.compCratesOut?.[0] || 0,
            })
          )}
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.totalQuantityLabel')}:
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: companyData?.compKgIn?.[0] || 0,
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: companyData?.compKgOut?.[0] || 0,
            })
          )}
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.totalOperations')}:
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: companyData?.compOpsIn?.[0] || 0,
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: companyData?.compOpsOut?.[0] || 0,
            })
          )}
        </div>
      </div>
    </div>
  `;
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
  const foodLossEvolution = ((foodLossTo - foodLossFrom) / (foodLossFrom || 1)) * 100;

  const revenueFrom =
    getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth) || 0;
  const revenueTo = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue) || 0;
  const revenueEvolution = ((revenueTo - revenueFrom) / (revenueFrom || 1)) * 100;

  const co2From = getMetricValue(impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From) || 0;
  const co2To = getMetricValue(impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To) || 0;
  const co2Evolution = co2To - co2From;

  const surveyPercentage =
    (getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys) /
      getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)) *
    100;

  const occupancy = coolingUnitData?.averageRoomOccupancy?.[0] || 0;
  const revenue = coolingUnitData?.roomRevenue?.[0] || 0;

  return `
    <div class="scroll-view" style="width: 100%; padding: 16px; text-align: center;">
      ${
        type === 'aggregated'
          ? `
        <div class="section section3">
          <div class="section-title">
            ${t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel')}
          </div>
          <div class="section-content">
            <div class="section-text">
              ${t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', { amount: occupancy })}
            </div>
          </div>
        </div>
      `
          : ''
      }

      <div class="section section3" style="margin-bottom: 16px;">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.foodLossLabel')}
        </div>
        <div style="margin-top: 8px; margin-bottom: 8px;">
          ${
            foodLossTo === foodLossFrom
              ? `<span style="color: gray;">${foodLossEvolution.toFixed(2)}% =</span>`
              : foodLossTo > foodLossFrom
                ? `<span style="color: red;">${foodLossEvolution.toFixed(2)}% ↑</span>`
                : `<span style="color: green;">${foodLossEvolution.toFixed(2)}% ↓</span>`
          }
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.from')} <strong>${foodLossFrom.toFixed(2)}</strong>%
            </div>
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.to')} <strong>${foodLossTo.toFixed(2)}</strong>%
            </div>
          </div>
        </div>
      </div>

      <div class="section section3" style="margin-bottom: 16px;">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.revenueLabel')}
        </div>
        <div style="margin-top: 8px; margin-bottom: 8px;">
          ${
            revenueTo === revenueFrom
              ? `<span style="color: gray;">${revenueEvolution.toFixed(2)}% =</span>`
              : revenueTo < revenueFrom
                ? `<span style="color: red;">${revenueEvolution.toFixed(2)}% ↓</span>`
                : `<span style="color: green;">${revenueEvolution.toFixed(2)}% ↑</span>`
          }
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.from')} <strong>${currencySymbol}${revenueFrom.toFixed(2)}</strong>
            </div>
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.to')} <strong>${currencySymbol}${revenueTo.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

       ${
         type === 'aggregated'
           ? `
            <div class="section section3">
              <div class="section-title">
                ${t('Dashboard.Analytics.tabsShared.roomRevenue')}
              </div>
              <div class="section-content">
                <div class="section-text">
                  ${revenue}
                </div>
              </div>
            </div>
          `
           : ''
       }
      
      <div class="section section3" style="margin-bottom: 16px;">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.co2Label')}
        </div>
        <div style="margin-top: 8px; margin-bottom: 8px;">
          ${
            co2To === co2From
              ? `<span style="color: gray;">${co2Evolution.toFixed(2)} Kg =</span>`
              : co2To < co2From
                ? `<span style="color: green;">${co2Evolution.toFixed(2)} Kg ↓</span>`
                : `<span style="color: red;">${co2Evolution.toFixed(2)} Kg ↑</span>`
          }
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.from')} <strong>${co2From.toFixed(2)}</strong> ${t('Dashboard.Analytics.companyTab.impactTab.co2WithoutCooling')}
            </div>
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.to')} <strong>${co2To.toFixed(2)}</strong> ${t('Dashboard.Analytics.companyTab.impactTab.co2WithCooling')}
            </div>
          </div>
        </div>
      </div>

      <div class="section section3" style="margin-bottom: 16px; background-color: #EDE9FE; padding: 16px; border-radius: 8px;">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.surveysAmountLabel')}
        </div>
        <div class="section-content">
          <div class="section-text">
            <div style="display: flex; justify-content: center; align-items: baseline;">
              <strong style="font-size: 24px;">${getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys)}</strong>
              <span style="font-size: 16px; margin-left: 4px;">/${getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)}</span>
            </div>
            <div style="font-size: 36px; color: #9B5DE5; margin-top: 8px;">
              (${Number.isNaN(surveyPercentage) ? 0 : surveyPercentage.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

///////////////////// CRATES CONTENT — AGGREGATED TAB
function generateCratesHtmlContent(
  t: Translator,
  data: CompanyData | CoolingUnitImpact | undefined
) {
  return `
    <div class="scroll-view">
      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.totalCratesLabel')}:
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: getValue(data, 'compCratesIn', 'checkInCratesCrop'),
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: getValue(data, 'compCratesOut', 'checkOutCratesCrop'),
            })
          )}
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.totalQuantityLabel')}:
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: getValue(data, 'compKgIn', 'checkInKgCrop'),
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: getValue(data, 'compKgOut', 'checkOutKgCrop'),
            })
          )}
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.totalOperations')}:
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.checkedInLabel', {
              amount: getValue(data, 'compOpsIn', 'roomCratesIn'),
            }),
            t('Dashboard.Analytics.checkedOutLabel', {
              amount: getValue(data, 'compOpsOut', 'roomCratesOut'),
            })
          )}
        </div>
      </div>

      <div class="section section2">
       <div class="section-title">
          ${t('Dashboard.Analytics.tabsShared.totalCo2Label')}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${data && 'totCo2' in data ? data.totCo2['0'] : 0}
          </div>
        </div>
      </div>
    </div>
  `;
}
