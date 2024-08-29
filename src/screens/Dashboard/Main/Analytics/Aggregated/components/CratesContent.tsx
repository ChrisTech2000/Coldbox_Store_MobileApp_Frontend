import React, { useMemo } from 'react';
import { View } from 'react-native';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';

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

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    defaultData: [],
  });

  const crates = useMemo(() => {
    return {
      checkedIn:
        Object.values(coolingUnitData?.checkInCratesCrop?.['0'] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
      checkedOut:
        Object.values(coolingUnitData?.checkOutCratesCrop?.['0'] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
    };
  }, [coolingUnitData]);

  const quantity = useMemo(() => {
    return {
      checkedIn:
        Object.values(coolingUnitData?.checkInKgCrop?.['0'] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
      checkedOut:
        Object.values(coolingUnitData?.checkOutKgCrop?.['0'] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ) ?? 0,
    };
  }, []);

  const operations = useMemo(() => {
    return {
      checkedIn: coolingUnitData?.roomOpsIn?.['0'] ?? 0,
      checkedOut: coolingUnitData?.roomOpsOut?.['0'] ?? 0,
    };
  }, [coolingUnitData]);

  const co2 = useMemo(() => {
    return coolingUnitData?.totCo2?.['0'] ?? 0;
  }, [coolingUnitData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="items-center">
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
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.tabsShared.totalCo2Label')}
        </Text>
        <Text variant="TextBold" tw="text-lg font-bold">
          {co2}
        </Text>
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInCropDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkInCratesCrop ?? {})),
          crops,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkOutCratesCrop ?? {})),
          crops,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkInKgCrop ?? {})),
          crops,
          true
        )}
      </View>

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
        </Text>
        {generateSecondColumnContent(
          sortAndMapData(sumCropValues(coolingUnitData?.checkOutKgCrop ?? {})),
          crops,
          true
        )}
      </View>
    </ScrollView>
  );
}

function Section({ title, checkedIn, checkedOut }: SectionProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
      <Text variant="TextMedium" tw="text-lg">
        {title}
      </Text>
      <Text variant="TextBold" tw="text-lg font-bold">
        {t('Dashboard.Analytics.checkedInLabel', { amount: checkedIn })}
      </Text>
      <Text variant="TextBold" tw="text-lg font-bold">
        {t('Dashboard.Analytics.checkedOutLabel', { amount: checkedOut })}
      </Text>
    </View>
  );
}
