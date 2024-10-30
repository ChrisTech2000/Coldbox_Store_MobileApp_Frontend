import {
  Circle,
  DashPathEffect,
  RoundedRect,
  Line as SkiaLine,
  Text as SkiaText,
  vec,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDerivedValue } from 'react-native-reanimated';
import { CartesianChart, Line, Scatter, useChartPressState } from 'victory-native';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type { PredictionCrop, PredictionData, PredictionState } from '#types/global';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';

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

const TOOLTIP_GAP = 24;

function Chart({ predictionData, currency }: ChartProps) {
  const { t } = useTranslationUtils();
  const font = useSkiaFont();
  const tooltipFont = useSkiaFont(16);

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

  const pastTextValue = useDerivedValue(() => state.y.pastPrice.value.value.toFixed(2), [state]);
  const pastTextXPosition = useDerivedValue(() => {
    if (!tooltipFont) return 0;
    const textWidth = tooltipFont.measureText(pastTextValue.value).width;
    return state.x.position.value - textWidth / 2;
  }, [tooltipFont, pastTextValue]);
  const pastTextYPosition = useDerivedValue(
    () => state.y.pastPrice.position.value - 25,
    [pastTextValue]
  );

  const forecastTextValue = useDerivedValue(() => state.y.forecast.value.value.toFixed(2), [state]);
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

  const pastTextTooltipWidth = tooltipFont ? tooltipFont.measureText(pastTextValue.value).width : 0;
  const pastTextTooltipHeight = tooltipFont
    ? tooltipFont.measureText(pastTextValue.value).height
    : 0;

  const pastTextTooltipYPosition = useDerivedValue(
    () => pastTextYPosition.value - pastTextTooltipHeight - TOOLTIP_GAP / 2,
    [pastTextYPosition, pastTextTooltipHeight]
  );

  const pastTextTooltipXPosition = useDerivedValue(
    () => pastTextXPosition.value - TOOLTIP_GAP / 2,
    [pastTextXPosition]
  );

  return (
    <View tw="w-full mt-6 mb-24 flex flex-row items-start">
      <View tw="flex-1 h-96 w-full">
        <Text tw="text-sm text-gray-500 mb-1">
          {t('Dashboard.MarketPrice.Trend.chartLabel', { currency })}
        </Text>
        <CartesianChart
          data={groupedData}
          xKey="date"
          domainPadding={{ top: 80, left: 60, right: 60, bottom: 10 }}
          yKeys={['pastPrice', 'forecast']}
          axisOptions={{
            font,
            lineColor: paperTheme.colors.outlineVariant,
            labelColor: paperTheme.colors.tertiary,
            lineWidth: StyleSheet.hairlineWidth,
            labelOffset: 10,
            formatXLabel: (date) => (date ? dateFmt(date, 'MMM yy') : ''),
            formatYLabel: () => ' ',
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
              {/* Past Price data points */}
              <Scatter
                points={points.pastPrice}
                shape="circle"
                radius={2.5}
                style="fill"
                color={paperTheme.colors.onPrimaryContainer}
                antiAlias
              />
              {/* Forecast data points */}
              <Scatter
                points={points.forecast}
                shape="circle"
                radius={2.5}
                style="fill"
                color={paperTheme.colors.onPrimaryContainer}
                antiAlias
              />
              {isActive && (
                <>
                  {/* Past Price Tooltip */}
                  <RoundedRect
                    x={pastTextTooltipXPosition}
                    y={pastTextTooltipYPosition}
                    width={pastTextTooltipWidth + TOOLTIP_GAP}
                    height={pastTextTooltipHeight + TOOLTIP_GAP}
                    color={paperTheme.colors.primary}
                    r={10}
                  />
                  <SkiaText
                    x={pastTextXPosition}
                    y={pastTextYPosition}
                    text={pastTextValue}
                    font={tooltipFont}
                    color={colors.white}
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

        <View tw="flex flex-row items-center justify-center space-x-6 pt-4">
          <Touchable
            tw="flex flex-row items-center space-x-2 px-1"
            rippleColor={paperTheme.colors.backdrop}
            onPress={() => {
              console.log('12');
            }}
          >
            <View tw="w-8 h-4 rounded-sm border-2 border-green-primary bg-green-transparency" />
            <Text tw="text-base text-zinc-600 text-center">
              {t('Dashboard.MarketPrice.Trend.pastLabel')}
            </Text>
          </Touchable>
          <Touchable
            tw="flex flex-row items-center space-x-2 px-1"
            rippleColor={paperTheme.colors.backdrop}
            onPress={() => {
              console.log('12');
            }}
          >
            <View tw="w-8 h-4 rounded-sm border-2 border-yellow-500 bg-yellow-100" />
            <Text tw="text-base text-zinc-600 text-center">
              {t('Dashboard.MarketPrice.Trend.forecastLabel')}
            </Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
}
