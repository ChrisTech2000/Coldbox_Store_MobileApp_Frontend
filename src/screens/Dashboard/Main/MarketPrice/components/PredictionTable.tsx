import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { PredictionCrop, PredictionState } from '#types/global';

import { Month } from '../Ranking';
import type { AllowedCountry } from '../store';

enum ECurrency {
  NG = '₦',
  IN = 'Rs',
}

type PredictionTableProps = {
  commodity: PredictionCrop;
  states: Array<PredictionState>;
  country: AllowedCountry;
  dates: Month[];
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export function PredictionTable({ commodity, states, country, dates }: PredictionTableProps) {
  const { t } = useTranslationUtils();

  const { data: predictionData, isLoading: loadingPredictionData } = useApiCall(
    'getPredictionTable',
    ColdtivateService.getPredictionTable,
    {
      cropId: commodity.id,
      statesIds: states.map(({ id }) => id),
      days: dates.map(({ date }) => date),
      country,
    }
  );

  if (loadingPredictionData) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!predictionData || !predictionData?.length) {
    return (
      <View tw="flex-1 items-center justify-center mx-10">
        <Text variant="TitleMedium" tw="text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <DataTable tw="py-4 px-2">
        <DataTable.Header tw="bg-gray-700 rounded-t-lg h-18 py-2">
          <DataTable.Cell>
            <TouchableOpacity tw="flex flex-row items-center">
              <Text variant="TextMedium" tw="text-white text-base">
                {t('Dashboard.MarketPrice.Ranking.table.column1')}
              </Text>
              <Icon source="arrow-up-down" color={colors.white} size={14} />
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell>
            <TouchableOpacity tw="flex flex-row items-center">
              <Text variant="TextMedium" tw="text-white text-base">
                {t('Dashboard.MarketPrice.Ranking.table.column2')}
              </Text>
              <Icon source="arrow-up-down" color={colors.white} size={14} />
            </TouchableOpacity>
          </DataTable.Cell>
          <DataTable.Cell>
            <TouchableOpacity tw="flex flex-row items-center">
              <Text variant="TextMedium" tw="text-white text-base">
                {t('Dashboard.MarketPrice.Ranking.table.column3', { currency: ECurrency[country] })}
              </Text>
              <Icon source="arrow-up-down" color={colors.white} size={14} />
            </TouchableOpacity>
          </DataTable.Cell>
        </DataTable.Header>
        <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
          <FlashList
            data={predictionData}
            keyExtractor={(item, index) => `${item.date}-#${index}-${item.price}`}
            renderItem={({ item }) => (
              <DataTable.Row tw="bg-white">
                <DataTable.Cell>{item.state}</DataTable.Cell>
                <DataTable.Cell>{item.date}</DataTable.Cell>
                <DataTable.Cell>
                  {item.price ?? t('Dashboard.MarketPrice.Ranking.table.emptyState')}
                </DataTable.Cell>
              </DataTable.Row>
            )}
            nestedScrollEnabled
            estimatedItemSize={40}
            estimatedListSize={{
              height: deviceHeight,
              width: deviceWidth - 40,
            }}
          />
        </SkiaShadow>
      </DataTable>
    </View>
  );
}
