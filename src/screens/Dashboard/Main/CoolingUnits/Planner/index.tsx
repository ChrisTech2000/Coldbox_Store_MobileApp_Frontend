import React, { useMemo, useState } from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Text } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { cn } from '#ui/lib/cn';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { BOTTOM_NAV_HEIGHT } from '#ui/primitives/withSafeArea';

import { CoolingUnitsOverlay } from '#screens/Dashboard/Tutorial/CoolingUnitsOverlay';
import { ECommonTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import RBAC from '#common/RBAC';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';

import GenericFilter, { useCoolingUnitStore } from '../components/GenericFilter';
import SemiCircleChart from './components/SemiCircleChart';
import WeekBarChart, { type WeekBarChartDatum } from './components/WeekBarChart';
import { weekSubsetArtisan } from './utils';

const MAX_CAPACITY = 100;
const screenHeight = Dimensions.get('window').height;

function CoolingUnitsPlanner() {
  const [selectedColumn, setSelectedColumn] = useState<number>(0);

  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  useWalkthroughStep({
    number: ECommonTutorialSteps.COOLING_UNITS_STEP,
    OverlayComponent: CoolingUnitsOverlay,
    fullScreen: true,
  });

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
    <View tw="pt-5 space-y-3" style={{ paddingBottom: BOTTOM_NAV_HEIGHT }}>
      <GenericFilter>
        <RBAC.ProtectedResource action="VIEW" subject="CompaniesFilter">
          <GenericFilter.Companies />
        </RBAC.ProtectedResource>
        <GenericFilter.CoolingUnits />
      </GenericFilter>

      <ScrollView
        contentContainerStyle="items-center"
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
        <View tw="pb-20">
          <Text
            tw={cn('self-start mb-4', screenHeight > SMALL_SCREEN_THRESHOLD ? 'ml-4' : 'mx-2')}
            variant="titleLarge"
            numberOfLines={2}
          >
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
        </View>
      </ScrollView>
    </View>
  );
}

export default withErrorBoundary(CoolingUnitsPlanner, {
  fallback: <GenericError />,
  onError: (error) => console.error('Error caught:', error),
});
