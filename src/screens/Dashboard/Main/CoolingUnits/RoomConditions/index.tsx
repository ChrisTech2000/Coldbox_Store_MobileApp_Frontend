import React, { useMemo } from 'react';
import { RefreshControl, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { paperTheme } from '#ui/lib/theme';
import RBAC from '#common/RBAC';

import LineChart from './components/LineChart';
import TemperatureModal from './components/TemperatureModal';

import { processTemperatures } from './utils';
import GenericFilter, { useCoolingUnitStore } from '../components/GenericFilter';

function CoolingUnitsRoomConditions() {
  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

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

  return (
    <View tw="pt-5">
      <GenericFilter>
        <RBAC.ProtectedResource action="VIEW" subject="CompaniesFilter">
          <GenericFilter.Companies />
        </RBAC.ProtectedResource>
        <GenericFilter.CoolingUnits />
      </GenericFilter>

      <ScrollView
        tw="h-full"
        contentContainerStyle="pb-8"
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
            <View tw="bg-zinc-200 py-4 mt-8 items-center space-y-3">
              <View tw="flex-row items-center space-x-4">
                <Icon name="thermometer" size={30} color={paperTheme.colors.scrim} />
                <Text variant="TitleRegular">
                  {t('Dashboard.CoolingUnitsRoomConditions.temperature')}
                </Text>
                <Text variant="TitleMedium">{chartDatums.info.temperature}°C</Text>
              </View>
              <Text tw="text-zinc-500" variant="TitleSmall">
                {t('Dashboard.CoolingUnitsRoomConditions.lastUpdated', {
                  date: dateFmt(chartDatums.info.lastUpdated, 'E MMM dd yyyy HH:mm'),
                })}
              </Text>

              <RBAC.ProtectedResource action="SET" subject="Temperatures">
                <TemperatureModal
                  temp={chartDatums.info.temperature}
                  coolingUnitId={selectedCoolingUnit!.id}
                  revalidateTemperatures={revalidateTemperatures}
                  hasSensorIntegration={selectedCoolingUnit?.sensor ?? false}
                />
              </RBAC.ProtectedResource>
            </View>
          </React.Fragment>
        ) : (
          <View tw="mx-2 mt-4">
            <Text tw="text-green-primary text-center">
              {t('Dashboard.CoolingUnitsCratesInfo.messages.empty')}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default withSafeArea(CoolingUnitsRoomConditions);
