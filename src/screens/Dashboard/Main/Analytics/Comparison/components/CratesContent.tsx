import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { ScrollView } from '#ui/components/ScrollView';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { GetAllCropsResponse } from '#types/api.responses';
import { useManagementStore } from '#stores/management';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { SectionAccordion } from '../../components/SectionAccordion';
import { sortAndMapData } from '../../utils';
import { generateSecondColumnContent } from '../../utils/generateSecondColumnContent';
import { useComparisonData } from '../store';
import { sortData } from '../utils';
import { ESortingOptions } from './SortMenu';

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
    value: number[];
  }>;
  total: number;
  empty: boolean;
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
  empty: boolean;
};

export function CratesContent({ sorting }: { sorting: ESortingOptions }) {
  const { t } = useTranslationUtils();

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

  const { coolingUnitData, configData } = useComparisonData((store) => ({
    coolingUnitData: store.coolingUnitData,
    configData: store.configData,
  }));

  const [expanded, setExpanded] = useState<Section | undefined>();

  const expandTab = useCallback(
    (tab: Section) => {
      setExpanded(expanded === tab ? undefined : tab);
    },
    [expanded]
  );

  const noDataAvailable = useMemo(() => {
    // eslint-disable-next-line
    // @ts-ignore
    return Object.values(coolingUnitData ?? {}).every((value) => value === 0);
  }, [coolingUnitData]);

  const totalCratesData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const checkInCratesCrop = coolingUnitData?.roomCratesIn?.[i] ?? 0;
      const checkOutCratesCrop = coolingUnitData?.roomCratesOut?.[i] ?? 0;
      const sum = checkInCratesCrop + checkOutCratesCrop;

      return {
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        value: [checkInCratesCrop, checkOutCratesCrop],
        sum,
      };
    }).filter((item) => item.coolingUnitName);

    return sortData(data, sorting);
  }, [coolingUnitData, sorting, configData]);

  const totalKgData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const checkIn = coolingUnitData?.roomKgIn?.[i] ?? 0;
      const checkOut = coolingUnitData?.roomKgOut?.[i] ?? 0;
      const sum = checkIn + checkOut;

      return {
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        value: [checkIn, checkOut],
        sum,
      };
    }).filter((item) => item.coolingUnitName);

    return sortData(data, sorting);
  }, [coolingUnitData, sorting, configData]);

  const operationsData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const checkIn = coolingUnitData?.roomOpsIn?.[i] ?? 0;
      const checkOut = coolingUnitData?.roomOpsOut?.[i] ?? 0;
      const sum = checkIn + checkOut;

      return {
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        value: [checkIn, checkOut],
        sum,
      };
    }).filter((item) => item.coolingUnitName);

    return sortData(data, sorting);
  }, [coolingUnitData, sorting, configData]);

  const distributionCo2Data = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = [];

    for (let i = 0; i < coolingUnitsLength; i++) {
      const sortedData = sortAndMapData(coolingUnitData?.co2Crops?.[i] ?? {});
      data.push({
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        column1: (
          <View tw="space-y-1 my-1 items-center">
            {sortedData.map(({ val, index }) => (
              <Text key={`co2-${index}`} variant="TextMedium">
                {val.toFixed(2)}
              </Text>
            ))}
          </View>
        ),
        column2: (
          <View tw="space-y-1 my-1">
            {generateSecondColumnContent(sortedData, crops, cropsTranslations)}
          </View>
        ),
        sum: sortedData.reduce((acc, current) => (acc += current.val), 0),
      });
    }

    return sortData(
      data.filter((item) => item.coolingUnitName),
      sorting
    );
  }, [coolingUnitData, crops, sorting, configData, cropsTranslations]);

  const generateDistributionData = useCallback(
    (
      dataKey: 'checkInCratesCrop' | 'checkOutCratesCrop' | 'checkInKgCrop' | 'checkOutKgCrop',
      crops: GetAllCropsResponse[],
      sorting: ESortingOptions
    ) => {
      const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
      const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
        const sortedData = sortAndMapData(coolingUnitData?.[dataKey]?.[i] ?? {});

        return {
          coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
          column1: (
            <View tw="space-y-1 h-full">
              {sortedData.map(({ val, index }) => (
                <Text key={`${dataKey}-${index}`} tw="text-sm" variant="TextMedium">
                  {val}
                </Text>
              ))}
            </View>
          ),
          column2: (
            <View tw="space-y-1 my-1 h-full w-full pr-1">
              {generateSecondColumnContent(sortedData, crops, cropsTranslations)}
            </View>
          ),
          sum: sortedData.reduce((acc, current) => acc + current.val, 0),
        };
      }).filter((item) => item.coolingUnitName);

      return sortData(data, sorting);
    },
    [coolingUnitData, sorting, configData, cropsTranslations]
  );

  const distributionCratesIn = useMemo(
    () => generateDistributionData('checkInCratesCrop', crops, sorting),
    [coolingUnitData, crops, sorting]
  );
  const distributionCratesOut = useMemo(
    () => generateDistributionData('checkOutCratesCrop', crops, sorting),
    [coolingUnitData, crops, sorting]
  );
  const distributionKgIn = useMemo(
    () => generateDistributionData('checkInKgCrop', crops, sorting),
    [coolingUnitData, crops, sorting]
  );
  const distributionKgOut = useMemo(
    () => generateDistributionData('checkOutKgCrop', crops, sorting),
    [coolingUnitData, crops, sorting]
  );

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="pb-24" showsVerticalScrollIndicator={false}>
      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'crates'}
        setExpanded={() => expandTab('crates')}
        title={t('Dashboard.Analytics.totalCratesLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.cratesTab.crates')}
            items={totalCratesData}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
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
            items={totalKgData}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
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
            items={operationsData}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
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
            items={distributionCratesIn}
            empty={noDataAvailable}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
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
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution')}
            items={distributionCratesOut}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
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
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedInKgDistribution')}
            items={distributionKgIn}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
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
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutKgDistribution')}
            items={distributionKgOut}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
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
            items={distributionCo2Data}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
            empty={noDataAvailable}
          />
        }
      />
    </ScrollView>
  );
}

function Table({ items, header, total, empty }: TableProps) {
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
        {empty ? (
          <React.Fragment>
            <DataTable.Row tw="bg-white">
              <DataTable.Cell>{t('Dashboard.Analytics.emptyState')}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row tw="bg-white rounded-b-lg">
              <DataTable.Cell>0 {t('Dashboard.Analytics.comparisonTab.total')}</DataTable.Cell>
            </DataTable.Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {items.map((item, index) => {
              const value0 = item.value[0].toString();
              const value1 = item.value[1].toString();

              const paddedValue1 =
                value1.length < value0.length ? value1.padEnd(value0.length, ' ') : value1;

              const paddedValue0 =
                value1.length > value0.length ? value0.padEnd(value1.length, ' ') : value0;

              return (
                <DataTable.Row tw="bg-white space-x-4" key={`${item.coolingUnitName}-${index}`}>
                  <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
                    <Text tw="text-wrap" numberOfLines={3}>
                      {item.coolingUnitName}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell tw="max-w-[70%] min-w-[70%]">
                    <View tw="flex flex-row justify-between items-center w-full h-full px-4">
                      <Text variant="TextMedium" tw="text-base text-center">
                        {paddedValue0}
                      </Text>
                      <Text variant="TextMedium" tw="text-base text-center">
                        {' '}
                        |{' '}
                      </Text>
                      <Text variant="TextMedium" tw="text-base text-center">
                        {paddedValue1}
                      </Text>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Row tw="bg-white rounded-b-lg">
              <DataTable.Cell>
                {total} {t('Dashboard.Analytics.comparisonTab.total')}
              </DataTable.Cell>
            </DataTable.Row>
          </React.Fragment>
        )}
      </SkiaShadow>
    </DataTable>
  );
}

function ExtendedTable({ items, column1, column2, total, empty }: ExtendedTableProps) {
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
        {empty ? (
          <React.Fragment>
            <DataTable.Row tw="bg-white">
              <DataTable.Cell>{t('Dashboard.Analytics.emptyState')}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row tw="bg-white rounded-b-lg">
              <DataTable.Cell>0 {t('Dashboard.Analytics.comparisonTab.total')}</DataTable.Cell>
            </DataTable.Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {items.map((item, index) => (
              <DataTable.Row tw="bg-white space-x-4" key={`${item.coolingUnitName}-${index}`}>
                <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
                  <Text tw="text-wrap" numberOfLines={3}>
                    {item.coolingUnitName}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell tw="max-w-[15%] min-w-[15%]">{item.column1}</DataTable.Cell>
                <DataTable.Cell tw="max-w-[55%] min-w-[55%]">{item.column2}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Row tw="bg-white rounded-b-lg">
              <DataTable.Cell>
                {total} {t('Dashboard.Analytics.comparisonTab.total')}
              </DataTable.Cell>
            </DataTable.Row>
          </React.Fragment>
        )}
      </SkiaShadow>
    </DataTable>
  );
}
