import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import GetLocation, { type Location } from 'react-native-get-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useShallow } from 'zustand/react/shallow';
import ms from 'ms';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { paperTheme } from '#ui/lib/theme';

import { processLocationMarkers } from './utils';

const SWR_CACHE_KEY = 'getCoolingUnitsLocationMarkers';

function CoolingUnitsMaps() {
  const [coordinates, setCoordinates] = useState<Location | undefined>(undefined);
  const { t } = useTranslationUtils();

  const [farmerId, farmerCoolingUnits] = useDashboardStore(
    useShallow((store) => [store.farmerId, store.coolingUnits])
  );

  const { data: crops, isLoading } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      skip: !farmerId,
      defaultData: [],
    }
  );

  const { data: markers } = useApiCall(
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

  useFocusEffect(
    useCallback(() => {
      async function getCoordinates() {
        const result = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: ms('6 seconds'),
        });
        setCoordinates(result);
      }

      try {
        void getCoordinates();
      } catch (exception) {
        console.error(exception);
      }
    }, [])
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1">
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        initialRegion={{
          latitude: coordinates?.latitude ?? 0,
          longitude: coordinates?.longitude ?? 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        rotateEnabled={false}
        zoomEnabled={true}
        showsUserLocation
      >
        {markers.map((marker, markerIdx) => (
          <Marker
            key={`location-marker-#${markerIdx}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            pinColor={marker.isFarmerVisitingLocation ? '#0000F0' : '#FB7D00'}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('screen').height / 1.618,
    width: '100%',
  },
});

export default withSafeArea(CoolingUnitsMaps);
