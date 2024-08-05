import {
  Circle,
  DashPathEffect,
  Line as SkiaLine,
  Text as SkiaText,
  vec,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDerivedValue } from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { PredictionCrop, PredictionData, PredictionState } from '#types/global';

import { Text } from '#ui/components/Text';
import useSkiaFont from '#ui/hooks/useSkiaFont';
import { paperTheme } from '#ui/lib/theme';

import colors from 'tailwindcss/colors';
import { AllowedCountry } from '../store';

type TrendChartProps = {
  commodity: PredictionCrop | null;
  state: PredictionState | null;
  country: AllowedCountry;
};

type ChartProps = {
  currency: ECurrency;
  predictionData: PredictionData;
};

enum ECurrency {
  NG = '₦',
  IN = 'Rs',
}

export function TrendChart({ commodity, state, country }: TrendChartProps) {
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

  if (!predictionData || !predictionData?.pastValues?.length) {
    return (
      <View tw="flex-1 items-center justify-center mx-10">
        <Text variant="TitleMedium" tw="text-center text-green-primary">
          {t('Dashboard.MarketPrice.emptyState')}
        </Text>
      </View>
    );
  }

  return <Chart predictionData={predictionData} currency={ECurrency[country]} />;
}

function Chart({ predictionData, currency }: ChartProps) {
  const { t } = useTranslationUtils();
  const font = useSkiaFont();
  const tooltipFont = useSkiaFont(18);

  const groupedData = useMemo(() => {
    const { pastValues, forecastsValues } = predictionData;

    const combinedDataMap = new Map();

    pastValues.forEach(({ date, price }) => {
      if (price !== null) {
        combinedDataMap.set(date, { date, pastPrice: price, forecast: null });
      }
    });

    forecastsValues.forEach(({ date, price }) => {
      if (price !== null) {
        if (combinedDataMap.has(date)) {
          combinedDataMap.get(date).forecast = price;
        } else {
          combinedDataMap.set(date, { date, pastPrice: null, forecast: price });
        }
      }
    });

    const combinedDataArray = Array.from(combinedDataMap.values());

    return combinedDataArray;
  }, [predictionData]);

  // TODO: find a way to add tooltip to forecast line as well
  const { state, isActive } = useChartPressState({
    x: groupedData[0].date,
    y: {
      pastPrice: groupedData[0].pastPrice ?? 0,
      forecast: groupedData[0].forecast ?? 0,
    },
  });

  const textValue = useDerivedValue(() => state.y.pastPrice.value.value.toFixed(1), [state]);

  const textXPosition = useDerivedValue(() => {
    if (!tooltipFont) return 0;
    const textWidth = tooltipFont.measureText(textValue.value).width;
    return state.x.position.value - textWidth / 2;
  }, [tooltipFont, textValue]);

  const textYPosition = useDerivedValue(() => state.y.pastPrice.position.value - 25, [textValue]);

  const p1 = useDerivedValue(
    () => vec(state.x.position.value, state.y.pastPrice.position.value),
    [textValue]
  );

  const p2 = useDerivedValue(
    () => vec(state.x.position.value, state.y.pastPrice.position.value * 12),
    [textValue]
  );

  return (
    <View tw="w-full mt-4 flex flex-row items-start">
      <Text
        variant="TextMedium"
        tw="text-base text-gray-500 -rotate-90 absolute -left-[10%] bottom-[50%]"
      >
        {t('Dashboard.MarketPrice.Trend.chartLabel', { currency })}
      </Text>

      <View tw="flex-1 h-96 w-[90%] ml-6">
        <View tw="flex flex-row items-center justify-center space-x-2 my-2">
          <View tw="flex flex-row items-center space-x-1">
            <View tw="w-8 h-4 rounded-sm border-2 border-green-primary bg-green-transparency" />
            <Text variant="TitleMedium" tw="text-center">
              {t('Dashboard.MarketPrice.Trend.pastLabel')}
            </Text>
          </View>
          <View tw="flex flex-row items-center space-x-1">
            <View tw="w-8 h-4 rounded-sm border-2 border-yellow-500 bg-yellow-100" />
            <Text variant="TitleMedium" tw="text-center">
              {t('Dashboard.MarketPrice.Trend.forecastLabel')}
            </Text>
          </View>
        </View>
        <CartesianChart
          data={groupedData}
          xKey="date"
          yKeys={['pastPrice', 'forecast']}
          axisOptions={{
            font,
            lineColor: paperTheme.colors.outlineVariant,
            labelColor: paperTheme.colors.tertiary,
            lineWidth: StyleSheet.hairlineWidth,
            labelOffset: 12,
            formatXLabel: (date) => (date ? dateFmt(date, 'MMM yyyy') : ''),
            formatYLabel: (val) => `${val}`,
          }}
          chartPressState={state}
        >
          {({ points }) => {
            return (
              <React.Fragment>
                <Line
                  points={points.pastPrice}
                  color={paperTheme.colors.primary}
                  strokeWidth={2}
                  animate={{ type: 'timing', duration: 500 }}
                  curveType="linear"
                  connectMissingData
                  antiAlias
                />

                <Line
                  points={points.forecast}
                  color={colors.yellow[500]}
                  strokeWidth={2}
                  animate={{ type: 'timing', duration: 500 }}
                  curveType="linear"
                  connectMissingData
                  antiAlias
                />

                {isActive ? (
                  <React.Fragment>
                    <SkiaText
                      x={textXPosition}
                      y={textYPosition}
                      text={textValue}
                      font={tooltipFont}
                      color={paperTheme.colors.tertiary}
                      style="fill"
                    />
                    <Circle
                      cx={state.x.position}
                      cy={state.y.pastPrice.position}
                      r={8}
                      color={paperTheme.colors.backdrop}
                    />
                    <SkiaLine
                      p1={p1}
                      p2={p2}
                      color={paperTheme.colors.onPrimaryContainer}
                      strokeWidth={StyleSheet.hairlineWidth}
                    >
                      <DashPathEffect intervals={[8, 4]} />
                    </SkiaLine>
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            );
          }}
        </CartesianChart>
      </View>
    </View>
  );
}
