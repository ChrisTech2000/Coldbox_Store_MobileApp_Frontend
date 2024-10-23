import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Divider } from 'react-native-paper';

import { GenericError } from '#ui/components/GenericError';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { MarketPriceOverlay } from '#screens/Dashboard/Tutorial/MarketPriceOverlay';
import { EFarmerTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { PredictionCrop, PredictionState } from '#types/global';

import { TrendChart } from './components/TrendChart';
import { AllowedCountry, usePriceTrendsStore } from './store';

export const useTrendCommodityStore = createSelectStore<PredictionCrop>();
export const useTrendStateStore = createSelectStore<PredictionState>();

export type QueryCountry = 'IN' | 'NG';

export const MAP_ALLOWED_COUNTRY: Record<AllowedCountry, QueryCountry> = {
  IN: 'IN',
  NG: 'NG',
  India: 'IN',
  Nigeria: 'NG',
};

function MarketPriceTrend() {
  const { t } = useTranslationUtils();
  const { country, loadingFarmer, setPredictionParams } = usePriceTrendsStore();
  const { selectedItem: commodity } = useTrendCommodityStore();
  const { selectedItem: state } = useTrendStateStore();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const [isCommoditiesModalOpen, setIsCommoditiesModalOpen] = useState<boolean>(false);
  const [isStatesModalOpen, setIsStatesModalOpen] = useState<boolean>(false);

  const { data: predictionParams, isLoading: loadingPredictionParams } = useApiCall(
    'getPredictionParams',
    ColdtivateService.getPredictionParams,
    MAP_ALLOWED_COUNTRY[country ?? ('' as AllowedCountry)] as QueryCountry,
    {
      skip: !country,
    }
  );

  useEffect(() => {
    if (predictionParams) {
      setPredictionParams(predictionParams);
    }
  }, [predictionParams]);

  const { onLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.MARKET_PRICE,
    enableHardwareBack: true,
    OverlayComponent: MarketPriceOverlay,
    onPressMask: () => rootNavigation.navigate('Dashboard'),
  });

  if (loadingPredictionParams || loadingFarmer) {
    return (
      <View tw="flex-1 items-center justify-center" onLayout={onLayout}>
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!country) {
    return (
      <View tw="flex-1 items-center justify-center mx-10" onLayout={onLayout}>
        <Text variant="TitleMedium" tw="text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return (
    <View tw="absolute bottom-0 top-0 pb-1" onLayout={onLayout}>
      <ScrollView tw="h-full m-4 space-y-2" showsVerticalScrollIndicator={false}>
        <Text variant="TextBold" tw="text-lg font-bold mb-4">
          {t('Dashboard.MarketPrice.Trend.title')}
        </Text>

        <SelectWithStore<PredictionCrop>
          datums={predictionParams.availableCrops ?? []}
          isModalVisible={isCommoditiesModalOpen}
          setIsModalVisible={setIsCommoditiesModalOpen}
          itemName={(item) => item?.name}
          useSelectStore={useTrendCommodityStore}
          label={commodity ? commodity.name : t('Dashboard.MarketPrice.commodityLabel')}
          modalHeader={t('Dashboard.MarketPrice.commodityModalTitle')}
          occupyFullWidth
        />
        <Divider tw="w-full bg-gray-500 mb-4" />
        <SelectWithStore<PredictionState>
          datums={predictionParams.availableStates ?? []}
          isModalVisible={isStatesModalOpen}
          setIsModalVisible={setIsStatesModalOpen}
          itemName={(item) => item?.name}
          useSelectStore={useTrendStateStore}
          label={state ? state.name : t('Dashboard.MarketPrice.Trend.stateLabel')}
          modalHeader={t('Dashboard.MarketPrice.Trend.stateModalTitle')}
          occupyFullWidth
        />
        <Divider tw="w-full bg-gray-500" />

        {commodity && state && <TrendChart commodity={commodity} state={state} country={country} />}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(MarketPriceTrend, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
