import { EPricingType, type DashboardProduce } from '#types/global';
import { Translator } from '#i18n/utils';

export function generateData(produce: DashboardProduce, t: Translator) {
  const price = produce.cratesCombinedCost || 0;

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
      value: produce.plannedDays,
    },
    produce.checkedInCrates[0].pricing[0].pricingType === EPricingType.PERIODICITY
      ? {
          id: 'pricePerDay',
          label: t('Dashboard.ProduceDetails.pricePerDay'),
          value: produce.checkedInCrates[0].pricing[0].dailyRate,
        }
      : {},
    {
      id: 'price',
      label: t('Dashboard.ProduceDetails.plannedStorageCost'),
      value: price,
    },
  ];
}
