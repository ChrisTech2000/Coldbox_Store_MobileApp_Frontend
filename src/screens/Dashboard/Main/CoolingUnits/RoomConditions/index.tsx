import React, { useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import SelectWithStore from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles } from '#types/global';

import { type CoolingUnitFilter, useCoolingUnitStore } from '../Planner';
import LineChart from './components/LineChart';
import TemperatureModal from './components/TemperatureModal';

import { processTemperatures } from './utils';

function CoolingUnitsRoomConditions() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));
  const selectedCoolingUnit = useCoolingUnitStore(useShallow((store) => store.selectedItem));
  const { t } = useTranslationUtils();

  const { data: units, isLoading } = useApiCall(
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
    () => units?.map((unit) => ({ id: unit.id, name: unit.name })) ?? [],
    [units]
  );

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

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      tw="h-full"
      contentContainerStyle="pt-5 pb-8"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isValidatingTemperatures}
          onRefresh={async () => await revalidateTemperatures()}
        />
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
        divider
      />

      {typeof chartDatums.info !== 'undefined' && chartDatums.datums.length >= 1 ? (
        <React.Fragment>
          <View tw="mx-4 mt-4 space-y-4">
            <View tw="flex flex-row items-center space-x-2">
              <Icon name="snowflake" size={34} color={paperTheme.colors.primary} />
              <Text variant="TitleMedium">{t('Dashboard.CoolingUnitsRoomConditions.heading')}</Text>
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
            <TemperatureModal
              temp={chartDatums.info.temperature}
              coolingUnitId={selectedCoolingUnit!.id}
              revalidateTemperatures={revalidateTemperatures}
            />
          </View>
        </React.Fragment>
      ) : (
        <View tw="mx-2 mt-4">
          <Text style={{ color: paperTheme.colors.primary }}>
            {t('Dashboard.CoolingUnitsCratesInfo.messages.empty')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default withSafeArea(CoolingUnitsRoomConditions);
