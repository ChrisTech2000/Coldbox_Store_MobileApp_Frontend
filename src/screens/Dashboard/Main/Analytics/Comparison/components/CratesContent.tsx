import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { GetAllCropsResponse } from '#types/api.responses';

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
    value: string;
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
  const { coolingUnitData, configData } = useComparisonData((store) => ({
    coolingUnitData: store.coolingUnitData,
    configData: store.configData,
  }));

  const [expanded, setExpanded] = useState<Section | undefined>();

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    defaultData: [],
  });

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
        value: `${checkInCratesCrop} | ${checkOutCratesCrop}`,
        sum,
      };
    });

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
        value: `${checkIn} | ${checkOut}`,
        sum,
      };
    });

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
        value: `${checkIn} | ${checkOut}`,
        sum,
      };
    });

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
        column2: <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>,
        sum: sortedData.reduce((acc, current) => (acc += current.val), 0),
      });
    }

    return sortData(data, sorting);
  }, [coolingUnitData, crops, sorting, configData]);

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
            <View tw="space-y-1 my-1 items-center">
              {sortedData.map(({ val, index }) => (
                <Text key={`${dataKey}-${index}`} variant="TextMedium">
                  {val}
                </Text>
              ))}
            </View>
          ),
          column2: (
            <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
          ),
          sum: sortedData.reduce((acc, current) => acc + current.val, 0),
        };
      });

      return sortData(data, sorting);
    },
    [coolingUnitData, sorting, configData]
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
    <View tw="w-full my-2">
      <SectionAccordion
        color="bg-gray-200"
        expanded={expanded === 'crates'}
        setExpanded={() => expandTab('crates')}
        title={t('Dashboard.Analytics.totalCratesLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.cratesTab.crates')}
            items={totalCratesData}
            total={configData?.coolingUnits.length ?? 0}
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
            total={configData?.coolingUnits.length ?? 0}
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
            total={configData?.coolingUnits.length ?? 0}
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
            column2={t('Dashboard.Analytics.comparisonTab.cratesTab.checkedOutCropDistribution')}
            items={distributionCratesOut}
            total={configData?.coolingUnits.length ?? 0}
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
            total={configData?.coolingUnits.length ?? 0}
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
            total={configData?.coolingUnits.length ?? 0}
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
            total={configData?.coolingUnits.length ?? 0}
            empty={noDataAvailable}
          />
        }
      />
    </View>
  );
}

function Table({ items, header, total, empty }: TableProps) {
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
          </React.Fragment>
        )}
      </SkiaShadow>
    </DataTable>
  );
}

function ExtendedTable({ items, column1, column2, total, empty }: ExtendedTableProps) {
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
          </React.Fragment>
        )}
      </SkiaShadow>
    </DataTable>
  );
}
