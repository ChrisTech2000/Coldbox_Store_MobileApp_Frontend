import React, { useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';

import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { ERoles } from '#types/global';
import { paperTheme } from '#ui/lib/theme';

import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';
import SemiCircleChart from './components/SemiCircleChart';
import WeekBarChart, { type WeekBarChartDatum } from './components/WeekBarChart';
import { weekSubsetArtisan } from './utils';

const MAX_CAPACITY = 100;

export type CoolingUnitFilter = { id: number; name: string };
export const useCoolingUnitStore = createSelectStore<CoolingUnitFilter>();

export default function CoolingUnitsPlanner() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<number>(0);

  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));
  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  const {
    data,
    isLoading,
    isValidating,
    refetch: revalidateUnits,
  } = useApiCall(
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
    () => data?.map((unit) => ({ id: unit.id, name: unit.name })) ?? [],
    [data]
  );

  const { data: coolingUnitCapacity, refetch: revalidateCapacity } = useApiCall(
    'getCoolingUnitCapacity',
    ColdtivateService.getCoolingUnitCapacity,
    selectedCoolingUnit?.id as number,
    {
      skip: !selectedCoolingUnit?.id,
      defaultData: [],
    }
  );

  const capacity = useMemo(() => {
    const unitCapacity: Array<number> = coolingUnitCapacity.at(0)?.usedCapacity ?? [];
    const weekDays = weekSubsetArtisan();
    const datums: Array<WeekBarChartDatum> = [];
    for (const [index, weekDay] of weekDays.entries()) {
      datums.push({ amount: (unitCapacity[index] ?? 0) * 100, timestamp: weekDay.toISOString() });
    }
    return datums;
  }, [coolingUnitCapacity]);

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle="mt-5 items-center pb-10"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isValidating}
          onRefresh={async () =>
            await Promise.all([
              revalidateUnits(),
              ...(typeof selectedCoolingUnit?.id !== 'undefined' ? [revalidateCapacity()] : []),
            ])
          }
        />
      }
    >
      <View tw="w-full">
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
          divider
        />
      </View>

      <Text tw="self-start mt-5 mb-4 ml-4" variant="titleLarge">
        {t('Dashboard.CoolingUnitsPlanner.occupancy')}
      </Text>

      <SemiCircleChart
        maxCapacity={MAX_CAPACITY}
        currentAmount={capacity[selectedColumn].amount}
        currentDate={capacity[selectedColumn].timestamp}
      />

      <Text tw="self-start mb-5 mt-10 ml-4" variant="titleMedium">
        {t('Dashboard.CoolingUnitsPlanner.week')}
      </Text>

      <WeekBarChart
        maxCapacity={MAX_CAPACITY}
        datums={capacity}
        selectedIndex={selectedColumn}
        onSelect={setSelectedColumn}
      />
    </ScrollView>
  );
}
