import React, { useCallback, useMemo, useState } from 'react';
import { DataTable, Icon } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';

import { SectionAccordion } from '../../components/SectionAccordion';
import { getMetricName, getMetricValue, type Variation } from '../../utils';
import { useComparisonData } from '../store';
import { sortData } from '../utils';
import { ESortingOptions } from './SortMenu';

type Section = 'occupancy' | 'foodLoss' | 'revenue' | 'revenuePerRoom' | 'co2' | 'surveys';

type TableProps = {
  header: string;
  items: Array<{
    coolingUnitName: string;
    value: number | string;
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
    column3?: Variation;
    negative?: boolean;
  }>;
  total: number;
};

export function ImpactContent({ sorting }: { sorting: ESortingOptions }) {
  const { t } = useTranslationUtils();
  const { impactData, coolingUnitData, configData } = useComparisonData();
  const { company } = useManagementStore();

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

  const occupancyData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      return {
        coolingUnitName:
          getMetricName(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
        value: `${(coolingUnitData?.averageRoomOccupancy?.[i] ?? 0).toFixed(2)}%`,
        sum: coolingUnitData?.averageRoomOccupancy?.[i] ?? 0,
      };
    });

    return sortData(
      data.filter((item) => item.coolingUnitName),
      sorting
    );
  }, [impactData, sorting, configData]);

  const foodLossData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const from = getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselinePercLossMonth, i) || 0;
      const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercLoss, i) || 0;
      const sum =
        getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercFoodlossEvolution, i) || 0;

      return {
        column1: `${sum.toFixed(2)}%`,
        column2: `${from.toFixed(2)}% to ${to.toFixed(2)}%`,
        column3: sum === 0 ? 'equal' : sum < 0 ? 'decrease' : ('increase' as Variation),
        negative: true,
        coolingUnitName:
          getMetricName(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
        sum,
      };
    });

    return sortData(data, sorting);
  }, [impactData, sorting, configData]);

  const revenueData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const from =
        getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) || 0;
      const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue, i) || 0;
      const sum =
        getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution, i) ||
        0;

      return {
        coolingUnitName:
          getMetricName(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
        column1: `${sum.toFixed(2)}%`,
        column2: `${from.toFixed(2)} to ${to.toFixed(2)}`,
        column3: sum === 0 ? 'equal' : sum < 0 ? 'decrease' : ('increase' as Variation),
        sum,
      };
    });

    return sortData(data, sorting);
  }, [impactData, sorting, configData]);

  const revenueRoomData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      return {
        coolingUnitName:
          getMetricName(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
        value: (coolingUnitData?.roomRevenue?.[i] ?? 0).toLocaleString('en-US', {
          style: 'currency',
          currency: company?.currency,
        }),
        sum: coolingUnitData?.roomRevenue?.[i] ?? 0,
      };
    });

    return sortData(data, sorting);
  }, [impactData, sorting, configData, company]);

  const co2Data = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const from = impactData?.co2Metrics?.[i]?.co2Crops?.co2From || 0;
      const to = impactData?.co2Metrics?.[i]?.co2Crops?.co2To || 0;
      const sum = ((to - from) / (from || 1)) * 100;

      return {
        coolingUnitName:
          getMetricName(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
        column1: `${sum.toFixed(2)}%`,
        column2: `${from.toFixed(2)} to ${to.toFixed(2)}`,
        column3: sum === 0 ? 'equal' : sum < 0 ? 'decrease' : ('increase' as Variation),
        negative: true,
        sum,
      };
    });

    return sortData(data, sorting);
  }, [impactData, sorting, configData]);

  const surveyPercentageData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;

    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const percentage =
        (getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys, i) /
          getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom, i)) *
        100;

      return {
        coolingUnitName:
          getMetricName(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, i) ?? 0,
        column1: `${Number.isNaN(percentage) ? 0 : percentage.toFixed(2)}%`,
        column2: `${getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys, i) ?? 0} / ${getMetricValue(impactData?.impactMetrics?.[0].possiblePostCheckoutSurveyRoom, i) ?? 0}`,
        sum: Number.isNaN(percentage) ? 0 : percentage,
      };
    });

    return sortData(data, sorting);
  }, [impactData, sorting, configData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="pb-24" showsVerticalScrollIndicator={false}>
      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'occupancy'}
        setExpanded={() => expandTab('occupancy')}
        title={t('Dashboard.Analytics.comparisonTab.impactTab.occupancyLabel')}
        content={
          <Table
            header={t('Dashboard.Analytics.comparisonTab.impactTab.occupancy')}
            items={occupancyData}
            total={configData?.coolingUnits.length ?? 0}
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
            items={foodLossData}
            total={configData?.coolingUnits.length ?? 0}
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
            items={revenueData}
            total={configData?.coolingUnits.length ?? 0}
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
            items={revenueRoomData}
            total={configData?.coolingUnits.length ?? 0}
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
            items={co2Data}
            fourColumnsVersion
            total={configData?.coolingUnits.length ?? 0}
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
            items={surveyPercentageData}
            total={configData?.coolingUnits.length ?? 0}
          />
        }
      />
    </ScrollView>
  );
}

function Table({ items, header, total }: TableProps) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();

  return (
    <DataTable tw="py-4 px-2 min-w-full">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14">
        <DataTable.Title tw="max-w-[50%] min-w-[50%]">
          <Text variant="TextMedium" tw="text-white text-base">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Title>
        <DataTable.Title tw="max-w-[50%] min-w-[50%]">
          <Text variant="TextMedium" tw="text-white text-base">
            {header}
          </Text>
        </DataTable.Title>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white" key={`${item.coolingUnitName}-${index}`}>
            <DataTable.Cell tw="max-w-[50%] min-w-[50%]">{item.coolingUnitName}</DataTable.Cell>
            <DataTable.Cell tw="max-w-[50%] min-w-[50%]">{item.value}</DataTable.Cell>
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
  const colors = useTailwindColors();

  return (
    <DataTable tw="py-4 px-2 min-w-full">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14">
        <DataTable.Cell
          tw={fourColumnsVersion ? 'max-w-[30%] min-w-[30%]' : 'max-w-[35%] min-w-[35%]'}
        >
          <Text variant="TextMedium" tw="text-white text-base">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell
          tw={fourColumnsVersion ? 'max-w-[25%] min-w-[25%]' : 'max-w-[35%] min-w-[35%]'}
        >
          <Text tw="flex-wrap text-base text-white" numberOfLines={3}>
            {column1}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell
          tw={fourColumnsVersion ? 'max-w-[35%] min-w-[35%]' : 'max-w-[30%] min-w-[30%]'}
        >
          <Text tw="flex-wrap text-base text-white" numberOfLines={3}>
            {column2}
          </Text>
        </DataTable.Cell>
        {fourColumnsVersion && <DataTable.Cell tw="max-w-[10%] min-w-[10%]">{''}</DataTable.Cell>}
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white" key={`${item.coolingUnitName}-${index}`}>
            <DataTable.Cell
              tw={
                fourColumnsVersion
                  ? 'border-r border-gray-200 max-w-[30%] min-w-[30%]'
                  : 'max-w-[35%] min-w-[35%]'
              }
            >
              <Text tw="text-base flex-wrap" numberOfLines={3}>
                {item.coolingUnitName}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell
              tw={
                fourColumnsVersion
                  ? 'border-r border-gray-200 max-w-[25%] min-w-[25%]'
                  : 'max-w-[35%] min-w-[35%]'
              }
            >
              <Text tw="text-base flex-wrap pl-1" numberOfLines={3}>
                {item.column1}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell
              tw={
                fourColumnsVersion
                  ? 'border-r border-gray-200 max-w-[35%] min-w-[35%]'
                  : 'max-w-[30%] min-w-[30%]'
              }
            >
              <Text tw="text-base flex-wrap pl-1" numberOfLines={3}>
                {item.column2}
              </Text>
            </DataTable.Cell>
            {fourColumnsVersion && (
              <DataTable.Cell tw="pl-2 max-w-[10%] min-w-[10%]">
                {item.column3 === 'equal' ? (
                  <Icon source="equal" size={25} />
                ) : item.column3 === 'decrease' ? (
                  <Icon
                    source="chevron-double-down"
                    size={30}
                    color={item.negative ? colors.green.primary : colors.red[500]}
                  />
                ) : item.column3 === 'increase' ? (
                  <Icon
                    source="chevron-double-up"
                    size={30}
                    color={item.negative ? colors.red[500] : colors.green.primary}
                  />
                ) : null}
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
