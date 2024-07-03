import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { useTranslationUtils } from '#i18n/utils';
import { ScrollView } from '#ui/components/ScrollView';

import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';
import SemiCircleChart from './components/SemiCircleChart';
import WeekBarChart, { type WeekBarChartDatum } from './components/WeekBarChart';

type MockedCoolingUnit = { name: string };

const MOCKED_COOLING_UNITS = [
  { name: 'CU098765' },
  { name: 'CU38496' },
  { name: 'unit_1' },
  { name: 'unit_2' },
] satisfies Array<MockedCoolingUnit>;
const MOCKED_MAX_CAPACITY = 80;
const MOCKED_DATUMS = [
  { amount: 60, timestamp: '2024-06-24T16:14:08.564Z' },
  { amount: 50, timestamp: '2024-06-25T16:14:08.564Z' },
  { amount: 85, timestamp: '2024-06-26T16:14:08.564Z' },
  { amount: 21, timestamp: '2024-06-27T16:14:08.564Z' },
  { amount: 30, timestamp: '2024-06-28T16:14:08.564Z' },
  { amount: 12, timestamp: '2024-06-29T16:14:08.564Z' },
  { amount: 33, timestamp: '2024-06-30T16:14:08.564Z' },
] satisfies Array<WeekBarChartDatum>;

export const useCoolingUnitStore = createSelectStore<MockedCoolingUnit>();

export default function CoolingUnitsPlanner() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<WeekBarChartDatum>(MOCKED_DATUMS[0]);

  const coolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  return (
    <ScrollView
      contentContainerStyle="mt-5 items-center pb-10"
      showsVerticalScrollIndicator={false}
    >
      <SelectWithStore<MockedCoolingUnit>
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

      <Text tw="self-start mt-5 mb-4 ml-4" variant="titleLarge">
        {t('Dashboard.CoolingUnitsPlanner.occupancy')}
      </Text>

      <SemiCircleChart
        maxCapacity={MOCKED_MAX_CAPACITY}
        currentAmount={selectedColumn.amount}
        currentDate={selectedColumn.timestamp}
      />

      <Text tw="self-start mb-5 mt-10 ml-4" variant="titleMedium">
        {t('Dashboard.CoolingUnitsPlanner.week')}
      </Text>

      <WeekBarChart
        maxCapacity={MOCKED_MAX_CAPACITY}
        datums={MOCKED_DATUMS}
        selectedDatum={selectedColumn}
        onSelect={setSelectedColumn}
      />
    </ScrollView>
  );
}
