import type {
  GetAllCropsResponse,
  GetCoolingUnitResponse,
  GetLocationResponse,
} from '#types/api.responses';
import type { Translator } from '#i18n/utils';

export type MarkerCoolingUnitsInfo = {
  name: string;
  commodity: string;
  remainingCapacity: number;
  price: string;
};

export type MarkerDatum = {
  title: string;
  latitude: number;
  longitude: number;
  hasBeenUsedByFarmer: boolean;
  coolingUnitsInfo: Array<MarkerCoolingUnitsInfo>;
};

export function processLocationMarkers(args: {
  crops: Array<GetAllCropsResponse>;
  locations: Array<GetLocationResponse>;
  coolingUnits: Array<GetCoolingUnitResponse>;
  farmerUnitsIds: Array<number>;
  t: Translator;
}): Array<MarkerDatum> {
  const { crops, locations, coolingUnits, farmerUnitsIds, t } = args;

  const farmerLocationsIds = new Set<number>([]);
  for (const unit of coolingUnits) {
    if (!farmerUnitsIds.includes(unit.id) || farmerLocationsIds.has(unit.location)) continue;
    farmerLocationsIds.add(unit.location);
  }

  const markersMap = new Map<number, MarkerDatum>();

  for (const location of locations) {
    if (location.latitude === null || location.longitude === null) continue;
    const title = `${location.company.name}: ${location.name}`;

    const unitsScopedToLocation = coolingUnits.filter((unit) => unit.location === location.id);

    markersMap.set(location.id, {
      title,
      latitude: location.latitude,
      longitude: location.longitude,
      hasBeenUsedByFarmer: farmerLocationsIds.has(location.id),
      coolingUnitsInfo: [],
    });

    for (const unit of unitsScopedToLocation) {
      const remainingCapacity = Math.ceil(
        unit.capacityInNumberCrates - unit.capacityInNumberCrates * unit.occupancy
      );
      const priceMetric = t([
        'Dashboard.Management.AddCoolingUnit.metricUnit',
        unit.commonPricingType.metric,
      ]);
      const priceType = t([
        'Dashboard.Management.AddCoolingUnit.pricing',
        unit.commonPricingType.type,
      ]);

      const commodity =
        unit.crops.length === 1
          ? t('Dashboard.CoolingUnitsMaps.singleCommodity', {
              crop: _getSingleCommodityCropName(crops, unit.crops.at(0)?.id),
            })
          : t('Dashboard.CoolingUnitsMaps.multiCommodity');

      const marker = markersMap.get(location.id)!; // :shrug:
      marker.coolingUnitsInfo.push({
        name: unit.name,
        commodity,
        remainingCapacity: remainingCapacity < 0 ? 0 : remainingCapacity,
        price: `${unit.commonPricingType.value} ${location.company.currency} / ${priceMetric} / ${priceType}`,
      });
      markersMap.set(location.id, marker);
    }
  }

  return Array.from(markersMap.values());
}

function _getSingleCommodityCropName(
  crops: Array<GetAllCropsResponse> = [],
  cropId: number | undefined = undefined
): string | undefined {
  return crops.find((crop) => crop.id === cropId)?.name ?? '';
}
