import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import { cn } from '#ui/lib/cn';
import { StoreApi, UseBoundStore } from 'zustand';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { ImpactData } from '#types/global';

import { getMetricValue } from '../utils';

type Store = {
  impactData: ImpactData | null;
};

type ImpactContentProps<T extends Store> = {
  useStore: UseBoundStore<StoreApi<T>>;
  type?: 'aggregated' | 'company' | 'comparison';
  occupancy?: number;
  revenue?: number;
};

type SectionProps = {
  title: string;
  from: React.ReactNode;
  to: React.ReactNode;
  change: React.ReactNode;
};

export function ImpactContent<T extends Store>({
  useStore,
  type,
  occupancy,
  revenue,
}: ImpactContentProps<T>) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const { impactData } = useStore();

  const foodLoss = useMemo(() => {
    return {
      from: getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselinePercLossMonth) || 0,
      to: getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercLoss) || 0,
      evolution:
        getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercFoodlossEvolution) || 0,
    };
  }, [impactData]);

  const currencyCode = 'NGN';
  const currencySymbol = '₦';

  const formatNaira = (value: number) => {
    return `${currencySymbol}${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const revenueChange = useMemo(() => {
    const from = getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth) || 0;
    const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue) || 0;
    return {
      from: formatNaira(from),
      to: formatNaira(to),
      evolution: getMetricValue(
        impactData?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution
      ),
    };
  }, [impactData]);

  const co2 = useMemo(() => {
    const from = impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From || 0;
    const to = impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To || 0;
    return {
      from: from.toFixed(1),
      to: to.toFixed(1),
      evolution: to - from,
    };
  }, [impactData]);

  const surveyPercentage = useMemo(() => {
    const recorded = getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys);
    const total = getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom);
    if (!total || total === 0) return '0.0';
    const percentage = (recorded / total) * 100;
    return Number.isNaN(percentage) ? '0.0' : percentage.toFixed(1);
  }, [impactData]);

  return (
    <ScrollView
      tw="w-full mt-4"
      contentContainerStyle="items-center pb-24"
      showsVerticalScrollIndicator={false}
    >
      {type === 'aggregated' && (
        <View tw="w-full flex-row space-x-3 mb-3">
          <View tw="flex-1 bg-white border border-green-100 shadow-sm p-4 rounded-2xl items-center">
            <View tw="p-2 bg-green-50 rounded-lg mb-2">
              <Icon source="percent" size={20} color={colors.green[600]} />
            </View>
            <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase text-[9px] mb-1 tracking-wider">
              {t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel')}
            </Text>
            <Text variant="TitleLarge" tw="text-green-900 font-bold">
              {occupancy}%
            </Text>
          </View>

          <View tw="flex-1 bg-white border border-amber-100 shadow-sm p-4 rounded-2xl items-center">
            <View tw="p-2 bg-amber-50 rounded-lg mb-2">
              <Icon source="cash-multiple" size={20} color={colors.amber[600]} />
            </View>
            <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase text-[9px] mb-1 tracking-wider">
              {t('Dashboard.Analytics.tabsShared.roomRevenue')}
            </Text>
            <Text variant="TitleLarge" tw="text-amber-900 font-bold">
              {formatNaira(revenue || 0)}
            </Text>
          </View>
        </View>
      )}

      <View tw="w-full space-y-4">
        <ImpactSection
          title="Food Loss Prevention"
          icon="sprout"
          color={colors.green[600]}
          bgColor={colors.green[50]}
          from={`${foodLoss.from.toFixed(1)}%`}
          to={`${foodLoss.to.toFixed(1)}%`}
          change={
            foodLoss.to === foodLoss.from ? (
              null
            ) : foodLoss.evolution < 0 ? (
              <Badge value={`${(foodLoss.evolution * -1).toFixed(1)}%`} positive />
            ) : (
              <Badge value={`${foodLoss.evolution.toFixed(1)}%`} />
            )
          }
        />

        <ImpactSection
          title="Farmer Earnings"
          icon="finance"
          color={colors.amber[600]}
          bgColor={colors.amber[50]}
          from={revenueChange.from}
          to={revenueChange.to}
          change={
            revenueChange.to === revenueChange.from ? (
              null
            ) : revenueChange.evolution < 0 ? (
              <Badge value={`${(revenueChange.evolution * -1).toFixed(1)}%`} />
            ) : (
              <Badge value={`${revenueChange.evolution.toFixed(1)}%`} positive />
            )
          }
        />

        <ImpactSection
          title="Environmental Impact"
          icon="leaf"
          color={colors.emerald[600]}
          bgColor={colors.emerald[50]}
          from={`${co2.from}kg`}
          to={`${co2.to}kg`}
          change={
            co2.to === co2.from ? (
              null
            ) : co2.evolution < 0 ? (
              <Badge value={`${(co2.evolution * -1).toFixed(1)}kg`} positive />
            ) : (
              <Badge value={`${co2.evolution.toFixed(1)}kg`} />
            )
          }
        />

        <View tw="w-full bg-white border border-gray-100 shadow-sm p-5 rounded-3xl">
          <View tw="flex-row items-center justify-between mb-4">
            <View tw="flex-row items-center space-x-3">
              <View tw="p-2.5 bg-orange-50 rounded-xl">
                <Icon source="clipboard-check-outline" size={22} color={colors.orange[600]} />
              </View>
              <View>
                <Text variant="TitleSmall" tw="text-gray-900 font-black tracking-tight">
                  Farmer Success Surveys
                </Text>
                <Text variant="TextSmall" tw="text-gray-400 text-[10px] font-bold">
                  {t('Dashboard.Analytics.companyTab.impactTab.surveysAmountLabel').toUpperCase()}
                </Text>
              </View>
            </View>
            <View tw="bg-orange-500 px-3 py-1 rounded-full">
              <Text tw="text-white text-[10px] font-black">{surveyPercentage}%</Text>
            </View>
          </View>

          <View tw="h-[10px] bg-gray-50 rounded-full w-full overflow-hidden mb-4">
            <View style={{ width: `${surveyPercentage}%` as `${number}%` }} tw="h-full bg-orange-500" />
          </View>

          <View tw="flex-row justify-between items-center px-1">
            <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[10px]">Harvests Recorded</Text>
            <Text variant="TitleSmall" tw="text-gray-900 font-black">
              {getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys)}
              <Text tw="text-gray-300 font-bold"> / {getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)}</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ImpactSection({ title, from, to, change, icon, color, bgColor }: any) {
  const colors = useTailwindColors();
  return (
    <View tw="w-full bg-white border border-gray-100 shadow-sm p-5 rounded-3xl">
      <View tw="flex-row items-center justify-between mb-5">
        <View tw="flex-row items-center space-x-3">
          <View style={{ backgroundColor: bgColor }} tw="p-2.5 rounded-xl">
            <Icon source={icon} size={22} color={color} />
          </View>
          <Text variant="TitleSmall" tw="text-gray-900 font-black tracking-tight">{title}</Text>
        </View>
        {change}
      </View>

      <View tw="flex-row items-center justify-between bg-gray-50/70 rounded-2xl p-4 border border-gray-50">
        <View tw="items-start">
          <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[9px] mb-1 tracking-widest">Baseline</Text>
          <Text variant="TitleSmall" tw="text-gray-500 font-bold">{from}</Text>
        </View>

        <View tw="bg-white p-2 rounded-full border border-gray-100 shadow-sm">
          <Icon source="arrow-right" size={20} color={colors.green[500]} />
        </View>

        <View tw="items-end">
          <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[9px] mb-1 tracking-widest">Current</Text>
          <Text variant="TitleMedium" tw="text-green-900 font-black">{to}</Text>
        </View>
      </View>
    </View>
  );
}

function Badge({ value, positive, label }: { value: string; positive?: boolean; label?: string }) {
  const colors = useTailwindColors();
  return (
    <View
      tw={cn(
        'flex-row items-center px-3 py-1.5 rounded-full space-x-1.5',
        positive ? 'bg-green-100' : 'bg-red-100'
      )}
    >
      <Icon
        source={positive ? 'arrow-up-circle' : 'arrow-down-circle'}
        size={14}
        color={positive ? colors.green[700] : colors.red[700]}
      />
      <Text tw={cn('text-[10px] font-black', positive ? 'text-green-800' : 'text-red-800')}>
        {label || value}
      </Text>
    </View>
  );
}

