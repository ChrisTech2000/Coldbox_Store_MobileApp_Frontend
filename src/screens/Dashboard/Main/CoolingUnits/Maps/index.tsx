import ms from 'ms';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';

import * as Map from './components/Map';
import PointAnnotationModal from './components/PointAnnotationModal';
import { PIN_COLORS } from './constants';
import { processLocationMarkers } from './utils';

const SWR_CACHE_KEY = 'getCoolingUnitsLocationMarkers';
const screenHeight = Dimensions.get('window').height;

function CoolingUnitsMaps() {
  const [isLoadingCoords, setLoadingCoords] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<[number, number] | undefined>(undefined);
  const { t } = useTranslationUtils();

  const [farmerId, farmerCoolingUnits] = useDashboardStore(
    useShallow((store) => [store.farmerId, store.coolingUnits])
  );

  const { data: crops, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      skip: !farmerId,
      defaultData: [],
    }
  );

  const { data: markers, isLoading: isLoadingMarkers } = useApiCall(
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
      skip: !farmerId || isLoadingCrops,
      defaultData: [],
    }
  );

  useEffect(() => {
    async function _getCoordinates() {
      try {
        if (!isLoadingCoords) setLoadingCoords(true);
        const result = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: ms('6 seconds'),
        });
        setCoordinates([result.longitude, result.latitude]);
      } catch (exception) {
        console.error(exception);
      } finally {
        setLoadingCoords(false);
      }
    }
    void _getCoordinates();
  }, []);

  if (typeof farmerId === 'number' && (isLoadingMarkers || isLoadingCoords)) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (typeof coordinates === 'undefined') return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Map.Root coordinates={coordinates} style={{ width: '100%', height: screenHeight * 0.55 }}>
        <Map.Markers
          markers={markers}
          onSelect={(markerIdx) => {
            emitter.emit(APP_EVENTS.DISPATCH_MAPS_TAB_MODAL, true, markerIdx);
          }}
        />
      </Map.Root>

      <PointAnnotationModal markers={markers} />

      <View tw="space-y-3 p-3 mb-6">
        <View tw="flex-row items-center space-x-3">
          <Icon name="map-marker" size={20} color={PIN_COLORS.PUBLIC} />
          <Text>{t('Dashboard.CoolingUnitsMaps.publicMaker')}</Text>
        </View>
        <View tw="flex-row items-center space-x-3">
          <Icon name="map-marker" size={20} color={PIN_COLORS.USED} />
          <Text>{t('Dashboard.CoolingUnitsMaps.usedMarker')}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(
  withErrorBoundary(CoolingUnitsMaps, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
