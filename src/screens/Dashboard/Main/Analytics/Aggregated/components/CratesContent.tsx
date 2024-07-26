import React, { useMemo } from 'react';
import { View } from 'react-native';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import { useAggregatedData } from '../store';

type SectionProps = {
  title: string;
  checkedIn: number;
  checkedOut: number;
};

export function CratesContent() {
  const { t } = useTranslationUtils();
  const { coolingUnitData } = useAggregatedData();

  const crates = useMemo(() => {
    return {
      checkedIn: coolingUnitData?.checkInCratesCrop ?? 0,
      checkedOut: coolingUnitData?.checkOutCratesCrop ?? 0,
    };
  }, [coolingUnitData]);

  const quantity = useMemo(() => {
    return {
      checkedIn: coolingUnitData?.checkInKgCrop ?? 0,
      checkedOut: coolingUnitData?.checkOutKgCrop ?? 0,
    };
  }, []);

  const operations = useMemo(() => {
    return {
      checkedIn: coolingUnitData?.roomCratesIn ?? 0,
      checkedOut: coolingUnitData?.roomCratesOut ?? 0,
    };
  }, [coolingUnitData]);

  const co2 = useMemo(() => {
    return coolingUnitData?.totCo2 ?? 0;
  }, [coolingUnitData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="items-center">
      <Section
        title={t('Dashboard.Analytics.totalCratesLabel')}
        checkedIn={crates.checkedIn}
        checkedOut={crates.checkedOut}
      />

      <Section
        title={t('Dashboard.Analytics.totalQuantityLabel')}
        checkedIn={quantity.checkedIn}
        checkedOut={quantity.checkedOut}
      />

      <Section
        title={t('Dashboard.Analytics.totalOperations')}
        checkedIn={operations.checkedIn}
        checkedOut={operations.checkedOut}
      />

      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-2 my-2">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.Analytics.aggregatedTab.totalCo2Label')}
        </Text>
        <Text variant="TextBold" tw="text-lg font-bold">
          {co2}
        </Text>
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
