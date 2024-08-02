import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { PredictionCrop, PredictionState } from '#types/global';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { ScrollView } from 'react-native-gesture-handler';
import { TrendChart } from './components/TrendChart';
import { AllowedCountry, usePriceTrendsStore } from './store';

const useCommodityStore = createSelectStore<PredictionCrop>();
const useStateStore = createSelectStore<PredictionState>();

function MarketPriceTrend() {
  const { t } = useTranslationUtils();
  const { country, loadingFarmer, setPredictionParams } = usePriceTrendsStore();
  const { selectedItem: commodity } = useCommodityStore();
  const { selectedItem: state } = useStateStore();

  const [isCommoditiesModalOpen, setIsCommoditiesModalOpen] = useState<boolean>(false);
  const [isStatesModalOpen, setIsStatesModalOpen] = useState<boolean>(false);

  const { data: predictionParams, isLoading: loadingPredictionParams } = useApiCall(
    'getPredictionParams',
    ColdtivateService.getPredictionParams,
    country as AllowedCountry,
    {
      skip: !country,
    }
  );

  useEffect(() => {
    if (predictionParams) {
      setPredictionParams(predictionParams);
    }
  }, [predictionParams]);

  if (loadingPredictionParams || loadingFarmer) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!country) {
    return (
      <View tw="flex-1 items-center justify-center mx-10">
        <Text variant="TitleMedium" tw="text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return (
    <View tw="absolute bottom-0 top-0 pb-1">
      <ScrollView tw="h-full m-4 space-y-2" showsVerticalScrollIndicator={false}>
        <Text variant="TextBold" tw="text-lg font-bold mb-4">
          {t('Dashboard.MarketPrice.Trend.title')}
        </Text>

        <SelectWithStore<PredictionCrop>
          datums={predictionParams.availableCrops ?? []}
          isModalVisible={isCommoditiesModalOpen}
          setIsModalVisible={setIsCommoditiesModalOpen}
          itemName={(item) => item?.name}
          useSelectStore={useCommodityStore}
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
          useSelectStore={useStateStore}
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

export default withSafeArea(MarketPriceTrend);
