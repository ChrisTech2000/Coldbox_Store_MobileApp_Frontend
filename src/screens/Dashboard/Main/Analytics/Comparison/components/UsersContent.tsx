import startCase from 'lodash/startCase';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { SectionAccordion } from '../../components/SectionAccordion';
import { useComparisonData } from '../store';
import { sortData } from '../utils';
import { ESortingOptions } from './SortMenu';

type Section = 'users' | 'operators' | 'beneficiaries';

type TableProps = {
  header: Array<string>;
  items: Array<{
    coolingUnitName: string;
    value: string;
    sum: number;
  }>;
  total: number;
};

export function UsersContent({ sorting }: { sorting: ESortingOptions }) {
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

  const operatorsData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const fem = coolingUnitData?.roomOpFem?.[i] ?? 0;
      const male = coolingUnitData?.roomOpMa?.[i] ?? 0;
      const ot = coolingUnitData?.roomOpOt?.[i] ?? 0;

      return {
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        value: `${male} | ${fem} | ${ot}`,
        sum: coolingUnitData?.roomOp?.[i] ?? 0,
      };
    });

    return sortData(data, sorting);
  }, [coolingUnitData, sorting, configData]);

  const usersData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const fem = coolingUnitData?.roomActiveFem?.[i] ?? 0;
      const male = coolingUnitData?.roomActiveMa?.[i] ?? 0;
      const ot = coolingUnitData?.roomActiveOt?.[i] ?? 0;

      return {
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        value: `${male} | ${fem} | ${ot}`,
        sum: coolingUnitData?.roomActiveUsers?.[i] ?? 0,
      };
    });

    return sortData(data, sorting);
  }, [coolingUnitData, sorting, configData]);

  const beneficiariesData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const fem = Math.floor(coolingUnitData?.roomBeneficiariesFem?.[i] ?? 0);
      const male = Math.floor(coolingUnitData?.roomBeneficiariesMa?.[i] ?? 0);

      return {
        coolingUnitName: coolingUnitData?.unitName?.[i] ?? '',
        value: `${male} | ${fem}`,
        sum: male + fem,
      };
    });

    return sortData(data, sorting);
  }, [coolingUnitData, sorting, configData]);

  return (
    <View tw="w-full my-2">
      <SectionAccordion
        color="bg-green-transparency"
        expanded={expanded === 'operators'}
        setExpanded={() => expandTab('operators')}
        title={t('Dashboard.Analytics.comparisonTab.usersTab.operators')}
        content={
          <Table
            header={[
              t('Dashboard.Analytics.comparisonTab.usersTab.operators'),
              t('Dashboard.Analytics.comparisonTab.genderHeader'),
            ]}
            items={operatorsData}
            total={configData?.coolingUnits.length ?? 0}
          />
        }
      />

      <SectionAccordion
        color="bg-green-transparency"
        expanded={expanded === 'users'}
        setExpanded={() => expandTab('users')}
        title={t('Dashboard.Analytics.comparisonTab.usersTab.users')}
        content={
          <Table
            header={[
              t('Dashboard.Analytics.comparisonTab.usersTab.activeUsers'),
              t('Dashboard.Analytics.comparisonTab.genderHeader'),
            ]}
            items={usersData}
            total={configData?.coolingUnits.length ?? 0}
          />
        }
      />

      <SectionAccordion
        color="bg-green-transparency"
        expanded={expanded === 'beneficiaries'}
        setExpanded={() => expandTab('beneficiaries')}
        title={t('Dashboard.Analytics.comparisonTab.usersTab.beneficiaries')}
        content={
          <Table
            header={[
              t('Dashboard.Analytics.comparisonTab.usersTab.beneficiaries'),
              t('Dashboard.Analytics.comparisonTab.genderSecondaryHeader'),
            ]}
            items={beneficiariesData}
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
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-18">
        <DataTable.Cell>
          <Text variant="TextMedium" tw="text-white text-base">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <View>
            {header.map((text, index) => (
              <Text
                key={`${text}-${index}`}
                variant="TextMedium"
                tw="text-white text-base flex-wrap"
                numberOfLines={3}
              >
                {text}
              </Text>
            ))}
          </View>
        </DataTable.Cell>
        <DataTable.Cell tw="max-w-[20%]">
          <Text variant="TextMedium" tw="text-white text-base">
            {startCase(t('Dashboard.Analytics.comparisonTab.total'))}
          </Text>
        </DataTable.Cell>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white" key={`${item.coolingUnitName}-${index}`}>
            <DataTable.Cell>{item.coolingUnitName}</DataTable.Cell>
            <DataTable.Cell>{item.value}</DataTable.Cell>
            <DataTable.Cell tw="max-w-[20%]">{item.sum}</DataTable.Cell>
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
