import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GetLocation from 'react-native-get-location';
import { useShallow } from 'zustand/react/shallow';
import ms from 'ms';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { paperTheme } from '#ui/lib/theme';

import { processLocationMarkers } from './utils';
import * as Map from './components/Map';

const SWR_CACHE_KEY = 'getCoolingUnitsLocationMarkers';

function CoolingUnitsMaps() {
  const [coords, setCoords] = useState<[number, number] | undefined>(undefined);
  const { t } = useTranslationUtils();

  const [farmerId, farmerCoolingUnits] = useDashboardStore(
    useShallow((store) => [store.farmerId, store.coolingUnits])
  );

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    skip: !farmerId,
    defaultData: [],
  });

  const { data: markers, isLoading } = useApiCall(
    SWR_CACHE_KEY,
    async () => {
      const [locations, coolingUnits] = await Promise.allSettled([
        ColdtivateService.getPublicAndVisitedLocations(farmerId!),
        ColdtivateService.getPublicAndVisitedCoolingUnits(farmerId!),
      ]);
      return processLocationMarkers({
        crops,
        locations: locations.status === 'fulfilled' ? locations.value : [],
        coolingUnits: coolingUnits.status === 'fulfilled' ? coolingUnits.value : [],
        farmerUnitsIds: farmerCoolingUnits?.map((unit) => unit.id) ?? [],
        t,
      });
    },
    undefined,
    {
      skip: !farmerId || crops.length === 0,
      defaultData: [],
    }
  );

  useEffect(() => {
    async function _getCoordinates() {
      try {
        const result = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: ms('6 seconds'),
        });
        setCoords([result.longitude, result.latitude]);
      } catch (exception) {
        console.error(exception);
      }
    }
    void _getCoordinates();
  }, []);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (typeof coords === 'undefined') return null;

  return (
    <View tw="flex-1">
      <Map.Root coords={coords} style={styles.map}>
        <Map.Markers markers={markers} />
      </Map.Root>

      <View tw="space-y-3 p-3">
        <View tw="flex-row items-center space-x-3">
          <Icon name="map-marker" size={20} color="#FB7D00" />
          <Text>{t('Dashboard.CoolingUnitsMaps.publicMaker')}</Text>
        </View>
        <View tw="flex-row items-center space-x-3">
          <Icon name="map-marker" size={20} color="#0000F0" />
          <Text>{t('Dashboard.CoolingUnitsMaps.usedMarker')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: Dimensions.get('screen').height / 1.618,
  },
});

export default withSafeArea(CoolingUnitsMaps);
