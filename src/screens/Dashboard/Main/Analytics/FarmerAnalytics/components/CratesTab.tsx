import isArray from 'lodash/isArray';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import ColdtivateService from '#services/ColdtivateService';
import FarmerImpactService from '#services/FarmerImpactService';
import { useApiCall } from '#services/hooks/useAPiCall';

import { SectionAccordion } from '../../components/SectionAccordion';
import { useFarmerAnalyticsData } from '../store';
import { generateSecondColumnContent, sortAndMapData } from '../utils';
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
  const { configData, farmer } = useFarmerAnalyticsData();

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
      unitIds: configData?.coolingUnit.id as number,
    },
    {
      skip: !configData || !farmer,
    }
  );

  const { data: crops, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      defaultData: [],
    }
  );

  const data = useMemo(() => {
    const _data = {
      roomCratesIn: 0,
      roomCratesOut: 0,
      roomKgIn: 0,
      roomKgOut: 0,
      roomOpsIn: 0,
      roomOpsOut: 0,
      cropsCratesIn: { column1: undefined, column2: undefined } as TableData,
      cropsCratesOut: { column1: undefined, column2: undefined } as TableData,
      cropsKgIn: { column1: undefined, column2: undefined } as TableData,
      cropsKgOut: { column1: undefined, column2: undefined } as TableData,
    };

    if (!farmerImpact || !isArray(farmerImpact)) return _data;

    farmerImpact.forEach((data) => {
      if (data.checkInCratesCrop) {
        const sortedData = sortAndMapData(data.checkInCratesCrop['0']);
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
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (data.checkOutCratesCrop) {
        const sortedData = sortAndMapData(data.checkOutCratesCrop['0']);
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
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (data.checkInKgCrop) {
        const sortedData = sortAndMapData(data.checkInKgCrop['0']);
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
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      if (data.checkOutKgCrop) {
        const sortedData = sortAndMapData(data.checkOutKgCrop['0']);
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
          <View tw="space-y-1 my-1">{generateSecondColumnContent(sortedData, crops)}</View>
        );
      }

      _data.roomCratesIn += data.roomCratesIn?.['0'] ?? 0;
      _data.roomCratesOut += data.roomCratesOut?.['0'] ?? 0;
      _data.roomKgIn += data.roomKgIn?.['0'] ?? 0;
      _data.roomKgOut += data.roomKgOut?.['0'] ?? 0;
      _data.roomOpsIn += data.roomOpsIn?.['0'] ?? 0;
      _data.roomOpsOut += data.roomOpsOut?.['0'] ?? 0;
    });

    return _data;
  }, [farmerImpact, crops]);

  if (loadingFarmerImpact || isLoadingCrops) {
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
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${data.roomCratesIn} | ${data.roomCratesOut}`,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
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
                value: `${data.roomKgIn} | ${data.roomKgOut}`,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
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
                value: `${data.roomOpsIn} | ${data.roomOpsOut}`,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
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
                column1: data.cropsCratesIn.column1,
                column2: data.cropsCratesIn.column2,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
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
                column1: data.cropsCratesOut.column1,
                column2: data.cropsCratesOut.column2,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
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
                column1: data.cropsKgIn.column1,
                column2: data.cropsKgIn.column2,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
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
                column1: data.cropsKgOut.column1,
                column2: data.cropsKgOut.column2,
              },
            ]}
            total={1} // TODO: fix when getting multiple cooling units
          />
        }
      />
    </View>
  );
}
