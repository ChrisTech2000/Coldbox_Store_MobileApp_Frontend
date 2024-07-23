import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { ERoles } from '#types/global';
import { paperTheme } from '#ui/lib/theme';

import SelectWithStore from '../../components/SelectWithStore';
import { type CoolingUnitFilter, useCoolingUnitStore } from '../Planner';

function CoolingUnitsCratesInfo() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const coolingUnits: Array<CoolingUnitFilter> = useMemo(
    () =>
      data?.map((unit) => ({
        id: unit.id,
        name: unit.name,
      })) ?? [],
    [data]
  );

  const [commodityInfos, totalCrates] = useMemo(() => {
    if (!selectedCoolingUnit) return [[], 0];

    const unit = data?.find(({ id }) => id === selectedCoolingUnit.id);
    if (!unit) return [[], 0];

    return [unit.commodityInfos, unit.commodityTotal.totalCrates];
  }, [selectedCoolingUnit, data]);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle="mt-5 pb-10"
      refreshControl={
        <RefreshControl refreshing={isValidating} onRefresh={async () => await refetch()} />
      }
    >
      <SelectWithStore<CoolingUnitFilter>
        datums={coolingUnits}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        itemName={(item) => item?.name}
        useSelectStore={useCoolingUnitStore}
        label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
          name: selectedCoolingUnit?.name ?? '',
        })}
        modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
      />

      {!totalCrates || totalCrates === 0 ? (
        <View tw="mx-2 mt-4">
          <Text style={{ color: paperTheme.colors.primary }}>
            {t('Dashboard.CoolingUnitsCratesInfo.messages.empty')}
          </Text>
        </View>
      ) : (
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.commodity')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.percentage')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.weight')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.crates')}</DataTable.Title>
            <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.optimalTemp')}</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={commodityInfos}
            keyExtractor={(item) => `data-table-row-${item.commodity}`}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.commodity}</DataTable.Cell>
                <DataTable.Cell>{item.percentage}%</DataTable.Cell>
                <DataTable.Cell>{item.combinedWeight}kg</DataTable.Cell>
                <DataTable.Cell>{item.cratesNumber}</DataTable.Cell>
                <DataTable.Cell>{item.optimalStorageTemperature}</DataTable.Cell>
              </DataTable.Row>
            )}
            nestedScrollEnabled
          />
        </DataTable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dataTable: {
    marginTop: 20, // equivalent to "mt-5"
    width: Dimensions.get('screen').width,
  },
});

export default withSafeArea(CoolingUnitsCratesInfo);
