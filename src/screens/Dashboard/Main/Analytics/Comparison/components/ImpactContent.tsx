import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { DataTable, Icon } from 'react-native-paper';
import { useComparisonData } from '../store';
import { SectionAccordion } from '../../components/SectionAccordion';
import { getMetricValue } from '../../utils/getMetricValue';

type Section = 'occupancy' | 'foodLoss' | 'revenue' | 'revenuePerRoom' | 'co2' | 'surveys';

type TableProps = {
  header: string;
  items: Array<{
    coolingUnitName: string;
    value: number;
  }>;
  total: number;
};

type ExtendedTableProps = {
  column1: string;
  column2: string;
  fourColumnsVersion?: boolean;
  items: Array<{
    coolingUnitName: string;
    column1: number | string;
    column2: number | string;
  }>;
  total: number;
};

export function ImpactContent() {
  const { t } = useTranslationUtils();
  const { impactData, coolingUnitData, configData } = useComparisonData();

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

  const foodLoss = useMemo(() => {
    const from = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercLoss) || 0;
    const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercFoodlossEvolution) || 0;
    return {
      from,
      to,
      total: from - to,
    };
  }, [impactData]);

  const revenue = useMemo(() => {
    const from =
      getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution) || 0;
    const to =
      getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution2) || 0;
    return {
      from,
      to,
      total: from - to,
    };
  }, [impactData]);

  const co2 = useMemo(() => {
    const from = impactData?.co2Metrics?.[0]?.['co2Crops']?.co2From || 0;
    const to = impactData?.co2Metrics?.[0]?.['co2Crops']?.co2To || 0;
    return {
      from,
      to,
      total: from - to,
    };
  }, [impactData]);

  const surveyPercentage = useMemo(() => {
    const percentage =
      (getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys) /
        getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom)) *
      100;
    return Number.isNaN(percentage) ? 0 : percentage.toFixed(2);
  }, [impactData]);

  return (
    <View tw="w-full my-2">
      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'occupancy'}
        setExpanded={() => expandTab('occupancy')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.occupancyLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.impactTab.occupancy')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: coolingUnitData?.averageRoomOccupancy ?? 0,
              },
            ]}
            total={coolingUnitData?.averageRoomOccupancy ?? 0}
          />
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'foodLoss'}
        setExpanded={() => expandTab('foodLoss')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.foodLossLabel')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.impactTab.changePercentage')}
            column2={t('Dashboard.Analytics.comparisonTab.impactTab.foodLossLevels')}
            fourColumnsVersion
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: `${foodLoss.total.toFixed(2)}%`,
                column2: `${foodLoss.from.toFixed(2)}% to ${foodLoss.to.toFixed(2)}%`,
              },
            ]}
            total={1} // TODO: fix
          />
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'revenue'}
        setExpanded={() => expandTab('revenue')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.revenueLabel')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.impactTab.changePercentage')}
            column2={t('Dashboard.Analytics.comparisonTab.impactTab.revenueLevels')}
            fourColumnsVersion
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: `${revenue.total.toFixed(2)}%`,
                column2: `${revenue.from.toFixed(2)}% to ${revenue.to.toFixed(2)}%`,
              },
            ]}
            total={1} // TODO: fix
          />
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'revenuePerRoom'}
        setExpanded={() => expandTab('revenuePerRoom')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.revenuePerRoomLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.impactTab.revenueLevels')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: getMetricValue(impactData?.impactMetrics?.[0].avgMonthlyFarmerRevenue) ?? 0,
              },
            ]}
            total={getMetricValue(impactData?.impactMetrics?.[0].avgMonthlyFarmerRevenue) ?? 0}
          />
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'co2'}
        setExpanded={() => expandTab('co2')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.co2Label')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.impactTab.changePercentage')}
            column2={t('Dashboard.Analytics.comparisonTab.impactTab.co2EmissionsLabel')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: `${co2.total.toFixed(2)}%`,
                column2: `${co2.from.toFixed(2)}% to ${co2.to.toFixed(2)}%`,
              },
            ]}
            total={1} // TODO: fix
          />
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'surveys'}
        setExpanded={() => expandTab('surveys')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.surveysAmountLabel')}
        content={
          <ExtendedTable
            column1={t('Dashboard.Analytics.comparisonTab.impactTab.completePercentage')}
            column2={t('Dashboard.Analytics.impact')}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                column1: surveyPercentage,
                column2: `${getMetricValue(impactData?.impactMetrics?.[0].numPostHarvestSurveys)} / ${getMetricValue(impactData?.impactMetrics?.[0].possiblePostCheckoutSurveyRoom)}`,
              },
            ]}
            total={1} // TODO: fix
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
          <Text variant="TextMedium" tw="text-white text-base">
            {header}
          </Text>
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

function ExtendedTable({ items, column1, column2, total, fourColumnsVersion }: ExtendedTableProps) {
  const { t } = useTranslationUtils();

  return (
    <DataTable tw="py-4 px-2">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14">
        <DataTable.Cell>
          <Text variant="TextMedium" tw="text-white text-base">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[25%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column1}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[25%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column2}
          </Text>
        </DataTable.Cell>
        {fourColumnsVersion && <DataTable.Cell tw="w-[25%]">{''}</DataTable.Cell>}
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white" key={`${item.coolingUnitName}-${index}`}>
            <DataTable.Cell tw={fourColumnsVersion ? 'border-r border-gray-200' : ''}>
              <Text tw="text-base flex-wrap" numberOfLines={2}>
                {item.coolingUnitName}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell tw={fourColumnsVersion ? 'border-r border-gray-200' : ''}>
              <Text tw="text-base flex-wrap pl-1" numberOfLines={2}>
                {item.column1}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell tw={fourColumnsVersion ? 'border-r border-gray-200' : ''}>
              <Text tw="text-base flex-wrap pl-1" numberOfLines={2}>
                {item.column2}
              </Text>
            </DataTable.Cell>
            {fourColumnsVersion && (
              <DataTable.Cell tw="pl-2">
                <Icon source="equal" size={25} />
              </DataTable.Cell>
            )}
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
