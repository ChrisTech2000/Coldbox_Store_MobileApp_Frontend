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
import { MAP_ALLOWED_COUNTRY, QueryCountry } from '../Trend';

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
  const mappedCountry = MAP_ALLOWED_COUNTRY[country ?? ('' as AllowedCountry)] as QueryCountry;

  const { data: predictionData, isLoading: loadingPredictionData } = useApiCall(
    'getPrediction',
    ColdtivateService.getPrediction,
    {
      cropId: commodity?.id as number,
      stateId: state?.id as number,
      country: mappedCountry,
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

  return <Chart predictionData={predictionData} currency={ECurrency[mappedCountry]} />;
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

    return Array.from(combinedDataMap.values());
  }, [predictionData]);

  const { state, isActive } = useChartPressState({
    x: groupedData[0].date,
    y: {
      pastPrice: groupedData[0].pastPrice ?? 0,
      forecast: groupedData[0].forecast ?? 0,
    },
  });

  const pastTextValue = useDerivedValue(() => state.y.pastPrice.value.value.toFixed(1), [state]);
  const pastTextXPosition = useDerivedValue(() => {
    if (!tooltipFont) return 0;
    const textWidth = tooltipFont.measureText(pastTextValue.value).width;
    return state.x.position.value - textWidth / 2;
  }, [tooltipFont, pastTextValue]);
  const pastTextYPosition = useDerivedValue(
    () => state.y.pastPrice.position.value - 25,
    [pastTextValue]
  );

  const forecastTextValue = useDerivedValue(() => state.y.forecast.value.value.toFixed(1), [state]);
  const forecastTextXPosition = useDerivedValue(() => {
    if (!tooltipFont) return 0;
    const textWidth = tooltipFont.measureText(forecastTextValue.value).width;
    return state.x.position.value - textWidth / 2;
  }, [tooltipFont, forecastTextValue]);
  const forecastTextYPosition = useDerivedValue(
    () => state.y.forecast.position.value - 25,
    [forecastTextValue]
  );

  const pastP1 = useDerivedValue(
    () => vec(state.x.position.value, state.y.pastPrice.position.value),
    [pastTextValue]
  );
  const pastP2 = useDerivedValue(
    () => vec(state.x.position.value, state.y.pastPrice.position.value * 12),
    [pastTextValue]
  );

  const forecastP1 = useDerivedValue(
    () => vec(state.x.position.value, state.y.forecast.position.value),
    [forecastTextValue]
  );
  const forecastP2 = useDerivedValue(
    () => vec(state.x.position.value, state.y.forecast.position.value * 12),
    [forecastTextValue]
  );

  return (
    <View tw="w-full mt-4 mb-24 flex flex-row items-start">
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
          domainPadding={{ top: 45, left: 25, right: 25, bottom: 10 }}
          yKeys={['pastPrice', 'forecast']}
          axisOptions={{
            font,
            lineColor: paperTheme.colors.outlineVariant,
            labelColor: paperTheme.colors.tertiary,
            lineWidth: StyleSheet.hairlineWidth,
            labelOffset: 10,
            formatXLabel: (date) => (date ? dateFmt(date, 'MMM yy') : ''),
            formatYLabel: (val) => `${val}`,
          }}
          chartPressState={state}
        >
          {({ points }) => (
            <>
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
              {isActive && (
                <>
                  {/* Past Price Tooltip */}
                  <SkiaText
                    x={pastTextXPosition}
                    y={pastTextYPosition}
                    text={pastTextValue}
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
                    p1={pastP1}
                    p2={pastP2}
                    color={paperTheme.colors.onPrimaryContainer}
                    strokeWidth={StyleSheet.hairlineWidth}
                  >
                    <DashPathEffect intervals={[8, 4]} />
                  </SkiaLine>

                  {/* Forecast Tooltip */}
                  <SkiaText
                    x={forecastTextXPosition}
                    y={forecastTextYPosition}
                    text={forecastTextValue}
                    font={tooltipFont}
                    color={paperTheme.colors.tertiary}
                    style="fill"
                  />
                  <Circle
                    cx={state.x.position}
                    cy={state.y.forecast.position}
                    r={8}
                    color={paperTheme.colors.backdrop}
                  />
                  <SkiaLine
                    p1={forecastP1}
                    p2={forecastP2}
                    color={paperTheme.colors.onPrimaryContainer}
                    strokeWidth={StyleSheet.hairlineWidth}
                  >
                    <DashPathEffect intervals={[8, 4]} />
                  </SkiaLine>
                </>
              )}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}
