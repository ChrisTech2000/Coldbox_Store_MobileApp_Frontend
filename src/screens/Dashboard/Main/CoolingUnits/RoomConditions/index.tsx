import React, { useMemo, useRef } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { cn } from '#ui/lib/cn';

import { RoomConditionsOverlay } from '#screens/Dashboard/Tutorial/CoolingUnitsOverlay';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import GenericFilter, { useCoolingUnitStore } from '../components/GenericFilter';
import LineChart from './components/LineChart';
import TemperatureModal from './components/TemperatureModal';
import { processTemperatures } from './utils';

function CoolingUnitsRoomConditions() {
  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();
  const scrollRef = useRef<ScrollView>(null);

  useWalkthroughStep({
    number: EOperatorTutorialSteps.ROOM_CONDITIONS_STEP,
    OverlayComponent: RoomConditionsOverlay,
    fullScreen: true,
  });

  const {
    data: temperatures,
    isValidating: isValidatingTemperatures,
    refetch: revalidateTemperatures,
  } = useApiCall(
    'getCoolingUnitTemperatures',
    ColdtivateService.getCoolingUnitTemperatures,
    selectedCoolingUnit?.id as number,
    {
      skip: !selectedCoolingUnit?.id,
      defaultData: [],
    }
  );

  const chartDatums = useMemo(() => processTemperatures(temperatures), [temperatures]);
  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="py-5">
      <GenericFilter>
        <RBAC.ProtectedResource action="VIEW" subject="CompaniesFilter">
          <GenericFilter.Companies />
        </RBAC.ProtectedResource>
        <GenericFilter.CoolingUnits />
      </GenericFilter>

      <ScrollView
        ref={scrollRef}
        tw="h-full pb-8"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isValidatingTemperatures}
            onRefresh={async () => await revalidateTemperatures()}
          />
        }
      >
        {typeof chartDatums.info !== 'undefined' && chartDatums.datums.length >= 1 ? (
          <React.Fragment>
            <View tw="mx-4 mt-4 space-y-4">
              <View tw="flex flex-row items-center space-x-2">
                <Icon name="snowflake" size={34} color={paperTheme.colors.primary} />
                <Text variant="TitleMedium">
                  {t('Dashboard.CoolingUnitsRoomConditions.heading')}
                </Text>
              </View>

              <View tw="h-96 w-full">
                <LineChart datums={chartDatums.datums} />
              </View>
            </View>
          </React.Fragment>
        ) : (
          <View tw="mx-2 mt-4">
            <Text tw={cn('text-green-primary text-center', isRTL && 'text-left')}>
              {t('Dashboard.CoolingUnitsCratesInfo.messages.empty')}
            </Text>
          </View>
        )}
        {selectedCoolingUnit ? (
          <View tw="bg-zinc-200 py-4 mt-8 items-center space-y-3 mb-10">
            <View tw="flex-row items-center space-x-4">
              <Icon name="thermometer" size={30} color={paperTheme.colors.scrim} />
              <Text variant="TitleRegular">
                {t('Dashboard.CoolingUnitsRoomConditions.temperature')}
              </Text>
              {chartDatums.info ? (
                <Text variant="TitleMedium">{chartDatums.info.temperature}°C</Text>
              ) : null}
            </View>

            {chartDatums.info ? (
              <Text tw="text-zinc-500" variant="TitleSmall">
                {t('Dashboard.CoolingUnitsRoomConditions.lastUpdated', {
                  date: dateFmt(chartDatums.info.lastUpdated, 'E MMM dd yyyy HH:mm'),
                })}
              </Text>
            ) : null}

            <RBAC.ProtectedResource action="SET" subject="Temperatures">
              <TemperatureModal
                temp={chartDatums.info?.temperature ?? 0}
                coolingUnitId={selectedCoolingUnit.id}
                revalidateTemperatures={revalidateTemperatures}
                hasSensorIntegration={selectedCoolingUnit?.sensor ?? false}
              />
            </RBAC.ProtectedResource>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(CoolingUnitsRoomConditions, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
