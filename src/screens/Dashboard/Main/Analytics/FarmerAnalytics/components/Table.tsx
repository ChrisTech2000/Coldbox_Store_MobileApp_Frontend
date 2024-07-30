import React from 'react';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';
import { View } from 'react-native';

type TableProps = {
  header: string;
  items: Array<{
    coolingUnitName: string;
    value: string;
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
    <DataTable tw="py-4 px-2">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14">
        <DataTable.Title>
          <Text variant="TextMedium" tw="text-white text-base">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Title>
        <DataTable.Title>
          <View>
            <Text variant="TextMedium" tw="text-white text-base">
              {header}
            </Text>
            <View tw="flex flex-row w-full">
              <Text variant="TextMedium" tw="text-white text-base">
                {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedIn')} |{' '}
              </Text>
              <Text variant="TextMedium" tw="text-white text-base">
                {t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOut')}
              </Text>
            </View>
          </View>
        </DataTable.Title>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white" key={`${item.coolingUnitName}-${index}`}>
            <DataTable.Cell>{item.coolingUnitName}</DataTable.Cell>
            <DataTable.Cell>{item.value}</DataTable.Cell>
          </DataTable.Row>
        ))}

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
    <DataTable tw="py-4 px-2">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14">
        <DataTable.Cell>
          <Text variant="TextMedium" tw="text-white text-base">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[33%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column1}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[33%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column2}
          </Text>
        </DataTable.Cell>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white items-center" key={`${item.coolingUnitName}-${index}`}>
            <DataTable.Cell>{item.coolingUnitName}</DataTable.Cell>
            <DataTable.Cell>{item.column1}</DataTable.Cell>
            <DataTable.Cell>{item.column2}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Row tw="bg-white rounded-b-lg">
          <DataTable.Cell>
            {total} {t('Dashboard.Analytics.comparisonTab.total')}
          </DataTable.Cell>
        </DataTable.Row>
      </SkiaShadow>
    </DataTable>
  );
}
