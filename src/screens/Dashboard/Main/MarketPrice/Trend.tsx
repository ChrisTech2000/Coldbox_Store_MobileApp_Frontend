import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles, PredictionCrop, PredictionState } from '#types/global';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { ScrollView } from 'react-native-gesture-handler';
import { TrendChart } from './components/TrendChart';

export type AllowedCountry = 'IN' | 'NG';

const availableCountries = ['IN', 'NG'];

const useCommodityStore = createSelectStore<PredictionCrop>();
const useStateStore = createSelectStore<PredictionState>();

function MarketPriceTrend() {
  const { t } = useTranslationUtils();
  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { selectedItem: commodity } = useCommodityStore();
  const { selectedItem: state } = useStateStore();

  const [isCommoditiesModalOpen, setIsCommoditiesModalOpen] = useState<boolean>(false);
  const [isStatesModalOpen, setIsStatesModalOpen] = useState<boolean>(false);

  const { data: farmer, isLoading: loadingFarmer } = useApiCall(
    'getFarmer',
    ColdtivateService.getFarmer,
    { userId: user?.id as number },
    {
      skip: !user?.id || user.role !== ERoles.COOLING_USER,
      defaultData: [],
    }
  );

  const country: AllowedCountry | null = useMemo(() => {
    if (
      user?.role === ERoles.COOLING_USER &&
      farmer?.[0]?.country &&
      availableCountries.includes(farmer[0].country)
    ) {
      return farmer[0].country as AllowedCountry;
    }

    if (company?.country && availableCountries.includes(company.country)) {
      return company.country as AllowedCountry;
    }

    return null;
  }, [user, company, farmer]);

  const { data: predictionParams, isLoading: loadingPredictionParams } = useApiCall(
    'getPredictionParams',
    ColdtivateService.getPredictionParams,
    country as AllowedCountry,
    {
      skip: !country,
    }
  );

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
          label={commodity ? commodity.name : t('Dashboard.MarketPrice.Trend.commodityLabel')}
          modalHeader={t('Dashboard.MarketPrice.Trend.commodityModalTitle')}
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
