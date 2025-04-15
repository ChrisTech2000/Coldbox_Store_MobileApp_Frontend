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
import {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { CartesianChart, Line, Scatter, useChartPressState } from 'victory-native';
import colors from 'tailwindcss/colors';

import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import type {
  PredictionCrop,
  PredictionData,
  PredictionMarket,
  PredictionState,
} from '#types/global';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';

import { useToggle } from '#ui/hooks/useToggle';
import useSkiaFont from '#ui/hooks/useSkiaFont';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

import { DEFAULT_COUNTRY_DATUM, useContextualCountryISO } from './PredictionMarketSelect';
import type { QueryCountry } from '../Trend';

type TrendChartProps = {
  commodity: PredictionCrop | null;
  state: PredictionState | null;
  market: PredictionMarket | null;
};

type ChartProps = {
  currency: string;
  predictionData: PredictionData;
};

export function TrendChart({ commodity, state, market }: TrendChartProps) {
  const { t } = useTranslationUtils();

  const countryISO = useContextualCountryISO();

  const { data: predictionData, isLoading: loadingPredictionData } = useApiCall(
    'getPrediction',
    ColdtivateService.getPrediction,
    {
      country: countryISO as QueryCountry,
      cropId: commodity?.id as number,
      stateId: state?.id as number,
      marketId: market?.id as number,
    },
    { skip: !commodity || (!state && !market) }
  );

  const currency = useMemo(
    () =>
      countriesDict().getByValue(countryISO)?.currencyCode || DEFAULT_COUNTRY_DATUM.CURRENCY_CODE,
    [countryISO]
  );

  if (loadingPredictionData) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const isRTL = LanguageManager.isRTL;

  if (!predictionData || !predictionData?.pastValues?.length) {
    return (
      <View tw={cn('flex-1 items-center justify-center mx-10 mt-3', isRTL && 'items-start mx-2')}>
        <Text tw={cn('text-base text-center', isRTL && 'text-left')}>
          {t('Dashboard.MarketPrice.no-data-found')}
        </Text>
      </View>
    );
  }

  return <Chart predictionData={predictionData} currency={currency} />;
}

const TOOLTIP_GAP = 34;
const TOOLTIP_OFFSET = 8;
const DASH_EFFECT_INTERVALS = [8, 4];

type ChartDatum = {
  date: string;
  pastPrice: number | null;
  forecast: number | null;
};

function Chart({ predictionData, currency }: ChartProps) {
  const { t } = useTranslationUtils();

  const [isPastPriceVisible, togglePastPriceVisibility] = useToggle(true);
  const [isForecastVisible, toggleForecastVisibility] = useToggle(true);

  const chartFont = useSkiaFont();
  const tooltipFont = useSkiaFont(15);
  const smallTextFont = useSkiaFont(13);

  //
  // chart data remap
  const groupedData = useMemo(() => {
    const chartMap = new Map<string, ChartDatum>();

    for (const { price, date } of predictionData.pastValues) {
      if (price === null) continue;
      chartMap.set(date, { date, pastPrice: price, forecast: null });
    }

    for (const { date, price } of predictionData.forecastsValues) {
      if (price === null) continue;
      const datum = chartMap.get(date);
      if (typeof datum === 'undefined') {
        chartMap.set(date, { date, pastPrice: null, forecast: price });
      } else {
        chartMap.set(date, { ...datum, forecast: price });
      }
    }

    return Array.from(chartMap.values());
  }, [predictionData]);

  //
  // chart state
  const { state, isActive } = useChartPressState({
    x: groupedData[0].date,
    y: {
      pastPrice: groupedData[0].pastPrice ?? 0,
      forecast: groupedData[0].forecast ?? 0,
    },
  });

  //
  // tooltip text values
  const pastTextValue = useDerivedValue(() => state.y.pastPrice.value.value.toFixed(2), [state]);
  const forecastTextValue = useDerivedValue(() => state.y.forecast.value.value.toFixed(2), [state]);

  const pastTextWidth = tooltipFont ? tooltipFont.measureText(pastTextValue.value).width : 0;
  const pastTextHeight = tooltipFont ? tooltipFont.measureText(pastTextValue.value).height : 0;
  const forecastTextWidth = tooltipFont
    ? tooltipFont.measureText(forecastTextValue.value).width
    : 0;
  const forecastTextHeight = tooltipFont
    ? tooltipFont.measureText(forecastTextValue.value).height
    : 0;

  const formattedDate = useSharedValue<string>('');

  function setFormattedDate(timestamp: string) {
    formattedDate.value = dateFmt(timestamp, 'MMM yy');
  }

  useAnimatedReaction(
    () => state.x.value,
    (newValue) => {
      runOnJS(setFormattedDate)(newValue.value);
    }
  );

  //
  // (on press) tooltip text axis position
  const pastTextXPosition = useDerivedValue(
    () => state.x.position.value - pastTextWidth / 2,
    [state.x.position, pastTextWidth]
  );

  const pastTextYPosition = useDerivedValue(
    () => state.y.pastPrice.position.value + TOOLTIP_OFFSET - 25,
    [state.y.pastPrice.position]
  );

  const pastPriceFormattedDateYPosition = useDerivedValue(
    () => pastTextYPosition.value - 18,
    [pastTextYPosition]
  );

  const forecastTextXPosition = useDerivedValue(
    () => state.x.position.value - forecastTextWidth / 2,
    [state.x.position, forecastTextWidth]
  );

  const forecastTextYPosition = useDerivedValue(
    () => state.y.forecast.position.value - 25,
    [state.y.forecast.position]
  );

  const forecastFormattedDateYPosition = useDerivedValue(
    () => forecastTextYPosition.value - 18,
    [forecastTextYPosition]
  );

  //
  // (on press) dashed indicator axis position
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

  //
  // (on press) tooltip axis position
  const pastTextTooltipYPosition = useDerivedValue(
    () => pastTextYPosition.value - TOOLTIP_OFFSET - pastTextHeight - TOOLTIP_GAP / 2,
    [pastTextYPosition, pastTextHeight]
  );

  const pastTextTooltipXPosition = useDerivedValue(
    () => pastTextXPosition.value - TOOLTIP_GAP / 2,
    [pastTextXPosition]
  );

  const forecastTextTooltipYPosition = useDerivedValue(
    () => forecastTextYPosition.value - TOOLTIP_OFFSET - forecastTextHeight - TOOLTIP_GAP / 2,
    [forecastTextYPosition, forecastTextHeight]
  );

  const forecastTextTooltipXPosition = useDerivedValue(
    () => forecastTextXPosition.value - TOOLTIP_GAP / 2,
    [forecastTextXPosition]
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
          domainPadding={{ top: 90, left: 70, right: 70, bottom: 40 }}
          yKeys={['pastPrice', 'forecast']}
          axisOptions={{
            font: chartFont,
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
            <React.Fragment>
              {/* Past Price data points */}
              {isPastPriceVisible ? (
                <React.Fragment>
                  <Scatter
                    points={points.pastPrice}
                    shape="circle"
                    radius={2.5}
                    style="fill"
                    color={paperTheme.colors.onPrimaryContainer}
                    antiAlias
                  />
                  <Line
                    points={points.pastPrice}
                    color={paperTheme.colors.primary}
                    strokeWidth={2}
                    curveType="linear"
                    connectMissingData
                    antiAlias
                  />
                </React.Fragment>
              ) : null}
              {/* Forecast data points */}
              {isForecastVisible ? (
                <React.Fragment>
                  <Line
                    points={points.forecast}
                    color={colors.yellow[500]}
                    strokeWidth={2}
                    curveType="linear"
                    connectMissingData
                    antiAlias
                  />
                  <Scatter
                    points={points.forecast}
                    shape="circle"
                    radius={2.5}
                    style="fill"
                    color={paperTheme.colors.onPrimaryContainer}
                    antiAlias
                  />
                </React.Fragment>
              ) : null}

              {/* Past Price Tooltip */}
              {isPastPriceVisible && isActive ? (
                <React.Fragment>
                  <RoundedRect
                    x={pastTextTooltipXPosition}
                    y={pastTextTooltipYPosition}
                    width={pastTextWidth + TOOLTIP_GAP}
                    height={pastTextHeight + TOOLTIP_GAP}
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
                  <SkiaText
                    x={pastTextXPosition}
                    y={pastPriceFormattedDateYPosition}
                    text={formattedDate}
                    font={smallTextFont}
                    color={colors.zinc[100]}
                    style="fill"
                  />
                  <Circle
                    cx={state.x.position}
                    cy={state.y.pastPrice.position}
                    r={5.5}
                    color={paperTheme.colors.backdrop}
                  />
                  <SkiaLine
                    p1={pastP1}
                    p2={pastP2}
                    color={paperTheme.colors.onPrimaryContainer}
                    strokeWidth={StyleSheet.hairlineWidth}
                  >
                    <DashPathEffect intervals={DASH_EFFECT_INTERVALS} />
                  </SkiaLine>
                </React.Fragment>
              ) : null}

              {/* Forecast Tooltip */}
              {isForecastVisible && isActive ? (
                <React.Fragment>
                  <RoundedRect
                    x={forecastTextTooltipXPosition}
                    y={forecastTextTooltipYPosition}
                    width={forecastTextWidth + TOOLTIP_GAP}
                    height={forecastTextHeight + TOOLTIP_GAP}
                    color={colors.yellow[500]}
                    r={10}
                  />
                  <SkiaText
                    x={forecastTextXPosition}
                    y={forecastTextYPosition}
                    text={forecastTextValue}
                    font={tooltipFont}
                    color={colors.white}
                    style="fill"
                  />
                  <SkiaText
                    x={forecastTextXPosition}
                    y={forecastFormattedDateYPosition}
                    text={formattedDate}
                    font={smallTextFont}
                    color={colors.zinc[50]}
                    style="fill"
                  />
                  <Circle
                    cx={state.x.position}
                    cy={state.y.forecast.position}
                    r={5.5}
                    color={paperTheme.colors.backdrop}
                  />
                  <SkiaLine
                    p1={forecastP1}
                    p2={forecastP2}
                    color={paperTheme.colors.onPrimaryContainer}
                    strokeWidth={StyleSheet.hairlineWidth}
                  >
                    <DashPathEffect intervals={DASH_EFFECT_INTERVALS} />
                  </SkiaLine>
                </React.Fragment>
              ) : null}
            </React.Fragment>
          )}
        </CartesianChart>

        <View tw="flex flex-row items-center justify-center space-x-6 pt-4">
          <Touchable
            tw="flex flex-row items-center space-x-2 px-1"
            rippleColor={paperTheme.colors.backdrop}
            onPress={(evt) => {
              evt?.stopPropagation();
              togglePastPriceVisibility();
            }}
          >
            <View tw="w-8 h-4 rounded-sm border-2 border-green-primary bg-green-transparency" />
            <Text
              tw={cn('text-base text-zinc-500 text-center', !isPastPriceVisible && 'line-through')}
            >
              {t('Dashboard.MarketPrice.Trend.pastLabel')}
            </Text>
          </Touchable>
          <Touchable
            tw="flex flex-row items-center space-x-2 px-1"
            rippleColor={paperTheme.colors.backdrop}
            onPress={(evt) => {
              evt?.stopPropagation();
              toggleForecastVisibility();
            }}
          >
            <View tw="w-8 h-4 rounded-sm border-2 border-yellow-500 bg-yellow-100" />
            <Text
              tw={cn('text-base text-zinc-500 text-center', !isForecastVisible && 'line-through')}
            >
              {t('Dashboard.MarketPrice.Trend.forecastLabel')}
            </Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
}
