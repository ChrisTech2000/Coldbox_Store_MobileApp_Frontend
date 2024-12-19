import React, { useMemo } from 'react';
import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles } from '#types/global';

import GenericFilter, { useCoolingUnitStore } from '../components/GenericFilter';

function CoolingUnitsCratesInfo() {
  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));

  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

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
    if (!unit) return [[], 0];

    const sortedCommodityInfos = [...unit.commodityInfos].sort(
      (a, b) => b.percentage - a.percentage
    );

    return [sortedCommodityInfos, unit.commodityTotal.totalCrates];
  }, [selectedCoolingUnit, data]);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="pt-5">
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
        <DataTable style={styles.dataTable}>
          <FlatList
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            ListHeaderComponent={
              <DataTable.Header tw="space-x-1">
                <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.commodity')}</DataTable.Title>
                <DataTable.Title>
                  {t('Dashboard.CoolingUnitsCratesInfo.percentage')}
                </DataTable.Title>
                <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.weight')}</DataTable.Title>
                <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.crates')}</DataTable.Title>
                <DataTable.Title>
                  {t('Dashboard.CoolingUnitsCratesInfo.optimalTemp')}
                </DataTable.Title>
              </DataTable.Header>
            }
            data={commodityInfos}
            keyExtractor={(item) => `data-table-row-${item.commodity}`}
            renderItem={({ item }) => (
              <DataTable.Row tw="space-x-1">
                <DataTable.Cell>{item.commodity}</DataTable.Cell>
                <DataTable.Cell>{item.percentage}%</DataTable.Cell>
                <DataTable.Cell>{item.combinedWeight}kg</DataTable.Cell>
                <DataTable.Cell>{item.cratesNumber}</DataTable.Cell>
                <DataTable.Cell>{item.optimalStorageTemperature}</DataTable.Cell>
              </DataTable.Row>
            )}
            refreshControl={
              <RefreshControl refreshing={isValidating} onRefresh={async () => await refetch()} />
            }
          />
        </DataTable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dataTable: {
    marginTop: 20, // equivalent to "mt-5"
    width: Dimensions.get('window').width,
    paddingBottom: 40, // equivalent to "pb-10"
  },
});

export default withSafeArea(
  withErrorBoundary(CoolingUnitsCratesInfo, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
