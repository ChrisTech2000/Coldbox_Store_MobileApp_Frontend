import { currencies as _currencies } from 'currencies.json';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';

import { useCompanyData } from '../Company/store';

type SectionProps = {
  title: string;
  from: React.ReactNode;
  to: React.ReactNode;
};

export function ImpactContent() {
  const { t } = useTranslationUtils();
  const { company } = useManagementStore();
  const { impactData } = useCompanyData();

  const foodLoss = useMemo(() => {
    return {
      from: impactData?.impactMetrics?.avgMonthlyPercLoss || 0,
      to: impactData?.impactMetrics?.avgMonthlyPercFoodlossEvolution || 0,
    };
  }, [impactData]);

  const revenue = useMemo(() => {
    const currency = _currencies.find((c) => c.code === company?.currency)?.symbol ?? '';

    return {
      from: `${currency}${(impactData?.impactMetrics?.avgMonthlyPercRevenueIncreaseEvolution || 0).toFixed(2)}`,
      to: `${currency}${(impactData?.impactMetrics?.avgMonthlyPercRevenueIncreaseEvolution2 || 0).toFixed(2)}`,
    };
  }, [impactData, company]);

  const co2 = useMemo(() => {
    return {
      from: (impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From || 0).toFixed(2),
      to: (impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To || 0).toFixed(2),
    };
  }, [impactData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="items-center">
      <View tw="w-full">
        <Section
          title={t('Dashboard.Analytics.companyTab.impactTab.foodLossLabel')}
          from={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {foodLoss.from}
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
                {foodLoss.to}
              </Text>
              <Text variant="TextMedium" tw="text-lg text-purple-500 font-bold">
                %
              </Text>
            </View>
          }
        />

        <Section
          title={t('Dashboard.Analytics.companyTab.impactTab.revenueLabel')}
          from={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {revenue.from}
              </Text>
            </View>
          }
          to={
            <View tw="flex flex-row">
              <Text variant="TextMedium" tw="text-lg font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.to')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-lg font-bold">
                {revenue.to}
              </Text>
            </View>
          }
        />

        <Section
          title={t('Dashboard.Analytics.companyTab.impactTab.co2Label')}
          from={
            <View tw="space-y-1 items-center">
              <Text variant="TextMedium" tw="text-gray-700">
                {t('Dashboard.Analytics.companyTab.impactTab.co2Description')}
              </Text>
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
        />

        <View tw="w-full bg-violet-100 p-2 items-center rounded-lg space-y-1 my-2">
          <Text variant="TextMedium" tw="text-lg text-center">
            {t('Dashboard.Analytics.companyTab.impactTab.surveysAmountLabel')}
          </Text>

          <View tw="flex flex-row items-center space-x-6">
            <View tw="flex flex-row items-end">
              <Text variant="TextMedium" tw="text-3xl font-bold">
                {impactData?.impactMetrics.numPostHarvestSurveys}
              </Text>
              <Text variant="TextMedium" tw="text-xl">
                /{impactData?.impactMetrics.possiblePostCheckoutSurveyRoom}
              </Text>
            </View>
            <Text variant="TextMedium" tw="text-4xl font-bold text-purple-500">
              (
              {(
                ((impactData?.impactMetrics?.numPostHarvestSurveys || 0) /
                  (impactData?.impactMetrics?.possiblePostCheckoutSurveyRoom || 1)) *
                100
              ).toFixed(0)}
              %)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function Section({ title, from, to }: SectionProps) {
  const colors = useTailwindColors();

  return (
    <View tw="w-full bg-violet-100 p-2 items-center rounded-lg space-y-1 my-2">
      <Text variant="TextMedium" tw="text-lg">
        {title}
      </Text>

      <Icon source="equal" size={40} />

      {from}
      <Icon source="menu-down" size={40} color={colors.gray[500]} />
      {to}
    </View>
  );
}
