import { currencies } from 'currencies.json';

import { Translator } from '#i18n/utils';
import {
  type CompanyData,
  type CoolingUnit,
  type ImpactData,
  ECoolingUnitType,
} from '#types/global';
import { ManagementCompany } from '#stores/management';

// TODO: cleanup this function in the future; leaving it with some code repetition due to time constraints
export function generatePDFContent(
  t: Translator,
  coolingUnits: Array<CoolingUnit> | undefined,
  company: ManagementCompany | undefined,
  companyData: CompanyData | undefined,
  impactData: ImpactData | undefined
) {
  const currencySymbol = currencies.find((c) => c.code === company?.currency)?.symbol ?? '';
  const coolingUnitsContent =
    coolingUnits?.length && coolingUnits.length > 1
      ? t(`Dashboard.Analytics.companyTab.coolingUnitsContent`, { amount: coolingUnits.length })
      : t(`Dashboard.Analytics.companyTab.singleCoolingUnitContent`);

  const coolingUnitsCapacity = coolingUnits?.reduce(
    (acc, unit) => (acc += unit.capacityInMetricTons),
    0
  );

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

  const employees = {
    total: companyData?.compRegUsers?.[0],
    female: companyData?.compRegUsersFem?.[0],
    male: companyData?.compRegUsersMa?.[0],
    other: companyData?.compRegUsersOt?.[0],
  };

  const operators = {
    total: companyData?.compOp?.[0],
    female: companyData?.compOpFem?.[0],
    male: companyData?.compOpMa?.[0],
    other: companyData?.compOpOt?.[0],
  };

  const users = {
    total: companyData?.compCoolUsers?.[0],
    female: companyData?.compCoolUsersFem?.[0],
    male: companyData?.compCoolUsersMa?.[0],
    other: companyData?.compCoolUsersOt?.[0],
  };

  const userTypes = {
    farmer: companyData?.compFarmers?.[0],
    trader: companyData?.compTraders?.[0],
  };

  const beneficiaries = {
    total: companyData?.compBeneficiaries?.[0],
    female: Math.round(companyData?.compBeneficiariesFem?.[0] || 0),
    male: Math.round(companyData?.compBeneficiariesMa?.[0] || 0),
  };

  const foodLoss = {
    from: impactData?.impactMetrics?.avgMonthlyPercLoss || 0,
    to: impactData?.impactMetrics?.avgMonthlyPercFoodlossEvolution || 0,
  };

  const revenue = {
    from: `${currencySymbol}${(impactData?.impactMetrics?.avgMonthlyPercRevenueIncreaseEvolution || 0).toFixed(2)}`,
    to: `${currencySymbol}${(impactData?.impactMetrics?.avgMonthlyPercRevenueIncreaseEvolution2 || 0).toFixed(2)}`,
  };

  const co2 = {
    from: (impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From || 0).toFixed(2),
    to: (impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To || 0).toFixed(2),
  };

  const generalHtmlContent = `
    <div class="container">
        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.companyNameLabel')}</div>
          <div class="value">${company?.name}</div>
        </div>

        <div class="card">
          <div class="label">${t('Dashboard.Analytics.companyTab.revenueLabel')}</div>
          <div class="value">${currencySymbol}${(companyData?.compRevenue?.[0] ?? 0).toFixed(2)}</div>
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

  const usersHtmlContent = `
    <div class="scroll-view">
      <div class="section">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.usersTab.employeesTotal', { amount: employees.total ?? 0 })}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.maleLabel', { amount: employees.male ?? 0 })}
          </div>
          <div class="divider"></div>
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', { amount: employees.female ?? 0 })}
          </div>
        </div>
        ${employees.other ?? 0}
      </div>

      <div class="section">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.usersTab.operatorsTotal', { amount: operators.total ?? 0 })}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.maleLabel', { amount: operators.male ?? 0 })}
          </div>
          <div class="divider"></div>
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', { amount: operators.female ?? 0 })}
          </div>
        </div>
        ${operators.other ?? 0}
      </div>

      <div class="section">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.usersTab.usersTotal', { amount: users.total ?? 0 })}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.maleLabel', { amount: users.male ?? 0 })}
          </div>
          <div class="divider"></div>
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', { amount: users.female ?? 0 })}
          </div>
        </div>
        ${users.other ?? 0}
      </div>

      <div class="section">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.usersTab.usersType')}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.farmersLabel', { amount: userTypes.farmer ?? 0 })}
          </div>
          <div class="divider"></div>
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.tradersLabel', { amount: userTypes.trader ?? 0 })}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.usersTab.beneficiariesTotal', { amount: beneficiaries.total ?? 0 })}
        </div>
        <div class="section-content">
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.maleLabel', { amount: beneficiaries.male })}
          </div>
          <div class="divider"></div>
          <div class="section-text">
            ${t('Dashboard.Analytics.companyTab.usersTab.femaleLabel', { amount: beneficiaries.female })}
          </div>
        </div>
      </div>
    </div>
  `;

  const utilizationHtmlContent = `
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
          ${t('Dashboard.Analytics.companyTab.utilizationTab.totalCratesLabel')}
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.companyTab.utilizationTab.checkedInLabel', {
              amount: companyData?.compCratesIn?.[0] || 0,
            }),
            t('Dashboard.Analytics.companyTab.utilizationTab.checkedOutLabel', {
              amount: companyData?.compCratesOut?.[0] || 0,
            })
          )}
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.utilizationTab.totalQuantityLabel')}
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.companyTab.utilizationTab.checkedInLabel', {
              amount: companyData?.compKgIn?.[0] || 0,
            }),
            t('Dashboard.Analytics.companyTab.utilizationTab.checkedOutLabel', {
              amount: companyData?.compKgOut?.[0] || 0,
            })
          )}
        </div>
      </div>

      <div class="section section2">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.utilizationTab.totalOperations')}
        </div>
        <div class="section-content">
          ${generateUtilizationSectionContent(
            t('Dashboard.Analytics.companyTab.utilizationTab.checkedInLabel', {
              amount: companyData?.compOpsIn?.[0] || 0,
            }),
            t('Dashboard.Analytics.companyTab.utilizationTab.checkedOutLabel', {
              amount: companyData?.compOpsOut?.[0] || 0,
            })
          )}
        </div>
      </div>
    </div>
  `;

  const impactHtmlContent = `
    <div class="scroll-view">
      <div class="section section3">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.foodLossLabel')}
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.from')} ${foodLoss.from}%
            </div>
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.to')} ${foodLoss.to}%
            </div>
          </div>
        </div>
      </div>

      <div class="section section3">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.revenueLabel')}
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.from')} ${revenue.from}
            </div>
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.to')} ${revenue.to}
            </div>
          </div>
        </div>
      </div>

      <div class="section section3">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.co2Label')}
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.from')} ${co2.from} ${t('Dashboard.Analytics.companyTab.impactTab.co2WithoutCooling')}
            </div>
            <div>
              ${t('Dashboard.Analytics.companyTab.impactTab.to')} ${co2.to} ${t('Dashboard.Analytics.companyTab.impactTab.co2WithCooling')}
            </div>
          </div>
        </div>
      </div>

      <div class="section section3">
        <div class="section-title">
          ${t('Dashboard.Analytics.companyTab.impactTab.surveysAmountLabel')}
        </div>
        <div class="section-content">
          <div class="section-text">
            <div>
              ${impactData?.impactMetrics.numPostHarvestSurveys} / ${impactData?.impactMetrics.possiblePostCheckoutSurveyRoom}
            </div>
            <div>
              (${(
                ((impactData?.impactMetrics?.numPostHarvestSurveys || 0) /
                  (impactData?.impactMetrics?.possiblePostCheckoutSurveyRoom || 1)) *
                100
              ).toFixed(0)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

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
        ${generalHtmlContent}
        ${usersHtmlContent}
        ${utilizationHtmlContent}
        ${impactHtmlContent}
      </body>
    </html>
  `;
}

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
