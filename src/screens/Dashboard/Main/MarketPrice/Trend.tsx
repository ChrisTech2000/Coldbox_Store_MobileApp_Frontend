import React, { useState } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Divider } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';
import { GenericError } from '#ui/components/GenericError';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { MarketPriceOverlay } from '#screens/Dashboard/Tutorial/MarketPriceOverlay';
import { EFarmerTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { PredictionCrop, PredictionMarket, PredictionState } from '#types/global';
import { cn } from '#ui/lib/cn';

import { TrendChart } from './components/TrendChart';
import { usePriceTrendsStore } from './store';
import PredictionMarketSelect, {
  CountryBasedContentSwitch,
  useContextualCountryISO,
} from './components/PredictionMarketSelect';

export const useTrendCommodityStore = createSelectStore<PredictionCrop>();
export const useTrendStateStore = createSelectStore<PredictionState>();

export type QueryCountry = 'IN' | 'NG';

function MarketPriceTrend() {
  const { t } = useTranslationUtils();
  const { country: allowedCountry, loadingFarmer, setPredictionParams } = usePriceTrendsStore();
  const { selectedItem: commodity } = useTrendCommodityStore();
  const { selectedItem: state } = useTrendStateStore();

  const [isCommoditiesModalOpen, setIsCommoditiesModalOpen] = useState<boolean>(false);
  const [isStatesModalOpen, setIsStatesModalOpen] = useState<boolean>(false);
  const [selectedMarket, setSelectedMarket] = useState<PredictionMarket | null>(null);

  const { data: predictionParams, isLoading: loadingPredictionParams } = useApiCall(
    'getPredictionParams',
    async (param: QueryCountry) => {
      const predictionParams = await ColdtivateService.getPredictionParams(param);
      setPredictionParams(predictionParams);
      return predictionParams;
    },
    allowedCountry as QueryCountry,
    { skip: !allowedCountry }
  );

  useWalkthroughStep({
    number: EFarmerTutorialSteps.MARKET_PRICE,
    OverlayComponent: MarketPriceOverlay,
    fullScreen: true,
  });

  const isInvalidSelection = _useIsInvalidSelection({ commodity, state, market: selectedMarket });

  if (loadingPredictionParams || loadingFarmer) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const isRTL = LanguageManager.isRTL;

  if (!allowedCountry) {
    return (
      <View
        tw={cn('flex-1 items-start mt-8 mx-4', !isRTL && 'items-center justify-center mx-10 mt-3')}
      >
        <Text variant="TitleMedium" tw="text-base text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return (
    <View tw="flex-1">
      <ScrollView
        tw="mx-2 my-2 space-y-2"
        contentContainerStyle="mb-20"
        showsVerticalScrollIndicator={false}
      >
        <Text variant="TextBold" tw="text-base font-bold mb-3 px-1">
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
        <Divider tw="w-full bg-gray-500 mb-3" />

        <CountryBasedContentSwitch
          standard={
            <React.Fragment>
              <SelectWithStore<PredictionState>
                datums={
                  'availableStates' in predictionParams ? predictionParams.availableStates : []
                }
                isModalVisible={isStatesModalOpen}
                setIsModalVisible={setIsStatesModalOpen}
                itemName={(item) => item?.name}
                useSelectStore={useTrendStateStore}
                label={state ? state.name : t('Dashboard.MarketPrice.Trend.stateLabel')}
                modalHeader={t('Dashboard.MarketPrice.Trend.stateModalTitle')}
                occupyFullWidth
              />
              <Divider tw="w-full bg-gray-500" />
            </React.Fragment>
          }
          fallback={
            <PredictionMarketSelect
              datums={
                'availableMarkets' in predictionParams ? predictionParams.availableMarkets : {}
              }
              isModalVisible={isStatesModalOpen}
              setIsModalVisible={setIsStatesModalOpen}
              onComplete={setSelectedMarket}
            />
          }
        />

        {isInvalidSelection ? (
          <View tw="py-3">
            <Text tw="text-base">{t('Dashboard.MarketPrice.Ranking.select-warning')}</Text>
          </View>
        ) : commodity && (state || selectedMarket) ? (
          <View tw="mt-2">
            <TrendChart commodity={commodity} state={state} market={selectedMarket} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

function _useIsInvalidSelection(obj: {
  commodity: PredictionCrop | null;
  state: PredictionState | null;
  market: PredictionMarket | null;
}): boolean {
  const { commodity, state, market } = obj;

  const contextualCountry = useContextualCountryISO();
  const isIndian = contextualCountry === 'IN';

  const hasNoCommodity = !commodity;
  const hasNoMarket = !market;
  const hasNoState = !state;

  return hasNoCommodity || (isIndian ? hasNoMarket : hasNoState);
}

export default withSafeArea(
  withErrorBoundary(MarketPriceTrend, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
