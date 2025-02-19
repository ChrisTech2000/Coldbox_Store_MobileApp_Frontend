import { addMonths, startOfMonth } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';

import { GenericError } from '#ui/components/GenericError';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import type { PredictionCrop, PredictionMarket, PredictionState } from '#types/global';

import { PredictionTable } from './components/PredictionTable';
import { usePriceTrendsStore } from './store';
import { CountryBasedContentSwitch } from './components/PredictionMarketSelect';
import PriceRankingMarketFilters from './components/PriceRankingMarketFilters';

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

  if (!allowedCountry) {
    return (
      <View tw="flex-1 items-center justify-center mx-10">
        <Text variant="TitleMedium" tw="text-center text-green-primary">
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
          datums={predictionParams?.availableCrops ?? []}
          isModalVisible={isCommoditiesModalOpen}
          setIsModalVisible={setIsCommoditiesModalOpen}
          itemName={(item) => item?.name}
          useSelectStore={useRankingCommodityStore}
          label={commodity ? commodity.name : t('Dashboard.MarketPrice.commodityLabel')}
          modalHeader={t('Dashboard.MarketPrice.commodityModalTitle')}
          occupyFullWidth
        />
        <Divider tw="w-full bg-gray-500 mb-4" />

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
                <Divider tw="w-full bg-gray-500 mb-4" />
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
              <Divider tw="w-full bg-gray-500 mb-4" />
            </React.Fragment>
          }
          fallback={
            <React.Fragment>
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
              <Divider tw="w-full bg-gray-500 mt-2.5" />
            </React.Fragment>
          }
        />

        {predictionParams && commodity && selectedTimeframe.length > 0 ? (
          <CountryBasedContentSwitch
            standard={
              <PredictionTable
                states={
                  states.length > 0
                    ? states
                    : 'availableStates' in predictionParams
                      ? predictionParams.availableStates
                      : []
                }
                commodity={commodity}
                dates={selectedTimeframe}
              />
            }
            fallback={
              <PredictionTable
                commodity={commodity}
                dates={selectedTimeframe}
                markets={selectedMarkets}
              />
            }
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(MarketPriceRanking, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
