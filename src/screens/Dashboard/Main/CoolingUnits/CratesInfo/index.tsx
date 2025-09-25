import React, { useMemo } from 'react';
import { Dimensions, RefreshControl, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles } from '#types/global';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import GenericFilter, { useCoolingUnitStore } from '../components/GenericFilter';

const SCREEN_WIDTH = Dimensions.get('window').width;

function CoolingUnitsCratesInfo() {
  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));

  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  const locale = LanguageManager.read();

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      ...(user?.role === ERoles.OPERATOR
        ? { operator: user?.id as number }
        : { company: company?.id as number }),
    },
    {
      skip:
        !user || user.role === ERoles.OPERATOR
          ? typeof company?.id === 'undefined'
          : typeof user.id === 'undefined',
      defaultData: [],
    }
  );

  const [commodityInfos, totalCrates] = useMemo(() => {
    if (!selectedCoolingUnit) return [[], 0];

    const unit = data?.find(({ id }) => id === selectedCoolingUnit.id);
    if (!unit || !unit.commodityInfos?.length) return [[], 0];

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    const sortedCommodityInfos = cloneDeep(unit.commodityInfos)
      .sort((a, b) => b.percentage - a.percentage)
      .map((info) => ({
        ...info,
        commodity: find(translationMap, {
          name: info.commodity,
          country: company?.country,
          locale,
        }),
      }));

    return [sortedCommodityInfos, unit.commodityTotal.totalCrates];
  }, [selectedCoolingUnit, data, company?.country, locale]);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 pt-5">
      <GenericFilter>
        <GenericFilter.CoolingUnits />
      </GenericFilter>

      {!totalCrates || totalCrates === 0 ? (
        <View tw="mx-2 mt-4">
          <Text tw="text-green-primary text-center">
            {t('Dashboard.CoolingUnitsCratesInfo.messages.empty')}
          </Text>
        </View>
      ) : (
        <View style={styles.dataTable}>
          <DataTable.Header tw="space-x-1 bg-zinc-50">
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.commodity')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.percentage')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.weight')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.crates')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.optimalTemp')}</DataTable.Title>
          </DataTable.Header>
          <FlashList
            showsVerticalScrollIndicator={false}
            data={commodityInfos}
            keyExtractor={(item) => item.commodity}
            estimatedItemSize={56}
            renderItem={({ item }) => (
              <DataTable.Row tw="space-x-1">
                <DataTable.Cell>
                  <Text>{item.commodity}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{item.percentage}%</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{item.combinedWeight}kg</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{item.cratesNumber}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text>{item.optimalStorageTemperature}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            )}
            refreshControl={
              <RefreshControl refreshing={isValidating} onRefresh={async () => await refetch()} />
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dataTable: {
    marginTop: 10,
    width: SCREEN_WIDTH,
    paddingBottom: 40,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    flex: 1,
  },
});

export default withSafeArea(
  withErrorBoundary(CoolingUnitsCratesInfo, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
