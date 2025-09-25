import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';

type TableProps = {
  header: string;
  items: Array<{
    coolingUnitName: string;
    value: [string, string]; // [checkIn, checkOut]
  }>;
  total: number;
};

export type TableData = {
  column1: React.ReactNode;
  column2: React.ReactNode;
};

type ExtendedTableProps = {
  column1: string;
  column2: string;
  items: Array<
    {
      coolingUnitName: string;
    } & TableData
  >;
  total: number;
};

export function Table({ items, header, total }: TableProps) {
  const { t } = useTranslationUtils();

  return (
    <DataTable tw="py-4 px-2 w-full min-w-full">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14 space-x-4 min-w-full">
        <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
          <Text variant="TextMedium" tw="text-white text-base" numberOfLines={2}>
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="max-w-[70%] min-w-[70%]">
          <View tw="px-2">
            <Text variant="TextMedium" tw="text-white text-base text-center">
              {header}
            </Text>
            <View tw="flex flex-row justify-between w-full">
              <Text variant="TextMedium" tw="text-white text-base text-center">
                {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn')}
              </Text>
              <Text variant="TextMedium" tw="text-white text-base text-center">
                {' '}
                |{' '}
              </Text>
              <Text variant="TextMedium" tw="text-white text-base text-center">
                {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut')}
              </Text>
            </View>
          </View>
        </DataTable.Cell>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        <FlashList
          data={items}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `analytics-${item.coolingUnitName}`}
          estimatedItemSize={56}
          renderItem={({ item }) => {
            const checkInValue = item.value?.[0] || '';
            const checkOutValue = item.value?.[1] || '';

            const maxLength = Math.max(checkInValue.length, checkOutValue.length);
            const paddedCheckIn = checkInValue.padEnd(maxLength, ' ');
            const paddedCheckOut = checkOutValue.padEnd(maxLength, ' ');

            return (
              <DataTable.Row tw="bg-white space-x-4">
                <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
                  <Text tw="text-wrap" numberOfLines={3}>
                    {item.coolingUnitName}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell tw="max-w-[70%] min-w-[70%]">
                  <View tw="flex flex-row justify-between items-center w-full h-full px-4">
                    <Text variant="TextMedium" tw="text-base text-center">
                      {paddedCheckIn}
                    </Text>
                    <Text variant="TextMedium" tw="text-base text-center">
                      {' '}
                      |{' '}
                    </Text>
                    <Text variant="TextMedium" tw="text-base text-center">
                      {paddedCheckOut}
                    </Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
        />

        <DataTable.Row tw="bg-white rounded-b-lg">
          <DataTable.Cell>
            {total} {t('Dashboard.Analytics.comparisonTab.total')}
          </DataTable.Cell>
        </DataTable.Row>
      </SkiaShadow>
    </DataTable>
  );
}

export function ExtendedTable({ items, column1, column2, total }: ExtendedTableProps) {
  const { t } = useTranslationUtils();

  return (
    <DataTable tw="py-4 px-2 min-w-full">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14 space-x-4 min-w-full">
        <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
          <Text variant="TextMedium" tw="text-white text-base text-center">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="max-w-[15%] min-w-[15%]">
          <Text tw="flex-wrap text-base text-white text-center">{column1}</Text>
        </DataTable.Cell>
        <DataTable.Cell tw="max-w-[55%] min-w-[55%]">
          <Text tw="flex-wrap text-base text-white text-center w-[90%]" numberOfLines={2}>
            {column2}
          </Text>
        </DataTable.Cell>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        <FlashList
          data={items}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, itemIdx) => `${item.coolingUnitName}-${itemIdx}`}
          estimatedItemSize={56}
          renderItem={({ item }) => (
            <DataTable.Row tw="bg-white space-x-4">
              <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
                <Text tw="text-wrap" numberOfLines={3}>
                  {item.coolingUnitName}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell tw="max-w-[15%] min-w-[15%]">{item.column1}</DataTable.Cell>
              <DataTable.Cell tw="max-w-[55%] min-w-[55%]">{item.column2}</DataTable.Cell>
            </DataTable.Row>
          )}
        />

        <DataTable.Row tw="bg-white rounded-b-lg">
          <DataTable.Cell>
            {total} {t('Dashboard.Analytics.comparisonTab.total')}
          </DataTable.Cell>
        </DataTable.Row>
      </SkiaShadow>
    </DataTable>
  );
}
