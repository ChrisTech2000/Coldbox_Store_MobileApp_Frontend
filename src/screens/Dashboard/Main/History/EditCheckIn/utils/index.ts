import { ECoolingUnitMetric, EPricingType, type DashboardProduce } from '#types/global';
import { Translator } from '#i18n/utils';

export function generateData(produce: DashboardProduce, t: Translator) {
  const dailyPrice = produce.checkedInCrates.reduce((sum, crate) => {
    const dailyRate = crate.calculatedDailyRate || crate.pricing[0]?.dailyRate || 0;
    const metricMultiplier =
      crate.coolingUnitMetric === ECoolingUnitMetric.KILOGRAMS ? crate.weight : 1;
    return sum + dailyRate * metricMultiplier;
  }, 0);

  const pricingType =
    produce.checkedInCrates[0]?.effectivePricingType ||
    produce.checkedInCrates[0]?.pricing[0]?.pricingType;
  const plannedStorageCost = !produce.plannedDays
    ? null
    : pricingType === EPricingType.FIXED
      ? produce.cratesCombinedCost
      : dailyPrice * produce.plannedDays;

  return [
    {
      id: 'cropType',
      label: t('Dashboard.ProduceDetails.cropType'),
      value: produce.cropName,
    },
    {
      id: 'crates',
      label: t('Dashboard.ProduceDetails.numberOfCrates'),
      value: produce.checkedInCrates.length,
    },
    {
      id: 'crateIds',
      label: t('Dashboard.ProduceDetails.crateIds'),
      value: produce.checkedInCrates.map((crate) => crate.tag).join(', '),
    },
    {
      id: 'weight',
      label: t('Dashboard.ProduceDetails.combinedWeight'),
      value: produce.cratesCombinedWeight,
    },
    {
      id: 'remainingTime',
      label: t('Dashboard.ProduceDetails.remainingTime'),
      value: produce.minimumRemainingShelfLife,
    },
    {
      id: 'currentStorageDays',
      label: t('Dashboard.ProduceDetails.currentStorageDays'),
      value: produce.currentStorageDays,
    },
    {
      id: 'plannedDays',
      label: t('Dashboard.ProduceDetails.plannedDays'),
      value: produce.plannedDays || '-',
    },
    produce.checkedInCrates[0].pricing[0].pricingType === EPricingType.PERIODICITY
      ? {
          id: 'pricePerDay',
          label: t('Dashboard.ProduceDetails.pricePerDay'),
          value: dailyPrice,
        }
      : {},
    {
      id: 'price',
      label: t('Dashboard.ProduceDetails.plannedStorageCost'),
      value: plannedStorageCost !== null ? plannedStorageCost : '-',
    },
  ];
}
