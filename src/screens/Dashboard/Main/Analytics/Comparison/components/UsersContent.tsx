import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { DataTable } from 'react-native-paper';
import { useComparisonData } from '../store';
import { SectionAccordion } from './SectionAccordion';

type Section = 'users' | 'operators' | 'beneficiaries';

type TableProps = {
  header: Array<string>;
  items: Array<{
    coolingUnitName: string;
    value: string;
  }>;
  total: number;
};

export function UsersContent() {
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
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${coolingUnitData?.roomOpMa} | ${coolingUnitData?.roomOpFem} | ${coolingUnitData?.roomOpOt}`,
              },
            ]}
            total={coolingUnitData?.roomOp ?? 0}
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
              t('Dashboard.Analytics.comparisonTab.usersTab.users'),
              t('Dashboard.Analytics.comparisonTab.genderHeader'),
            ]}
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${coolingUnitData?.roomActiveMa} | ${coolingUnitData?.roomActiveFem} | ${coolingUnitData?.roomActiveOt}`,
              },
            ]}
            total={coolingUnitData?.roomActiveUsers ?? 0}
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
            items={[
              {
                coolingUnitName: configData?.coolingUnit.name ?? '',
                value: `${coolingUnitData?.roomBeneficiariesMa} | ${coolingUnitData?.roomBeneficiariesFem}`,
              },
            ]}
            total={coolingUnitData?.roomBeneficiaries ?? 0}
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
            {header.map((text, index) => (
              <Text key={`${text}-${index}`} variant="TextMedium" tw="text-white text-base">
                {text}
              </Text>
            ))}
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
