import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { paperTheme } from '#ui/lib/theme';

import { processLocationMarkers } from './utils';

const SWR_CACHE_KEY = 'getCoolingUnitsLocationMarkers';

function CoolingUnitsMaps() {
  const { t } = useTranslationUtils();

  const [farmerId, farmerCoolingUnits] = useDashboardStore(
    useShallow((store) => [store.farmerId, store.coolingUnits])
  );

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    skip: !farmerId,
    defaultData: [],
  });

  const { isLoading } = useApiCall(
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

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1">
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

export default withSafeArea(CoolingUnitsMaps);
