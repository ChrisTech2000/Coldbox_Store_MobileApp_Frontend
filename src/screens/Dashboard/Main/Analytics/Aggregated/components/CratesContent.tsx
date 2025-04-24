import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { sortAndMapData } from '../../utils';
import { generateSecondColumnContent } from '../../utils/generateSecondColumnContent';
import { useAggregatedData } from '../store';
import { sumCropValues } from '../utils';

type SectionProps = {
  title: string;
  checkedIn: number;
  checkedOut: number;
};
export function CratesContent() {
  const { t } = useTranslationUtils();
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
  }, []);

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
      tw="w-full mt-2"
      contentContainerStyle="items-center pb-20"
      showsVerticalScrollIndicator={false}
    >
      <Section
        title={`${t('Dashboard.Analytics.totalCratesLabel')}:`}
        checkedIn={crates.checkedIn}
        checkedOut={crates.checkedOut}
      />

      <Section
        title={`${t('Dashboard.Analytics.totalQuantityLabel')}:`}
        checkedIn={quantity.checkedIn}
        checkedOut={quantity.checkedOut}
      />

      <Section
        title={`${t('Dashboard.Analytics.totalOperations')}:`}
        checkedIn={operations.checkedIn}
        checkedOut={operations.checkedOut}
      />

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.tabsShared.totalCo2Label')}
        </Text>
        <Text variant="TextBold" tw="text-base font-bold">
          {co2.toFixed(2)} {t('Dashboard.Analytics.comparisonTab.cratesTab.co2Kg')}
        </Text>
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInCropDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkInCratesCrop ?? {})),
          crops,
          cropsTranslations,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkOutCratesCrop ?? {})),
          crops,
          cropsTranslations,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkInKgCrop ?? {})),
          crops,
          cropsTranslations,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkOutKgCrop ?? {})),
          crops,
          cropsTranslations,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.co2')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.co2Crops ?? {})),
          crops,
          cropsTranslations,
          true,
          t('Dashboard.Analytics.comparisonTab.cratesTab.co2Kg')
        )}
      </View>
    </ScrollView>
  );
}

function Section({ title, checkedIn, checkedOut }: SectionProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
      <Text variant="TextMedium" tw="text-base">
        {title}
      </Text>
      <Text variant="TextBold" tw="text-base font-bold">
        {t('Dashboard.Analytics.checkedInLabel', { amount: checkedIn })}
      </Text>
      <Text variant="TextBold" tw="text-base font-bold">
        {t('Dashboard.Analytics.checkedOutLabel', { amount: checkedOut })}
      </Text>
    </View>
  );
}
