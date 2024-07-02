import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView } from '#ui/components/ScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { paperTheme } from '#ui/lib/theme';
import { dateFmt, useTranslationUtils } from '#i18n/utils';

import SelectCoolingUnit, { type CoolingUnitMockedEntry } from '../../components/SelectCoolingUnit';
import LineChart, { type LineChartEntry } from './components/LineChart';

const DATA = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const day = date.toISOString().split('T')[0];
  const tmp = 14 + 6 * Math.random();
  return { timestamp: day, temperature: tmp };
}) satisfies Array<LineChartEntry>;

const MOCKED_COOLING_UNITS = [
  { name: 'CU098765' },
  { name: 'CU38496' },
  { name: 'unit_1' },
  { name: 'unit_2' },
] satisfies Array<CoolingUnitMockedEntry>;

function CoolingUnitsRoomConditions() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { t } = useTranslationUtils();

  return (
    <ScrollView contentContainerStyle="mt-5 pb-10" showsVerticalScrollIndicator={false}>
      <SelectCoolingUnit
        datums={MOCKED_COOLING_UNITS}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <Divider tw="w-full bg-gray-700 my-4" />

      <View tw="mx-4 space-y-4">
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
