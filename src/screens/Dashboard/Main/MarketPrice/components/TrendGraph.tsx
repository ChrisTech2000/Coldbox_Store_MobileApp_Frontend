import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { PredictionCrop, PredictionState } from '#types/global';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { AllowedCountry } from '../Trend';

type TrendGraphProps = {
  commodity: PredictionCrop | null;
  state: PredictionState | null;
  country: AllowedCountry;
};

export function TrendGraph({ commodity, state, country }: TrendGraphProps) {
  const { t } = useTranslationUtils();

  const { data: predictionData, isLoading: loadingPredictionData } = useApiCall(
    'getPrediction',
    ColdtivateService.getPrediction,
    {
      cropId: commodity?.id as number,
      stateId: state?.id as number,
      country,
    },
    { skip: !commodity || !state }
  );

  if (loadingPredictionData) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!predictionData) {
    return (
      <View tw="flex-1 items-center justify-center mx-10">
        <Text variant="TitleMedium" tw="text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return <View></View>;
}
