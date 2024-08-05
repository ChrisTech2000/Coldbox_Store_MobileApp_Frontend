import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, Switch } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { PredictionCrop, PredictionState } from '#types/global';

import { usePriceTrendsStore } from './store';
import { addMonths, startOfMonth } from 'date-fns';
import { PredictionTable } from './components/PredictionTable';

export type Month = {
  id: number;
  name: string;
  date: Date;
};

const useCommodityStore = createSelectStore<PredictionCrop>();
const useStateStore = createMultipleSelectStore<PredictionState>();
const useMonthsStore = createMultipleSelectStore<Month>();

function MarketPriceRanking() {
  const { t } = useTranslationUtils();
  const { country, predictionParams } = usePriceTrendsStore();
  const { selectedItem: commodity } = useCommodityStore();
  const { selectedItems: states } = useStateStore();
  const { selectedItems: selectedMonths } = useMonthsStore();

  const [filterByLocation, setFilterByLocation] = useState<boolean>(false);
  const [isCommoditiesModalOpen, setIsCommoditiesModalOpen] = useState<boolean>(false);
  const [isSatesModalOpen, setIsStatesModalOpen] = useState<boolean>(false);
  const [isMonthsModalOpen, setIsMonthsModalOpen] = useState<boolean>(false);

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = startOfMonth(addMonths(new Date(), i));
      return {
        id: i,
        name: dateFmt(date.toISOString(), 'MMM, yyyy'),
        date,
      };
    });
  }, []);

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
          useSelectStore={useCommodityStore}
          label={commodity ? commodity.name : t('Dashboard.MarketPrice.commodityLabel')}
          modalHeader={t('Dashboard.MarketPrice.commodityModalTitle')}
          occupyFullWidth
        />
        <Divider tw="w-full bg-gray-500 mb-4" />

        {filterByLocation && (
          <View>
            <MultipleSelectWithStore<PredictionState>
              datums={predictionParams?.availableStates ?? []}
              isModalVisible={isSatesModalOpen}
              setIsModalVisible={setIsStatesModalOpen}
              itemName={(item) => item?.name}
              useSelectStore={useStateStore}
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
          </View>
        )}

        <MultipleSelectWithStore<Month>
          datums={months}
          isModalVisible={isMonthsModalOpen}
          setIsModalVisible={setIsMonthsModalOpen}
          itemName={(item) => item.name}
          useSelectStore={useMonthsStore}
          label={
            selectedMonths.length
              ? selectedMonths.map((s) => s.name).join(', ')
              : t('Dashboard.MarketPrice.Ranking.monthLabel')
          }
          modalHeader={t('Dashboard.MarketPrice.Ranking.monthModalTitle')}
          occupyFullWidth
        />
        <Divider tw="w-full bg-gray-500 mb-4" />

        {predictionParams?.availableStates?.length && commodity && selectedMonths.length > 0 && (
          <PredictionTable
            states={states.length > 0 ? states : predictionParams.availableStates}
            dates={selectedMonths}
            commodity={commodity}
            country={country}
          />
        )}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(MarketPriceRanking);
