import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '#ui/components/Text';
import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';
import { useCompanyData } from '../store';

type SectionProps = {
  title: string;
  checkedIn: number;
  checkedOut: number;
};

export function UtilizationContent() {
  const { t } = useTranslationUtils();
  const { companyData } = useCompanyData();

  const occupancy = useMemo(() => {
    return companyData?.compAverageRoomOccupancy?.[0] || 0;
  }, [companyData]);

  const crates = useMemo(() => {
    return {
      checkedIn: companyData?.compCratesIn?.[0] || 0,
      checkedOut: companyData?.compCratesOut?.[0] || 0,
    };
  }, [companyData]);

  const quantity = useMemo(() => {
    return {
      checkedIn: companyData?.compKgIn?.[0] || 0,
      checkedOut: companyData?.compKgOut?.[0] || 0,
    };
  }, [companyData]);

  const operations = useMemo(() => {
    return {
      checkedIn: companyData?.compOpsIn?.[0] || 0,
      checkedOut: companyData?.compOpsOut?.[0] || 0,
    };
  }, [companyData]);

  return (
    <ScrollView
      tw="w-full mt-2"
      contentContainerStyle="items-center pb-20"
      showsVerticalScrollIndicator={false}
    >
      <View tw="w-full bg-gray-200 px-2 py-1 items-center rounded-lg space-y-3 my-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel')}
        </Text>
        <Text variant="HeadingRegular" tw="text-blue-800">
          {t('Dashboard.Analytics.companyTab.utilizationTab.occupancyContent', {
            amount: occupancy,
          })}
        </Text>
      </View>

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
