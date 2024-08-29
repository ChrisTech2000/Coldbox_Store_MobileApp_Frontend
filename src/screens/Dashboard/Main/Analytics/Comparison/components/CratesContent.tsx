import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';

import { SectionAccordion } from '../../components/SectionAccordion';
import { sortAndMapData } from '../../utils';
import { useComparisonData } from '../store';
import { generateSecondColumnContent } from '../../utils/generateSecondColumnContent';

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

type TableData = {
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

export function CratesContent() {
  const { t } = useTranslationUtils();
  const { coolingUnitData, configData } = useComparisonData();

  const [expanded, setExpanded] = useState<Section | undefined>();

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    defaultData: [],
  });

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

  const getCratesData = useCallback(
    (index: number) => {
      return {
        checkInCratesCrops: Object.values(coolingUnitData?.checkInCratesCrop?.[index] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ),
        checkOutCratesCrops: Object.values(
          coolingUnitData?.checkOutCratesCrop?.[index] ?? {}
        ).reduce((acc, current) => (acc += current), 0),
      };
    },
    [coolingUnitData]
  );

  const getQuantityData = useCallback(
    (index: number) => {
      return {
        checkIn: Object.values(coolingUnitData?.checkInKgCrop?.[index] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ),
        checkOut: Object.values(coolingUnitData?.checkOutKgCrop?.[index] ?? {}).reduce(
          (acc, current) => (acc += current),
          0
        ),
      };
    },
    [coolingUnitData]
  );

  const getDistributionData = useCallback(
    (index: number, tableName: string) => {
      const data = {
        cropsCratesIn: { column1: undefined, column2: undefined } as TableData,
        cropsCratesOut: { column1: undefined, column2: undefined } as TableData,
        cropsKgIn: { column1: undefined, column2: undefined } as TableData,
        cropsKgOut: { column1: undefined, column2: undefined } as TableData,
        co2: { column1: undefined, column2: undefined } as TableData,
      };

      if (!coolingUnitData) return data;

      if (coolingUnitData.checkInCratesCrop && tableName === 'cropsCratesIn') {
        const sortedData = sortAndMapData(coolingUnitData.checkInCratesCrop[index]);
        data.cropsCratesIn.column1 = (
          <View tw="space-y-1 my-1 items-center">
            {sortedData.map(({ val, index }) => (
              <Text key={`checkInCrates-${index}`} variant="TextMedium">
                {val}
              </Text>
            ))}
          </View>
        );
        data.cropsCratesIn.column2 = (
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (coolingUnitData.checkOutCratesCrop && tableName === 'cropsCratesOut') {
        const sortedData = sortAndMapData(coolingUnitData.checkOutCratesCrop[index]);
        data.cropsCratesOut.column1 = (
          <View tw="space-y-1 my-1 items-center">
            {sortedData.map(({ val, index }) => (
              <Text key={`checkOutCrates-${index}`} variant="TextMedium">
                {val}
              </Text>
            ))}
          </View>
        );
        data.cropsCratesOut.column2 = (
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (coolingUnitData.checkInKgCrop && tableName === 'cropsKgIn') {
        const sortedData = sortAndMapData(coolingUnitData.checkInKgCrop[index]);
        data.cropsKgIn.column1 = (
          <View tw="space-y-1 my-1 items-center">
            {sortedData.map(({ val, index }) => (
              <Text key={`checkInKg-${index}`} variant="TextMedium">
                {val}
              </Text>
            ))}
          </View>
        );
        data.cropsKgIn.column2 = (
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (coolingUnitData.checkOutKgCrop && tableName === 'cropsKgOut') {
        const sortedData = sortAndMapData(coolingUnitData.checkOutKgCrop[index]);
        data.cropsKgOut.column1 = (
          <View tw="space-y-1 my-1 items-center">
            {sortedData.map(({ val, index }) => (
              <Text key={`checkOutKg-${index}`} variant="TextMedium">
                {val}
              </Text>
            ))}
          </View>
        );
        data.cropsKgOut.column2 = (
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (coolingUnitData.co2Crops && tableName === 'co2') {
        const sortedData = sortAndMapData(coolingUnitData.co2Crops[index]);
        data.co2.column1 = (
          <View tw="space-y-1 my-1 items-center">
            {sortedData.map(({ val, index }) => (
              <Text key={`co2-${index}`} variant="TextMedium">
                {val.toFixed(2)}
              </Text>
            ))}
          </View>
        );
        data.co2.column2 = (
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      return data;
    },
    [coolingUnitData, crops]
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { checkInCratesCrops, checkOutCratesCrops } = getCratesData(index);
                return {
                  coolingUnitName: unit.name,
                  value: `${checkInCratesCrops} | ${checkOutCratesCrops}`,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { checkIn, checkOut } = getQuantityData(index);
                return {
                  coolingUnitName: unit.name,
                  value: `${checkIn} | ${checkOut}`,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                return {
                  coolingUnitName: unit.name,
                  value: `${coolingUnitData?.roomOpsIn?.[index] ?? 0} | ${coolingUnitData?.roomOpsOut?.[index] ?? 0}`,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { cropsCratesIn } = getDistributionData(index, 'cropsCratesIn');
                return {
                  coolingUnitName: unit.name,
                  column1: cropsCratesIn.column1,
                  column2: cropsCratesIn.column2,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { cropsCratesOut } = getDistributionData(index, 'cropsCratesOut');
                return {
                  coolingUnitName: unit.name,
                  column1: cropsCratesOut.column1,
                  column2: cropsCratesOut.column2,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { cropsKgIn } = getDistributionData(index, 'cropsKgIn');
                return {
                  coolingUnitName: unit.name,
                  column1: cropsKgIn.column1,
                  column2: cropsKgIn.column2,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { cropsKgOut } = getDistributionData(index, 'cropsKgOut');
                return {
                  coolingUnitName: unit.name,
                  column1: cropsKgOut.column1,
                  column2: cropsKgOut.column2,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { co2 } = getDistributionData(index, 'co2');
                return {
                  coolingUnitName: unit.name,
                  column1: co2.column1,
                  column2: co2.column2,
                };
              }) ?? []
            }
            total={configData?.coolingUnits.length ?? 0}
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
