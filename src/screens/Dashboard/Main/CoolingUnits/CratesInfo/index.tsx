import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { useTranslationUtils } from '#i18n/utils';

import SelectWithStore from '../../components/SelectWithStore';
import { type CoolingUnitFilter, useCoolingUnitStore } from '../Planner';

const MOCKED_COOLING_UNITS = [
  { name: 'CU098765', id: 1 },
  { name: 'CU38496', id: 2 },
  { name: 'unit_1', id: 3 },
  { name: 'unit_2', id: 4 },
] satisfies Array<CoolingUnitFilter>;

const DATA = [
  {
    commodity: 'Apple',
    percentage: 22,
    weight: 150,
    crates: 6,
    optimalTemp: '-1.1°C-0°C',
  },
  {
    commodity: 'Banana',
    percentage: 18,
    weight: 125,
    crates: 5,
    optimalTemp: '13°C-15°C',
  },
  {
    commodity: 'Mango',
    percentage: 11,
    weight: 75,
    crates: 3,
    optimalTemp: '13°C',
  },
];

function CoolingUnitsCratesInfo() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const coolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  return (
    <View tw="mt-5 pb-10">
      <SelectWithStore<CoolingUnitFilter>
        datums={MOCKED_COOLING_UNITS}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        itemName={(item) => item?.name}
        useSelectStore={useCoolingUnitStore}
        label={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.label', {
          name: coolingUnit?.name ?? '',
        })}
        modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
      />

      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.commodity')}</DataTable.Title>
          <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.percentage')}</DataTable.Title>
          <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.weight')}</DataTable.Title>
          <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.crates')}</DataTable.Title>
          <DataTable.Title>{t('Dashboard.CoolingUnitsCratesInfo.optimalTemp')}</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={DATA}
          keyExtractor={(item) => `data-table-row-${item.commodity}`}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.commodity}</DataTable.Cell>
              <DataTable.Cell>{item.percentage}%</DataTable.Cell>
              <DataTable.Cell>{item.weight}kg</DataTable.Cell>
              <DataTable.Cell>{item.crates}</DataTable.Cell>
              <DataTable.Cell>{item.optimalTemp}</DataTable.Cell>
            </DataTable.Row>
          )}
          nestedScrollEnabled
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  dataTable: {
    marginTop: 20, // equivalent to "mt-5"
    width: Dimensions.get('screen').width,
  },
});

export default withSafeArea(CoolingUnitsCratesInfo);
