import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import { StoreApi, UseBoundStore } from 'zustand';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { ImpactData } from '#types/global';

import { getMetricValue } from '../utils/getMetricValue';

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
  const { company } = useManagementStore();
  const { impactData } = useStore();

  const foodLoss = useMemo(() => {
    const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercLoss) || 0;
    const from = getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselinePercLossMonth) || 0;
    return {
      from,
      to,
      evolution: ((to - from) / from) * 100,
    };
  }, [impactData]);

  const revenueChange = useMemo(() => {
    const from = getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth);
    const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue);
    return {
      from: from.toLocaleString('en-US', {
        style: 'currency',
        currency: company?.currency,
      }),
      to: to.toLocaleString('en-US', {
        style: 'currency',
        currency: company?.currency,
      }),
      evolution: ((to - from) / from) * 100,
    };
  }, [impactData, company]);

  const co2 = useMemo(() => {
    const from = impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From || 0;
    const to = impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To || 0;
    return {
      from: from.toFixed(2),
      to: to.toFixed(2),
      evolution: to - from,
    };
  }, [impactData]);

  const surveyPercentage = useMemo(() => {
    const percentage =
      (getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys) /
        getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)) *
      100;
    return Number.isNaN(percentage) ? 0 : percentage.toFixed(2);
  }, [impactData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="items-center">
      {type === 'aggregated' && (
        <View tw="w-full bg-violet-100 px-2 py-1 items-center rounded-lg space-y-3 my-2">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel')}
          </Text>
          <Text variant="HeadingRegular" tw="text-blue-800">
            {t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
              amount: occupancy,
            })}
          </Text>
        </View>
      )}
      <View tw="w-full">
        <ImpactSection
          title={t('Dashboard.Analytics.companyTab.impactTab.foodLossLabel')}
          from={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {foodLoss.from.toFixed(2)}
              </Text>
              <Text variant="TextMedium" tw="text-lg text-purple-500 font-bold">
                %
              </Text>
            </View>
          }
          to={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.to')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {foodLoss.to.toFixed(2)}
              </Text>
              <Text variant="TextMedium" tw="text-lg text-purple-500 font-bold">
                %
              </Text>
            </View>
          }
          change={
            foodLoss.to === foodLoss.from ? (
              <Icon source="equal" size={40} />
            ) : foodLoss.to < foodLoss.from ? (
              <DownChange
                value={`${foodLoss.evolution.toFixed(2)}%`}
                message={t('Dashboard.Analytics.farmersAnalytics.decreaseInFoodLoss')}
              />
            ) : (
              <UpChange
                value={`${foodLoss.evolution.toFixed(2)}%`}
                message={t('Dashboard.Analytics.farmersAnalytics.increaseInFoodLoss')}
              />
            )
          }
        />

        <ImpactSection
          title={t('Dashboard.Analytics.companyTab.impactTab.revenueLabel')}
          from={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {revenueChange.from}
              </Text>
            </View>
          }
          to={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.to')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {revenueChange.to}
              </Text>
            </View>
          }
          change={
            foodLoss.to === foodLoss.from ? (
              <Icon source="equal" size={40} />
            ) : revenueChange.to < revenueChange.from ? (
              <DownChange
                value={`${revenueChange.evolution.toFixed(2)}%`}
                message={t('Dashboard.Analytics.farmersAnalytics.decreaseInRevenue')}
                negative
              />
            ) : (
              <UpChange
                value={`${revenueChange.evolution.toFixed(2)}%`}
                message={t('Dashboard.Analytics.farmersAnalytics.increaseInRevenue')}
                positive
              />
            )
          }
        />

        {type === 'aggregated' && (
          <View tw="w-full bg-violet-100 px-2 py-1 items-center rounded-lg space-y-3 my-2">
            <Text variant="TextMedium" tw="text-lg">
              {t('Dashboard.Analytics.tabsShared.roomRevenue')}
            </Text>
            <Text variant="HeadingRegular" tw="text-blue-800">
              {revenue?.toLocaleString('en-US', {
                style: 'currency',
                currency: company?.currency,
              })}
            </Text>
          </View>
        )}

        <ImpactSection
          title={t('Dashboard.Analytics.companyTab.impactTab.co2Label')}
          from={
            <View tw="space-y-1 items-center">
              <Text variant="TextMedium" tw="text-lg text-purple-500 text-center">
                <Text variant="TextMedium" tw="text-lg font-bold text-center">
                  {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
                </Text>
                <Text variant="TextMedium" tw="text-lg font-bold text-center">
                  {co2.from}{' '}
                </Text>
                {t('Dashboard.Analytics.companyTab.impactTab.co2WithoutCooling')}
              </Text>
            </View>
          }
          to={
            <Text variant="TextMedium" tw="text-lg text-purple-500 text-center">
              <Text variant="TextMedium" tw="text-lg font-bold text-center">
                {t('Dashboard.Analytics.companyTab.impactTab.to')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold text-center">
                {co2.to}{' '}
              </Text>
              {t('Dashboard.Analytics.companyTab.impactTab.co2WithCooling')}
            </Text>
          }
          change={
            co2.to === co2.from ? (
              <Icon source="equal" size={40} />
            ) : co2.to < co2.from ? (
              <DownChange
                value={`${co2.evolution.toFixed(2)}Kg`}
                message={t('Dashboard.Analytics.companyTab.impactTab.co2Decrease')}
              />
            ) : (
              <UpChange
                value={`${co2.evolution.toFixed(2)}Kg`}
                message={t('Dashboard.Analytics.companyTab.impactTab.co2Increase')}
              />
            )
          }
        />

        <View tw="w-full bg-violet-100 p-2 items-center rounded-lg space-y-1 my-2">
          <Text variant="TextMedium" tw="text-lg text-center">
            {t('Dashboard.Analytics.companyTab.impactTab.surveysAmountLabel')}
          </Text>

          <View tw="flex flex-row items-center space-x-6">
            <View tw="flex flex-row items-end">
              <Text variant="TextMedium" tw="text-3xl font-bold">
                {getMetricValue(impactData?.impactMetrics?.[0].numPostHarvestSurveys)}
              </Text>
              <Text variant="TextMedium" tw="text-xl">
                /{getMetricValue(impactData?.impactMetrics?.[0].possiblePostCheckoutSurveyRoom)}
              </Text>
            </View>
            <Text variant="TextMedium" tw="text-4xl font-bold text-purple-500">
              ({surveyPercentage}%)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function ImpactSection({ title, from, to, change }: SectionProps) {
  const colors = useTailwindColors();

  return (
    <View tw="w-full bg-violet-100 px-2 pt-4 pb-3 items-center rounded-lg space-y-1 my-2">
      <Text variant="TextMedium" tw="text-lg">
        {title}
      </Text>

      {change}

      {from}
      <Icon source="menu-down" size={40} color={colors.gray[500]} />
      {to}
    </View>
  );
}

export function DownChange({
  value,
  message,
  negative,
}: {
  value: string;
  message: string;
  negative?: boolean;
}) {
  const colors = useTailwindColors();

  return (
    <View tw="space-y-3 items-center my-2">
      <View tw="flex flex-row space-x-2 items-center">
        <Icon
          source="chevron-double-down"
          size={30}
          color={negative ? colors.red[500] : colors.green.primary}
        />
        <Text variant="HeadingRegular" tw={negative ? 'text-red-500' : 'text-green-primary'}>
          {value}
        </Text>
      </View>
      <Text variant="TextMedium" tw="text-base text-center">
        {message}
      </Text>
    </View>
  );
}

export function UpChange({
  value,
  message,
  positive,
}: {
  value: string;
  message: string;
  positive?: boolean;
}) {
  const colors = useTailwindColors();

  return (
    <View tw="space-y-3 items-center my-2">
      <View tw="flex flex-row space-x-2 items-center">
        <Icon
          source="chevron-double-up"
          size={30}
          color={positive ? colors.green.primary : colors.red[500]}
        />
        <Text variant="HeadingRegular" tw={positive ? 'text-green-primary' : 'text-red-500'}>
          {value}
        </Text>
      </View>
      <Text variant="TextMedium" tw="text-base text-center">
        {message}
      </Text>
    </View>
  );
}
