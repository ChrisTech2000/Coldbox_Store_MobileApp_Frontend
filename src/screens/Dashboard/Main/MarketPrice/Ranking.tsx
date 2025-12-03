import { addMonths, startOfMonth } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { GenericError } from '#ui/components/GenericError';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import type { PredictionCrop, PredictionMarket, PredictionState } from '#types/global';
import { cn } from '#ui/lib/cn';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { PredictionTable } from './components/PredictionTable';
import { usePriceTrendsStore } from './store';
import {
  CountryBasedContentSwitch,
  useContextualCountryISO,
} from './components/PredictionMarketSelect';
import PriceRankingMarketFilters, {
  getMarketsGroupedByDistrict,
} from './components/PriceRankingMarketFilters';

export type TimeFrameDatum = {
  id: number;
  name: string;
  date: Date;
};

const useRankingCommodityStore = createSelectStore<PredictionCrop>();
const useRankingStateStore = createMultipleSelectStore<PredictionState>();
const useRankingTimeFrameStore = createMultipleSelectStore<TimeFrameDatum>();

export const rankingStores = [
  useRankingCommodityStore,
  useRankingStateStore,
  useRankingTimeFrameStore,
];

function MarketPriceRanking() {
  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));

  const locale = LanguageManager.read();

  const { t } = useTranslationUtils();

  const { country: allowedCountry, predictionParams } = usePriceTrendsStore();
  const { selectedItem: commodity } = useRankingCommodityStore();
  const { selectedItems: states } = useRankingStateStore();
  const { selectedItems: selectedTimeframe } = useRankingTimeFrameStore();

  const [filterByLocation, setFilterByLocation] = useState<boolean>(false);
  const [isCommoditiesModalOpen, setIsCommoditiesModalOpen] = useState<boolean>(false);
  const [isSatesModalOpen, setIsStatesModalOpen] = useState<boolean>(false);
  const [isDatesModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const [selectedMarkets, setSelectedMarkets] = useState<Array<PredictionMarket>>([]);

  const cropTranslations = useMemo(() => {
    const safeValue = predictionParams?.availableCrops ?? [];

    const record: Record<number, string> = {};
    if (!safeValue?.length) return record;

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    for (const crop of safeValue) {
      if (typeof record[crop.id] === 'string') continue;
      record[crop.id] = find(translationMap, {
        name: crop.name,
        country: companyCountry || farmerCountry || undefined,
        locale,
      });
    }

    return record;
  }, [predictionParams?.availableCrops, companyCountry, farmerCountry, locale]);

  const sortedCrops = useMemo(() => {
    const crops = predictionParams?.availableCrops ?? [];
    return [...crops].sort((a, b) => {
      const nameA = cropTranslations[a.id] || a.name;
      const nameB = cropTranslations[b.id] || b.name;
      return nameA.toLowerCase().localeCompare(nameB.toLowerCase());
    });
  }, [predictionParams?.availableCrops, cropTranslations]);

  const { months, days } = useMemo(
    () => ({
      months: Array.from({ length: 12 }, (_, idx) => {
        const date = startOfMonth(addMonths(new Date(), idx));
        return {
          id: idx,
          name: dateFmt(date.toISOString(), 'MMM yyyy'),
          date,
        } satisfies TimeFrameDatum;
      }),
      days: Array.from({ length: 14 }, (_, idx) => {
        const date = new Date();
        date.setDate(date.getDate() + idx);
        return {
          id: idx,
          name: dateFmt(date.toISOString(), 'dd MMMM'),
          date,
        } satisfies TimeFrameDatum;
      }),
    }),
    []
  );

  const stateDatums = useMemo(
    (): Array<PredictionState> =>
      states.length > 0 && filterByLocation
        ? states
        : predictionParams && 'availableStates' in predictionParams
          ? predictionParams.availableStates
          : [],
    [states, filterByLocation, predictionParams]
  );

  const marketDatums = useMemo(
    (): Array<PredictionMarket> =>
      selectedMarkets.length > 0 && filterByLocation
        ? selectedMarkets
        : predictionParams && 'availableMarkets' in predictionParams
          ? getMarketsGroupedByDistrict(predictionParams.availableMarkets).defaultList()
          : [],
    [selectedMarkets, filterByLocation, predictionParams]
  );

  const isInvalidSelection = _useIsInvalidSelection({
    commodity,
    selectedTimeframe,
    markets: marketDatums,
    states: stateDatums,
  });

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
    <View tw="absolute bottom-0 top-0 pb-1 w-full">
      <ScrollView tw="h-full m-4 space-y-2" showsVerticalScrollIndicator={false}>
        <View tw="flex flex-row space-x-2 items-center w-full mb-4">
          <Switch value={filterByLocation} onValueChange={setFilterByLocation} />
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.MarketPrice.Ranking.filter')}
          </Text>
        </View>

        <SelectWithStore<PredictionCrop>
          datums={sortedCrops}
          isModalVisible={isCommoditiesModalOpen}
          setIsModalVisible={setIsCommoditiesModalOpen}
          itemName={(item) => cropTranslations[item.id]}
          useSelectStore={useRankingCommodityStore}
          label={
            commodity ? cropTranslations[commodity.id] : t('Dashboard.MarketPrice.commodityLabel')
          }
          modalHeader={t('Dashboard.MarketPrice.commodityModalTitle')}
          occupyFullWidth
        />
        <Divider tw={cn('w-full bg-gray-600', !filterByLocation && 'mb-2.5')} />

        {filterByLocation && predictionParams ? (
          <CountryBasedContentSwitch
            standard={
              <React.Fragment>
                <MultipleSelectWithStore<PredictionState>
                  datums={
                    'availableStates' in predictionParams ? predictionParams?.availableStates : []
                  }
                  isModalVisible={isSatesModalOpen}
                  setIsModalVisible={setIsStatesModalOpen}
                  itemName={(item) => item?.name}
                  useSelectStore={useRankingStateStore}
                  label={
                    states.length
                      ? states.map((s) => s.name).join(', ')
                      : t('Dashboard.MarketPrice.Ranking.stateLabel')
                  }
                  modalHeader={t('Dashboard.MarketPrice.Ranking.stateModalTitle')}
                  occupyFullWidth
                  autoSelectAll
                />
                <Divider
                  tw={cn(
                    'w-full bg-gray-600',
                    'availableMarkets' in predictionParams ? 'mb-4' : 'mt-2.5'
                  )}
                />
              </React.Fragment>
            }
            fallback={
              <PriceRankingMarketFilters
                datums={
                  'availableMarkets' in predictionParams ? predictionParams?.availableMarkets : {}
                }
                onMarketSelect={setSelectedMarkets}
              />
            }
          />
        ) : null}

        <CountryBasedContentSwitch
          standard={
            <React.Fragment>
              <MultipleSelectWithStore<TimeFrameDatum>
                datums={months}
                isModalVisible={isDatesModalOpen}
                setIsModalVisible={setIsDateModalOpen}
                itemName={(item) => item.name}
                useSelectStore={useRankingTimeFrameStore}
                label={
                  selectedTimeframe.length
                    ? selectedTimeframe.map((s) => s.name).join(', ')
                    : t('Dashboard.MarketPrice.Ranking.monthLabel')
                }
                modalHeader={t('Dashboard.MarketPrice.Ranking.monthModalTitle')}
                occupyFullWidth
              />
              <Divider tw="w-full bg-gray-600 mt-2.5" />
            </React.Fragment>
          }
          fallback={
            <View tw={cn(filterByLocation && 'mt-1.5')}>
              <MultipleSelectWithStore<TimeFrameDatum>
                datums={days}
                isModalVisible={isDatesModalOpen}
                setIsModalVisible={setIsDateModalOpen}
                itemName={(item) => item.name}
                useSelectStore={useRankingTimeFrameStore}
                label={
                  selectedTimeframe.length
                    ? selectedTimeframe.map((s) => s.name).join(', ')
                    : t('Dashboard.ProduceDetails.days')
                }
                modalHeader="Select the days"
                occupyFullWidth
              />
              <Divider tw="w-full bg-gray-600 mt-2.5" />
            </View>
          }
        />

        {isInvalidSelection ? (
          <View tw="py-3">
            <Text tw="text-base">{t('Dashboard.MarketPrice.Ranking.select-warning')}</Text>
          </View>
        ) : predictionParams && commodity && selectedTimeframe.length > 0 ? (
          <CountryBasedContentSwitch
            standard={
              <PredictionTable
                states={stateDatums}
                commodity={commodity}
                dates={selectedTimeframe}
              />
            }
            fallback={
              <PredictionTable
                markets={marketDatums}
                commodity={commodity}
                dates={selectedTimeframe}
              />
            }
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function _useIsInvalidSelection(obj: {
  commodity: PredictionCrop | null;
  selectedTimeframe: Array<TimeFrameDatum>;
  states: Array<PredictionState>;
  markets: Array<PredictionMarket>;
}): boolean {
  const { commodity, selectedTimeframe, states, markets } = obj;

  const contextualCountry = useContextualCountryISO();
  const isIndian = contextualCountry === 'IN';

  const hasNoCommodity = !commodity;
  const hasNoTimeframe = !selectedTimeframe.length;
  const hasNoMarkets = !markets?.length;
  const hasNoStates = !states?.length;

  return hasNoCommodity || hasNoTimeframe || (isIndian ? hasNoMarkets : hasNoStates);
}

export default withSafeArea(
  withErrorBoundary(MarketPriceRanking, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
