import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { DataTable } from 'react-native-paper';
import { useComparisonData } from '../store';
import { SectionAccordion } from './SectionAccordion';

type Section =
  | 'crates'
  | 'quantity'
  | 'operations'
  | 'checkedInCropDistribution'
  | 'checkedOutCropDistribution'
  | 'checkedInKgDistribution'
  | 'checkedOutKgDistribution'
  | 'co2';

type TableProps = {
  header: string;
  items: Array<{
    coolingUnitName: string;
    value: string;
  }>;
  total: number;
};

type ExtendedTableProps = {
  column1: string;
  column2: string;
  items: Array<{
    coolingUnitName: string;
    column1: number;
    column2: number;
  }>;
  total: number;
};

export function CratesContent() {
  const { t } = useTranslationUtils();
  const { coolingUnitData, configData } = useComparisonData();

  const [expanded, setExpanded] = useState<Section | undefined>();

  const expandTab = useCallback(
    (tab: Section) => {
      if (tab === expanded) {
        setExpanded(undefined);
        return;
      }

      setExpanded(tab);
    },
    [expanded]
  );

  return (
    <View tw="w-full my-2">
      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'crates'}
        setExpanded={() => expandTab('crates')}
        title={t('Dashboard.Analytics.totalCratesLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.cratesTab.crates')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${coolingUnitData?.checkInCratesCrop} | ${coolingUnitData?.checkOutCratesCrop}`,
              },
            ]}
            total={
              (coolingUnitData?.checkInCratesCrop ?? 0) + (coolingUnitData?.checkOutCratesCrop ?? 0)
            }
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'quantity'}
        setExpanded={() => expandTab('quantity')}
        title={t('Dashboard.Analytics.totalQuantityLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.cratesTab.kg')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${coolingUnitData?.checkInKgCrop} | ${coolingUnitData?.checkOutKgCrop}`,
              },
            ]}
            total={(coolingUnitData?.checkInKgCrop ?? 0) + (coolingUnitData?.checkOutKgCrop ?? 0)}
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'operations'}
        setExpanded={() => expandTab('operations')}
        title={t('Dashboard.Analytics.totalOperations')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.cratesTab.operations')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${coolingUnitData?.roomCratesIn} | ${coolingUnitData?.roomCratesOut}`,
              },
            ]}
            total={(coolingUnitData?.roomCratesIn ?? 0) + (coolingUnitData?.roomCratesOut ?? 0)}
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'checkedInCropDistribution'}
        setExpanded={() => expandTab('checkedInCropDistribution')}
        title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInCropDistribution')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.cratesTab.crates')}
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkInCropDistribution')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: coolingUnitData?.roomCratesIn ?? 0,
                column2: coolingUnitData?.checkInCratesCrop ?? 0,
              },
            ]}
            total={coolingUnitData?.roomCratesIn ?? 0} // TODO: confirm data
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'checkedOutCropDistribution'}
        setExpanded={() => expandTab('checkedOutCropDistribution')}
        title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.cratesTab.crates')}
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkOutCropDistribution')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: coolingUnitData?.roomCratesOut ?? 0,
                column2: coolingUnitData?.checkOutCratesCrop ?? 0,
              },
            ]}
            total={coolingUnitData?.roomCratesOut ?? 0} // TODO: confirm data
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'checkedInKgDistribution'}
        setExpanded={() => expandTab('checkedInKgDistribution')}
        title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.cratesTab.kg')}
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkInCropDistribution')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: coolingUnitData?.roomKgIn ?? 0,
                column2: coolingUnitData?.checkInKgCrop ?? 0,
              },
            ]}
            total={coolingUnitData?.roomKgIn ?? 0} // TODO: confirm data
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'checkedOutKgDistribution'}
        setExpanded={() => expandTab('checkedOutKgDistribution')}
        title={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutKgDistribution')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.cratesTab.kg')}
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkOutCropDistribution')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: coolingUnitData?.roomKgOut ?? 0,
                column2: coolingUnitData?.checkOutKgCrop ?? 0,
              },
            ]}
            total={coolingUnitData?.roomKgOut ?? 0} // TODO: confirm data
          />
        }
      />

      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'co2'}
        setExpanded={() => expandTab('co2')}
        title={t('Dashboard.Analytics.comparisonTab.cratesTab.co2')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.cratesTab.co2EmissionsLabel')}
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.co2DistributionLabel')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: coolingUnitData?.totCo2 ?? 0,
                column2: coolingUnitData?.co2Crops ?? 0,
              },
            ]}
            total={coolingUnitData?.totCo2 ?? 0} // TODO: confirm data
          />
        }
      />
    </View>
  );
}

function Table({ items, header, total }: TableProps) {
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

function ExtendedTable({ items, column1, column2, total }: ExtendedTableProps) {
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
          <DataTable.Row tw="bg-white" key={`${item.coolingUnitName}-${index}`}>
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
