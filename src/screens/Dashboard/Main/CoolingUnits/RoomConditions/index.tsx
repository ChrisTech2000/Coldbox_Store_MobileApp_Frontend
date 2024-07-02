import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { paperTheme } from '#ui/lib/theme';
import { dateFmt, useTranslationUtils } from '#i18n/utils';

import { useCoolingUnitStore } from '../Planner';
import SelectWithStore from '../../components/SelectWithStore';
import LineChart, { type LineChartEntry } from './components/LineChart';

type MockedCoolingUnit = { name: string };

const MOCKED_COOLING_UNITS = [
  { name: 'CU098765' },
  { name: 'CU38496' },
  { name: 'unit_1' },
  { name: 'unit_2' },
] satisfies Array<MockedCoolingUnit>;
const DATA = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const day = date.toISOString().split('T')[0];
  const tmp = 14 + 6 * Math.random();
  return { timestamp: day, temperature: tmp };
}) satisfies Array<LineChartEntry>;

function CoolingUnitsRoomConditions() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const coolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  return (
    <ScrollView contentContainerStyle="mt-5 pb-10" showsVerticalScrollIndicator={false}>
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

      <View tw="mx-4 mt-4 space-y-4">
        <View tw="flex flex-row items-center space-x-2">
          <Icon name="snowflake" size={34} color={paperTheme.colors.primary} />
          <Text variant="TitleMedium">{t('Dashboard.CoolingUnitsRoomConditions.heading')}</Text>
        </View>

        <View tw="h-96 w-full">
          <LineChart datums={DATA} />
        </View>
      </View>

      <View tw="bg-zinc-200 py-4 mt-8 items-center space-y-3">
        <View tw="flex-row items-center space-x-4">
          <Icon name="thermometer" size={30} color={paperTheme.colors.scrim} />
          <Text variant="TitleRegular">
            {t('Dashboard.CoolingUnitsRoomConditions.temperature')}
          </Text>
          <Text variant="TitleMedium">18°C</Text>
        </View>
        <Text tw="text-zinc-500" variant="TitleSmall">
          {t('Dashboard.CoolingUnitsRoomConditions.lastUpdated', {
            date: dateFmt(new Date().toISOString(), 'E MMM dd yyyy HH:mm'),
          })}
        </Text>
        <Button mode="contained" onPress={() => undefined}>
          {t('Dashboard.CoolingUnitsRoomConditions.enterTemperature')}
        </Button>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(CoolingUnitsRoomConditions);
