import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { DataTable, Icon } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';

import { SectionAccordion } from '../../components/SectionAccordion';
import { getMetricValue, getVariationValue, type Variation } from '../../utils';
import { useComparisonData } from '../store';

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

export function ImpactContent() {
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

  const getFoodLoss = useCallback(
    (index: number) => {
      const from =
        getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselinePercLossMonth, index) || 0;
      const to = getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercLoss, index) || 0;

      return {
        from,
        to,
        total:
          getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyPercFoodlossEvolution, index) ||
          0,
        variation: getVariationValue(from, to),
      };
    },
    [impactData]
  );

  const getRevenue = useCallback(
    (index: number) => {
      const from =
        getMetricValue(impactData?.impactMetrics?.[0]?.avgBaselineFarmerRevenueMonth, index) || 0;
      const to =
        getMetricValue(impactData?.impactMetrics?.[0]?.avgMonthlyFarmerRevenue, index) || 0;
      return {
        from,
        to,
        total:
          getMetricValue(
            impactData?.impactMetrics?.[0]?.avgMonthlyPercRevenueIncreaseEvolution,
            index
          ) || 0,
        variation: getVariationValue(from, to),
      };
    },
    [impactData]
  );

  const getCo2 = useCallback(
    (index: number) => {
      const from = impactData?.co2Metrics?.[index]?.co2Crops?.co2From || 0;
      const to = impactData?.co2Metrics?.[index]?.co2Crops?.co2To || 0;
      return {
        from,
        to,
        total: ((to - from) / (from || 1)) * 100,
        variation: getVariationValue(from, to),
      };
    },
    [impactData]
  );

  const getSurveyPercentage = useCallback(
    (index: number) => {
      const percentage =
        (getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys, index) /
          getMetricValue(impactData?.impactMetrics?.[0]?.possiblePostCheckoutSurveyRoom, index)) *
        100;
      return Number.isNaN(percentage) ? 0 : percentage.toFixed(2);
    },
    [impactData]
  );

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
            items={
              configData?.coolingUnits.map((unit, index) => ({
                coolingUnitName: unit.name,
                value: `${(coolingUnitData?.averageRoomOccupancy?.[index] ?? 0).toFixed(2)}%`,
              })) ?? []
            }
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { total, from, to, variation } = getFoodLoss(index);
                return {
                  coolingUnitName: unit.name,
                  column1: `${total.toFixed(2)}%`,
                  column2: `${from.toFixed(2)}% to ${to.toFixed(2)}%`,
                  column3: variation,
                  negative: true,
                };
              }) ?? []
            }
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { total, from, to, variation } = getRevenue(index);
                return {
                  coolingUnitName: unit.name,
                  column1: `${total.toFixed(2)}%`,
                  column2: `${from.toFixed(2)} to ${to.toFixed(2)}`,
                  column3: variation,
                };
              }) ?? []
            }
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
            items={
              configData?.coolingUnits.map((unit, index) => ({
                coolingUnitName: unit.name,
                value: (coolingUnitData?.roomRevenue?.[index] ?? 0).toLocaleString('en-US', {
                  style: 'currency',
                  currency: company?.currency,
                }),
              })) ?? []
            }
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
            items={
              configData?.coolingUnits.map((unit, index) => {
                const { total, from, to, variation } = getCo2(index);
                return {
                  coolingUnitName: unit.name,
                  column1: `${total.toFixed(2)}%`,
                  column2: `${from.toFixed(2)} to ${to.toFixed(2)}`,
                  column3: variation,
                };
              }) ?? []
            }
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
            items={
              configData?.coolingUnits.map((unit, index) => ({
                coolingUnitName: unit.name,
                column1: `${getSurveyPercentage(index)}%`,
                column2: `${getMetricValue(impactData?.impactMetrics?.[0]?.numPostHarvestSurveys, index) ?? 0} / ${getMetricValue(impactData?.impactMetrics?.[0].possiblePostCheckoutSurveyRoom, index) ?? 0}`,
              })) ?? []
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
  const colors = useTailwindColors();

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
  const colors = useTailwindColors();

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
                {item.column3 === 'equal' && <Icon source="equal" size={25} />}
                {item.column3 === 'decrease' && (
                  <Icon
                    source="chevron-double-down"
                    size={30}
                    color={item.negative ? colors.red[500] : colors.green.primary}
                  />
                )}
                {item.column3 === 'increase' && (
                  <Icon
                    source="chevron-double-up"
                    size={30}
                    color={item.negative ? colors.red[500] : colors.green.primary}
                  />
                )}
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
