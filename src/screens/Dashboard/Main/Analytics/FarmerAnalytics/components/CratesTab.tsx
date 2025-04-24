import isArray from 'lodash/isArray';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import FarmerImpactService from '#services/FarmerImpactService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { SectionAccordion } from '../../components/SectionAccordion';
import { sortAndMapData } from '../../utils';
import { generateSecondColumnContent } from '../../utils/generateSecondColumnContent';
import { useFarmerAnalyticsData } from '../store';
import { ExtendedTable, Table, TableData } from './Table';

type Section =
  | 'crates'
  | 'quantity'
  | 'operations'
  | 'checkedInCropDistribution'
  | 'checkedOutCropDistribution'
  | 'checkedInKgDistribution'
  | 'checkedOutKgDistribution';

export function CratesTab() {
  const { t } = useTranslationUtils();

  const [crops, farmerCountry] = useDashboardStore((store) => [
    store.allCrops ?? [],
    store.farmerCountry,
  ]);

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
        country: farmerCountry || undefined,
        locale,
      });
    }

    return record;
  }, [crops, farmerCountry, locale]);

  const { configData, farmer } = useFarmerAnalyticsData((store) => ({
    configData: store.configData,
    farmer: store.farmer,
  }));

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

  const { data: farmerImpact, isLoading: loadingFarmerImpact } = useApiCall(
    'getFarmerImpact',
    FarmerImpactService.getFarmerImpact,
    {
      farmerId: farmer?.id as number,
      startDate: configData?.startDate as Date,
      endDate: configData?.endDate as Date,
      unitIds: configData?.coolingUnits.map((unit) => unit.id) as number[],
    },
    {
      skip: !configData || !farmer,
    }
  );

  const getDistributionData = useCallback(
    (idx: number, tableName: string) => {
      const _data = {
        cropsCratesIn: { column1: undefined, column2: undefined } as TableData,
        cropsCratesOut: { column1: undefined, column2: undefined } as TableData,
        cropsKgIn: { column1: undefined, column2: undefined } as TableData,
        cropsKgOut: { column1: undefined, column2: undefined } as TableData,
      };

      if (!farmerImpact || !isArray(farmerImpact)) return _data;

      farmerImpact.forEach((data) => {
        if (data.checkInCratesCrop && tableName === 'cropsCratesIn') {
          const sortedData = sortAndMapData(data.checkInCratesCrop[idx] ?? {});
          _data.cropsCratesIn.column1 = (
            <View tw="space-y-1 my-1 items-center">
              {sortedData.map(({ val, index }) => (
                <Text key={`checkInCrates-${index}`} variant="TextMedium">
                  {val}
                </Text>
              ))}
            </View>
          );
          _data.cropsCratesIn.column2 = (
            <View tw="space-y-1 my-1">
              {generateSecondColumnContent(sortedData, crops, cropsTranslations)}
            </View>
          );
        }

        if (data.checkOutCratesCrop && tableName === 'cropsCratesOut') {
          const sortedData = sortAndMapData(data.checkOutCratesCrop[idx] ?? {});
          _data.cropsCratesOut.column1 = (
            <View tw="space-y-1 my-1 items-center">
              {sortedData.map(({ val, index }) => (
                <Text key={`checkOutCrates-${index}`} variant="TextMedium">
                  {val}
                </Text>
              ))}
            </View>
          );
          _data.cropsCratesOut.column2 = (
            <View tw="space-y-1 my-1">
              {generateSecondColumnContent(sortedData, crops, cropsTranslations)}
            </View>
          );
        }

        if (data.checkInKgCrop && tableName === 'cropsKgIn') {
          const sortedData = sortAndMapData(data.checkInKgCrop[idx] ?? {});
          _data.cropsKgIn.column1 = (
            <View tw="space-y-1 my-1 items-center">
              {sortedData.map(({ val, index }) => (
                <Text key={`checkInKg-${index}`} variant="TextMedium">
                  {val}
                </Text>
              ))}
            </View>
          );
          _data.cropsKgIn.column2 = (
            <View tw="space-y-1 my-1">
              {generateSecondColumnContent(sortedData, crops, cropsTranslations)}
            </View>
          );
        }

        if (data.checkOutKgCrop && tableName === 'cropsKgOut') {
          const sortedData = sortAndMapData(data.checkOutKgCrop[idx] ?? {});
          _data.cropsKgOut.column1 = (
            <View tw="space-y-1 my-1 items-center">
              {sortedData.map(({ val, index }) => (
                <Text key={`checkOutKg-${index}`} variant="TextMedium">
                  {val}
                </Text>
              ))}
            </View>
          );
          _data.cropsKgOut.column2 = (
            <View tw="space-y-1 my-1">
              {generateSecondColumnContent(sortedData, crops, cropsTranslations)}
            </View>
          );
        }
      });

      return _data;
    },
    [farmerImpact, crops, cropsTranslations]
  );

  if (loadingFarmerImpact) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

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
              configData?.coolingUnits.map((unit, index) => ({
                coolingUnitName: unit.name,
                value: `${farmerImpact?.[1]?.roomCratesIn?.[index] ?? 0} | ${farmerImpact?.[0]?.roomCratesOut?.[index] ?? 0}`,
              })) ?? []
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
              configData?.coolingUnits.map((unit, index) => ({
                coolingUnitName: unit.name,
                value: `${farmerImpact?.[1]?.roomKgIn?.[index] ?? 0} | ${farmerImpact?.[0]?.roomKgOut?.[index] ?? 0}`,
              })) ?? []
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
              configData?.coolingUnits.map((unit, index) => ({
                coolingUnitName: unit.name,
                value: `${farmerImpact?.[1]?.roomOpsIn?.[index] ?? 0} | ${farmerImpact?.[0]?.roomOpsOut?.[index] ?? 0}`,
              })) ?? []
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
    </View>
  );
}
