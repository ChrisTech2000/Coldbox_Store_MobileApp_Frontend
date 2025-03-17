import startCase from 'lodash/startCase';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import { Text } from '#ui/components/Text';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { ScrollView } from '#ui/components/ScrollView';

import { SectionAccordion } from '../../components/SectionAccordion';
import { useComparisonData } from '../store';
import { sortData } from '../utils';
import { ESortingOptions } from './SortMenu';

type Section = 'users' | 'operators' | 'beneficiaries';

type TableProps = {
  header: Array<string>;
  empty: boolean;
  items: Array<{
    coolingUnitName: string;
    value: number[];
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

  const noDataAvailable = useMemo(() => {
    // eslint-disable-next-line
    // @ts-ignore
    return Object.values(coolingUnitData ?? {}).every((value) => value === 0);
  }, [coolingUnitData]);

  const operatorsData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const fem = Math.round(coolingUnitData?.roomOpFem?.[i] ?? 0);
      const male = Math.round(coolingUnitData?.roomOpMa?.[i] ?? 0);
      const ot = Math.round(coolingUnitData?.roomOpOt?.[i] ?? 0);
      const coolingUnitName = coolingUnitData?.unitName?.[i] ?? '';

      if (!coolingUnitName) return;
      return {
        coolingUnitName,
        value: [male, fem, ot],
        sum: Math.round(coolingUnitData?.roomOp?.[i] ?? 0),
      };
    }).filter(Boolean);

    return sortData(data as TableProps['items'], sorting);
  }, [coolingUnitData, sorting, configData]);

  const usersData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const fem = Math.round(coolingUnitData?.roomActiveFem?.[i] ?? 0);
      const male = Math.round(coolingUnitData?.roomActiveMa?.[i] ?? 0);
      const ot = Math.round(coolingUnitData?.roomActiveOt?.[i] ?? 0);
      const coolingUnitName = coolingUnitData?.unitName?.[i] ?? '';

      if (!coolingUnitName) return;
      return {
        coolingUnitName,
        value: [male, fem, ot],
        sum: Math.round(coolingUnitData?.roomActiveUsers?.[i] ?? 0),
      };
    }).filter(Boolean);

    return sortData(data as TableProps['items'], sorting);
  }, [coolingUnitData, sorting, configData]);

  const beneficiariesData = useMemo(() => {
    const coolingUnitsLength = configData?.coolingUnits.length ?? 0;
    const data = Array.from({ length: coolingUnitsLength }, (_, i) => {
      const fem = Math.floor(coolingUnitData?.roomBeneficiariesFem?.[i] ?? 0);
      const male = Math.floor(coolingUnitData?.roomBeneficiariesMa?.[i] ?? 0);
      const coolingUnitName = coolingUnitData?.unitName?.[i] ?? '';

      if (!coolingUnitName) return;
      return {
        coolingUnitName,
        value: [male, fem],
        sum: male + fem,
      };
    }).filter(Boolean);

    return sortData(data as TableProps['items'], sorting);
  }, [coolingUnitData, sorting, configData]);

  return (
    <ScrollView tw="w-full mt-2" contentContainerStyle="pb-20" showsVerticalScrollIndicator={false}>
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
            empty={noDataAvailable}
            items={operatorsData}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
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
            empty={noDataAvailable}
            items={usersData}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
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
            empty={noDataAvailable}
            items={beneficiariesData}
            total={Object.values(coolingUnitData?.unitName ?? {}).length}
          />
        }
      />
    </ScrollView>
  );
}

function Table({ items, header, total, empty }: TableProps) {
  const { t } = useTranslationUtils();

  const headers = header[1].split('|');

  return (
    <DataTable tw="py-4 px-2 min-w-full">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-18 space-x-4 min-w-full">
        <DataTable.Cell tw="max-w-[30%] min-w-[30%]">
          <Text variant="TextMedium" tw="text-white text-base text-center text-wrap">
            {t('Dashboard.Analytics.comparisonTab.coolingUnit')}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="max-w-[50%] min-w-[50%]">
          <View>
            <Text variant="TextMedium" tw="text-white text-base text-center">
              {header[0]}
            </Text>
            <View tw="flex flex-row justify-between items-center w-full">
              {headers.map((text, index) => (
                <React.Fragment key={`val-${text}-${index}`}>
                  <Text
                    key={`${text}-${index}`}
                    variant="TextMedium"
                    tw="text-white text-base text-center"
                  >
                    {text}
                  </Text>
                  {index < headers.length - 1 ? (
                    <Text tw="text-wrap text-center text-white"> | </Text>
                  ) : null}
                </React.Fragment>
              ))}
            </View>
          </View>
        </DataTable.Cell>
        <DataTable.Cell tw="max-w-[20%] min-w-[20%] px-2">
          <Text variant="TextMedium" tw="text-white text-base text-center">
            {startCase(t('Dashboard.Analytics.comparisonTab.total'))}
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
                <DataTable.Cell tw="max-w-[50%] min-w-[50%]">
                  <View tw="flex flex-row justify-between items-center w-full h-full px-2">
                    {item.value.map((val, index) => (
                      <React.Fragment key={`val-${val}-${index}`}>
                        <Text tw="text-wrap text-center">{val}</Text>
                        {index < item.value.length - 1 ? (
                          <Text tw="text-wrap text-center"> | </Text>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </View>
                </DataTable.Cell>
                <DataTable.Cell tw="max-w-[20%] min-w-[20%] px-4">
                  <Text tw="text-wrap text-center">{item.sum}</Text>
                </DataTable.Cell>
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
