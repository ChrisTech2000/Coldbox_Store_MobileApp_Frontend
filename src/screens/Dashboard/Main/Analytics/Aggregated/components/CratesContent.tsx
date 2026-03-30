import React, { useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { sortAndMapData } from '../../utils';
import { generateSecondColumnContent } from '../../utils/generateSecondColumnContent';
import { useAggregatedData } from '../store';
import { sumCropValues } from '../utils';

export function CratesContent() {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const { coolingUnitData } = useAggregatedData();

  const crops = useDashboardStore((store) => store.allCrops ?? []);
  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));

  const locale = LanguageManager.read();

  const cropsTranslations = useMemo(() => {
    const record: Record<number, string> = {};
    if (!crops.length) return record;

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    for (const crop of crops) {
      if (typeof record?.[crop.id] === 'string') continue;
      record[crop.id] = find(translationMap, {
        name: crop.name,
        country: companyCountry,
        locale,
      });
    }

    return record;
  }, [crops, companyCountry, locale]);

  const crates = useMemo(() => {
    return {
      checkedIn:
        Object.values(coolingUnitData?.roomCratesIn ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
      checkedOut:
        Object.values(coolingUnitData?.roomCratesOut ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
    };
  }, [coolingUnitData]);

  const quantity = useMemo(() => {
    return {
      checkedIn:
        Object.values(coolingUnitData?.roomKgIn ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
      checkedOut:
        Object.values(coolingUnitData?.roomKgOut ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
    };
  }, [coolingUnitData]);

  const operations = useMemo(() => {
    return {
      checkedIn:
        Object.values(coolingUnitData?.roomOpsIn ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
      checkedOut:
        Object.values(coolingUnitData?.roomOpsOut ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
    };
  }, [coolingUnitData]);

  const co2 = useMemo(() => {
    return (
      Object.values(coolingUnitData?.totCo2 ?? {}).reduce((acc, current) => (acc += current), 0) ??
      0
    );
  }, [coolingUnitData]);

  return (
    <ScrollView
      tw="w-full mt-4"
      contentContainerStyle="items-center pb-24"
      showsVerticalScrollIndicator={false}
    >
      <View tw="flex-row flex-wrap justify-between w-full px-1">
        <Animated.View entering={FadeInUp.delay(100)} tw="w-[48%] mb-3">
          <MetricCard
            title={t('Dashboard.Analytics.totalCratesLabel')}
            icon="package-variant-closed"
            colors={[colors.blue[400], colors.blue[600]]}
            checkedIn={crates.checkedIn}
            checkedOut={crates.checkedOut}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200)} tw="w-[48%] mb-3">
          <MetricCard
            title={t('Dashboard.Analytics.totalQuantityLabel')}
            icon="weight-kilogram"
            colors={[colors.emerald[400], colors.emerald[600]]}
            checkedIn={quantity.checkedIn}
            checkedOut={quantity.checkedOut}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300)} tw="w-full mb-4">
          <MetricCard
            title={t('Dashboard.Analytics.totalOperations')}
            icon="vector-combine"
            colors={[colors.amber[400], colors.amber[600]]}
            checkedIn={operations.checkedIn}
            checkedOut={operations.checkedOut}
            horizontal
          />
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(400)} tw="w-full">
        <LinearGradient
          colors={[colors.indigo[500], colors.indigo[700]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 24 }}
          tw="w-full p-5 flex-row items-center space-x-4 mb-6 shadow-lg shadow-indigo-200"
        >
          <View tw="p-3 bg-white/20 rounded-2xl">
            <Icon source="leaf" size={28} color="white" />
          </View>
          <View tw="flex-1">
            <Text variant="TextSmall" tw="text-indigo-100 font-bold uppercase tracking-widest text-[10px]">
              {t('Dashboard.Analytics.tabsShared.totalCo2Label')}
            </Text>
            <Text variant="HeadlineMedium" tw="text-white font-bold">
              {co2.toFixed(2)} <Text variant="TextMedium" tw="text-indigo-100 text-sm">{t('Dashboard.Analytics.comparisonTab.cratesTab.co2Kg')}</Text>
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(500)} tw="w-full space-y-4">
        <DistributionCard
          title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInCropDistribution')}
          data={sortAndMapData(sumCropValues(coolingUnitData?.checkInCratesCrop ?? {}))}
          crops={crops}
          translations={cropsTranslations}
          accentColor={colors.blue[500]}
        />

        <DistributionCard
          title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution')}
          data={sortAndMapData(sumCropValues(coolingUnitData?.checkOutCratesCrop ?? {}))}
          crops={crops}
          translations={cropsTranslations}
          accentColor={colors.blue[400]}
        />

        <DistributionCard
          title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
          data={sortAndMapData(sumCropValues(coolingUnitData?.checkInKgCrop ?? {}))}
          crops={crops}
          translations={cropsTranslations}
          accentColor={colors.emerald[500]}
        />

        <DistributionCard
          title={t('Dashboard.Analytics.comparisonTab.cratesTab.co2')}
          data={sortAndMapData(sumCropValues(coolingUnitData?.co2Crops ?? {}))}
          crops={crops}
          translations={cropsTranslations}
          unit={t('Dashboard.Analytics.comparisonTab.cratesTab.co2Kg')}
          accentColor={colors.indigo[500]}
        />
      </Animated.View>
    </ScrollView>
  );
}

function MetricCard({ title, icon, colors, checkedIn, checkedOut, horizontal }: any) {
  const { t } = useTranslationUtils();
  return (
    <View tw="bg-white border border-gray-100 shadow-sm rounded-[24px] p-4 overflow-hidden">
      <View tw={cn('flex-row items-center space-x-3', horizontal ? 'mb-4' : 'mb-5')}>
        <View style={{ backgroundColor: `${colors[0]}15` }} tw="p-2.5 rounded-2xl">
          <Icon source={icon} size={20} color={colors[0]} />
        </View>
        <Text variant="TextSmall" tw="text-gray-400 font-bold text-[10px] uppercase tracking-wider flex-1">
          {title}
        </Text>
      </View>

      <View tw={cn('space-y-4', horizontal ? 'flex-row space-x-8 space-y-0 items-center' : '')}>
        <View tw={cn('flex-1 space-y-1', horizontal ? 'space-y-0.5' : '')}>
          <View tw="flex-row justify-between items-end">
            <Text variant="TextSmall" tw="text-gray-400 font-bold text-[9px]">IN</Text>
            <Text variant="TitleLarge" tw="text-gray-900 font-bold leading-7">{checkedIn}</Text>
          </View>
          <View tw="h-[6px] bg-gray-50 rounded-full w-full overflow-hidden mt-1">
            <LinearGradient
              colors={[colors[0], colors[1]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '100%', borderRadius: 3 }}
            />
          </View>
        </View>

        <View tw={cn('flex-1 space-y-1', horizontal ? 'space-y-0.5' : '')}>
          <View tw="flex-row justify-between items-end">
            <Text variant="TextSmall" tw="text-gray-400 font-bold text-[9px]">OUT</Text>
            <Text variant="TitleLarge" tw="text-gray-900 font-bold leading-7">{checkedOut}</Text>
          </View>
          <View tw="h-[6px] bg-gray-50 rounded-full w-full overflow-hidden mt-1">
            <View style={{ width: '100%', backgroundColor: colors[0], opacity: 0.15 }} tw="h-full rounded-full" />
          </View>
        </View>
      </View>
    </View>
  );
}

function DistributionCard({ title, data, crops, translations, unit, accentColor }: any) {
  return (
    <View tw="w-full bg-white border border-gray-100 shadow-md shadow-gray-100 rounded-[28px] p-6 mb-2">
      <View tw="flex-row items-center space-x-3 mb-5">
        <View style={{ backgroundColor: accentColor, width: 4, height: 18, borderRadius: 2 }} />
        <Text variant="TitleSmall" tw="text-gray-900 font-bold tracking-tight">
          {title}
        </Text>
      </View>
      <View tw="bg-gray-50/50 rounded-2xl p-4">
        {generateSecondColumnContent(data, crops, translations, true, unit)}
      </View>
    </View>
  );
}

