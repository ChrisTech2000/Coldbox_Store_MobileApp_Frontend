import type { MapState } from '@rnmapbox/maps';
import type { BBox, GeoJsonProperties } from 'geojson';
import moize from 'moize';
import ms from 'ms';
import { useMemo } from 'react';
import type { PointFeature } from 'supercluster';
import useSupercluster from 'use-supercluster';

import type { Translator } from '#i18n/utils';
import { parsePoint } from '#screens/Dashboard/Management/utils';
import type {
  GetAllCropsResponse,
  GetCoolingUnitResponse,
  GetLocationResponse,
} from '#types/api.responses';

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
    const point = parsePoint(location.point);

    if (point.latitude === null || point.longitude === null) continue;
    const title = `${location.company.name}: ${location.name}`;

    const unitsScopedToLocation = coolingUnits.filter((unit) => unit.location === location.id);

    markersMap.set(location.id, {
      title,
      latitude: point.latitude,
      longitude: point.longitude,
      hasBeenUsedByFarmer: farmerLocationsIds.has(location.id),
      coolingUnitsInfo: [],
    });

    for (const unit of unitsScopedToLocation) {
      const remainingCapacity = Math.ceil(
        unit.capacityInNumberCrates - unit.capacityInNumberCrates * unit.occupancy
      );
      const priceMetric = t([
        'Dashboard.Management.AddCoolingUnit.metricUnit',
        unit.commonPricingType?.metric,
      ]);
      const priceType = t([
        'Dashboard.Management.AddCoolingUnit.pricing',
        unit.commonPricingType?.type,
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
        price: `${unit.commonPricingType?.value} ${location.company.currency} / ${priceMetric} / ${priceType}`,
      });
      markersMap.set(location.id, marker);
    }
  }

  return Array.from(markersMap.values());
}

const _getSingleCommodityCropName = moize(
  (crops: Array<GetAllCropsResponse>, cropId?: number) =>
    crops.find(({ id }) => id === cropId)?.name ?? '',
  {
    maxAge: ms('7 seconds'),
    // isSerialized: true,
    // serializer: ([crops, cropId]) => [stringToHash([cropId, JSON.stringify(crops)].join(':::'))],
  }
);

type PointProperties = {
  cluster: boolean;
  category: 'markers';
  indexPos: number;
};

export function useMapCluster(
  markers: Array<MarkerDatum>,
  mapDatums: { bounds: MapState['properties']['bounds']; zoom: MapState['properties']['zoom'] }
) {
  const { bounds, zoom } = mapDatums;

  const { clusters } = useSupercluster({
    points: useMemo<Array<PointFeature<GeoJsonProperties & PointProperties>>>(
      () =>
        markers.map((marker, markerIdx) => ({
          type: 'Feature',
          properties: {
            cluster: false,
            category: 'markers',
            indexPos: markerIdx,
          },
          geometry: {
            type: 'Point',
            coordinates: [marker.longitude, marker.latitude],
          },
        })),
      [markers]
    ),
    bounds: [bounds.sw, bounds.ne].flat() as BBox,
    zoom: zoom,
    options: { radius: 20, maxZoom: 25 },
  });

  return clusters;
}
