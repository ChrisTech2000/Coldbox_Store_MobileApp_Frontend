import React, { useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';

import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';

import GenericFilter, { useCoolingUnitStore } from '../components/GenericFilter';
import SemiCircleChart from './components/SemiCircleChart';
import { weekSubsetArtisan } from './utils';
import WeekBarChart, { type WeekBarChartDatum } from './components/WeekBarChart';

const MAX_CAPACITY = 100;

export default function CoolingUnitsPlanner() {
  const [selectedColumn, setSelectedColumn] = useState<number>(0);

  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  const {
    data: coolingUnitCapacity,
    isValidating,
    refetch: revalidateCapacity,
  } = useApiCall(
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

  return (
    <View tw="pt-5">
      <GenericFilter>
        <RBAC.ProtectedResource action="VIEW" subject="CompaniesFilter">
          <GenericFilter.Companies />
        </RBAC.ProtectedResource>
        <GenericFilter.CoolingUnits />
      </GenericFilter>

      <ScrollView
        contentContainerStyle="items-center pb-10"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isValidating}
            onRefresh={async () => {
              if (typeof selectedCoolingUnit?.id !== 'undefined') {
                await revalidateCapacity();
              }
            }}
          />
        }
      >
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
    </View>
  );
}
