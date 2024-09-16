import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { currencies } from 'currencies.json';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon, IconButton, List } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { ProduceCrate, useCheckInStore } from '#stores/checkIn';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { ECoolingUnitMetric, EPricingType } from '#types/global';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { FarmerSurvey } from '../FarmerSurvey';
import { SetupSchema } from './CrateSetup';
import { CheckInWithCodeModal } from './components/CheckInWithCodeModal';
import { CrateSetupModal } from './components/CrateSetupModal';
import InAppNotifications from '#common/InAppNotifications';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import type { TemperatureAlertEvtDatum } from '#navigation/Dashboard/components/TemperatureAlert';
import RBAC from '#common/RBAC';

function CheckIn({ route, navigation }: CheckInStackRouteProps<'CheckIn'>) {
  const { user, coolingUnit } = route.params;

  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);

  const refreshData = useDashboardStore((store) => store.refreshData);
  const {
    checkOutCode,
    produces,
    removeProduce,
    setProduces,
    setCoolingUnit,
    setUser,
    resetCheckInStore,
    setCheckOutCode,
  } = useCheckInStore();

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  const { data: surveys } = useApiCall(
    'getFarmerSurveys',
    ColdtivateService.getFarmerSurveys,
    {
      farmerId: user.id as number,
    },
    {
      skip: !user.id,
      defaultData: [],
    }
  );

  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isIdsModalOpen, setIsIdsModalOpen] = useState<number | undefined>(undefined);

  const allCrates = useMemo(
    () => produces.flatMap((produce) => produce.crates),
    [produces, produces.length]
  );

  const allHavePlannedDays = useMemo(() => {
    return produces.flatMap((produce) => produce.crates).every((crate) => !!crate.plannedDays);
  }, [produces, produces.length]);

  const total = useMemo(() => {
    const price = coolingUnit.commonPricingType.value;

    if (!allHavePlannedDays || coolingUnit.commonPricingType.type === EPricingType.FIXED) {
      if (coolingUnit.commonPricingType.metric === ECoolingUnitMetric.KILOGRAMS) {
        return allCrates.reduce((acc, current) => (acc += current.weight * price), 0) ?? 0;
      }
      return (price * allCrates.length).toFixed(2);
    }

    return allCrates
      .reduce((acc, current) => {
        if (coolingUnit.commonPricingType.metric === ECoolingUnitMetric.KILOGRAMS) {
          acc += (current.plannedDays ?? 1) * price * current.weight;
        } else {
          acc += (current.plannedDays ?? 1) * price;
        }
        return acc;
      }, 0)
      .toFixed(2);
  }, [produces, produces.length, coolingUnit, allHavePlannedDays, allCrates]);

  const currencySymbol = useMemo(() => {
    return currencies.find((c) => c.code === company?.currency)?.symbol ?? '';
  }, [company]);

  const setCrateIDs = useCallback(
    (modalCrates: SetupSchema['crates'], item: ProduceCrate) => {
      const _produce = cloneDeep(item);

      const updatedCrates = _produce.crates.map((crate, index) => ({
        ...crate,
        tag: modalCrates[index].crateId?.toString() ?? '',
      }));

      _produce.crates = updatedCrates;

      const index = produces.indexOf(item);

      if (index !== -1) {
        produces[index] = _produce;
        setProduces(produces);
      }
    },
    [produces, produces.length]
  );

  const getCratePrice = useCallback(
    (crates: ProduceCrate['crates']) => {
      const price = coolingUnit.commonPricingType.value;

      if (coolingUnit.commonPricingType.metric === ECoolingUnitMetric.CRATES) {
        return (price * crates.length).toFixed(2);
      }

      return crates.reduce((acc, current) => (acc += current.weight * price), 0) ?? 0;
    },
    [coolingUnit]
  );

  const onSubmit = useCallback(async () => {
    if (!produces || !produces.length) {
      toast.show(t('Dashboard.CrateManagement.CheckIn.emptyMessage'), {
        type: 'md_danger',
      });
      return;
    }

    const result = checkOutCode
      ? await ColdtivateService.checkInWithCode({
          params: {
            code: checkOutCode,
            farmer: user.id,
            coolingUnitId: coolingUnit?.id as number,
            days: produces[0].crates[0].plannedDays,
            tags: produces
              .flatMap((produce) => produce.crates)
              .map((crate) => {
                return crate.tag;
              })
              .filter((tag) => typeof tag === 'string'),
          },
        })
      : await ColdtivateService.checkIn({
          farmerId: user.id,
          id: undefined,
          produces: produces.map((produce) => ({
            ...produce,
            crop: {
              id: produce.crop.id as number,
            },
            harvestDate: produce.harvestDate as number,
          })),
        });

    if (result) {
      resetCheckInStore();
      toast.show(t('Dashboard.CrateManagement.CheckIn.successMessage'), {
        type: 'md_success',
      });

      setTimeout(() => refreshData.forEach((fn) => fn()), 1000);

      if (guard('VIEW', 'TemperatureAlertModal')) {
        const temperatureAlertDatum = {
          coolingUnitId: coolingUnit.id,
          companyId: company!.id,
          showCompleteInfo: true,
        } satisfies TemperatureAlertEvtDatum;

        emitter.emit(APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT, temperatureAlertDatum);
      }

      rootNavigation.navigate('RootMainTabStack');
    }
  }, [user, produces, checkOutCode, coolingUnit?.id, guard]);

  const navigateToCropSelection = useCallback(() => {
    const now = new Date();
    const tempDate = new Date(coolingUnit.latestTemperatureTimestamp);
    const checkInDate = new Date(coolingUnit.lastCheckInDate);
    const lastTemperatureChangeSinceCheckIn =
      (checkInDate.getTime() - tempDate.getTime()) / 3600000;
    const lastCheckInChangeInHours = Math.abs(now.getTime() - checkInDate.getTime()) / 3600000;

    navigation.navigate('SelectCropType');

    if (
      guard('VIEW', 'TemperatureAlertModal') &&
      (!coolingUnit.sensor || coolingUnit.sensorError) &&
      (lastCheckInChangeInHours > 6 || lastTemperatureChangeSinceCheckIn < 0) &&
      company?.hasDigitalTwin
    ) {
      const temperatureAlertDatum = {
        coolingUnitId: coolingUnit.id,
        companyId: company!.id,
        showCompleteInfo: false,
      } satisfies TemperatureAlertEvtDatum;

      emitter.emit(APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT, temperatureAlertDatum);
    }
  }, [coolingUnit, company, emitter]);

  useEffect(() => {
    if (coolingUnit) setCoolingUnit(coolingUnit);
    if (user) setUser(user);
  }, [coolingUnit, user, checkOutCode]);

  return (
    <View tw="flex-1 p-4">
      <List.Item
        tw="p-0 m-0"
        title={undefined}
        left={() => (
          <Text variant="TextMedium" tw="text-base max-w-[70%]" numberOfLines={1}>
            {t('Dashboard.CrateManagement.coolingUserLabel')}
          </Text>
        )}
        right={() => (
          <Text variant="TextMedium" tw="text-base max-w-[30%]" numberOfLines={1}>
            {user?.user.firstName}
          </Text>
        )}
      />
      <Divider tw="bg-gray-400 mt-2" />
      <List.Item
        tw="p-0 m-0 mt-3"
        title={undefined}
        left={() => (
          <Text variant="TextMedium" tw="text-base">
            {t('Dashboard.CrateManagement.coolingUnitLabel')}
          </Text>
        )}
        right={() => (
          <Text variant="TextMedium" tw="text-base">
            {coolingUnit?.name}
          </Text>
        )}
      />
      <Divider tw="bg-gray-400 mt-2" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {produces.length === 0 ? (
          <Text tw="text-base mt-6 self-center text-gray-600">
            {t('Dashboard.CrateManagement.CheckIn.emptyState')}
          </Text>
        ) : null}

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={produces}
          extraData={surveys}
          keyExtractor={(item, itemIdx) => `crate-${item.crop.id}-#${itemIdx}`}
          renderItem={({ item, index }) => (
            <View>
              <View tw="flex flex-row items-center justify-between">
                <View tw="flex flex-row items-center space-x-2">
                  <FastImage
                    tw="w-20 h-20 my-1"
                    source={{
                      uri: `${API_BASE_URL}media/${item.crop.image}`,
                      priority: index < 8 ? FastImage.priority.high : FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text variant="TextMedium" tw="text-lg w-32">
                    {item.crop.name} — {item.crates.length}
                  </Text>
                </View>
                <View tw="flex flex-row items-center space-x-2">
                  {coolingUnit && (
                    <Text variant="TextMedium">
                      {currencySymbol}
                      {getCratePrice(item.crates)}
                      {coolingUnit.commonPricingType.type === EPricingType.PERIODICITY
                        ? ` / ${t('Dashboard.CrateManagement.CheckIn.day')}`
                        : ''}
                    </Text>
                  )}
                  <TouchableHighlight
                    onPress={() => {
                      if (produces.length === 1) setCheckOutCode(null);
                      removeProduce(item);
                    }}
                  >
                    <Icon source="trash-can-outline" size={30} color={colors.red[500]} />
                  </TouchableHighlight>
                </View>
              </View>
              {!surveys?.find((survey) => survey.co.some((s) => s.cropId === item.crop.id)) ? (
                <FarmerSurvey
                  cropId={item.crop.id}
                  cropName={item.crop.name}
                  farmerId={user.id}
                  surveys={surveys}
                />
              ) : null}
              {checkOutCode ? (
                <React.Fragment>
                  <IconButton
                    tw="bg-gray-300 w-full px-1 self-center"
                    icon={() => (
                      <Text tw="w-full text-center font-bold text-wrap">
                        {t('Dashboard.CrateManagement.CheckIn.Setup.individualCrateIdButton')}
                      </Text>
                    )}
                    onPress={() => setIsIdsModalOpen(index)}
                  />
                  <CrateSetupModal
                    setValue={(modalCrates) => setCrateIDs(modalCrates, item)}
                    crates={item.crates.map((crate) => ({
                      crateId: Number(crate.tag),
                      crateWeight: crate.weight,
                    }))}
                    isOpen={isIdsModalOpen === index}
                    numberOfCrates={allCrates.length}
                    closeModal={() => setIsIdsModalOpen(undefined)}
                    title={t('Dashboard.CrateManagement.CheckIn.Setup.modals.id')}
                  />
                </React.Fragment>
              ) : null}
              <Divider tw="w-full bg-gray-400" />
            </View>
          )}
          nestedScrollEnabled
        />
      </ScrollView>

      <View tw="space-y-2">
        {!checkOutCode ? (
          <Button
            tw="w-full border-2 border-green-primary"
            mode="outlined"
            onPress={navigateToCropSelection}
            icon="basket"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('Dashboard.CrateManagement.CheckIn.addCrates')}
          </Button>
        ) : null}
        {!produces || produces.length === 0 ? (
          <Button
            tw="w-full border-2 border-green-primary"
            mode="outlined"
            onPress={() => setIsCodeModalOpen(true)}
            icon="ticket-confirmation-outline"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('Dashboard.CrateManagement.CheckIn.checkInWithCode')}
          </Button>
        ) : null}

        {!allHavePlannedDays && coolingUnit.commonPricingType.type !== EPricingType.FIXED ? (
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckIn.noPlannedDaysMessage')}
          </Text>
        ) : null}

        <View tw="flex-col mb-2">
          <View tw="w-full flex flex-row items-center justify-between mb-2">
            <Text variant="TextMedium" tw="text-lg font-bold">
              {allHavePlannedDays
                ? t('Dashboard.CrateManagement.CheckIn.estimatedCost')
                : t('Dashboard.CrateManagement.CheckIn.pricing')}
            </Text>
            <Text variant="TextMedium" tw="text-lg font-bold">
              {`${currencySymbol}${total}`}
              {coolingUnit.commonPricingType.type === EPricingType.PERIODICITY &&
              !allHavePlannedDays
                ? ` / ${t('Dashboard.CrateManagement.CheckIn.day')}`
                : ''}
            </Text>
          </View>
          <Divider tw="w-full bg-gray-400 mt-2" />
        </View>

        <View tw="w-full flex flex-row items-center justify-center space-x-1 py-1.5">
          <Button
            tw="w-1/2 border-2 border-red-400"
            mode="outlined"
            onPress={() => {
              resetCheckInStore();
              rootNavigation.navigate('RootMainTabStack');
            }}
            icon="close-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
            labelStyle="text-red-400"
          >
            {t('actions.cancel')}
          </Button>
          <Button
            tw="w-1/2 border-2 border-green-primary"
            mode="contained"
            onPress={onSubmit}
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse items-center"
            disabled={!produces || produces.length === 0}
          >
            {t('actions.confirm')}
          </Button>
        </View>
      </View>

      {!produces || produces.length === 0 ? (
        <CheckInWithCodeModal
          closeModal={() => setIsCodeModalOpen(false)}
          isModalOpen={isCodeModalOpen}
        />
      ) : null}
    </View>
  );
}

export default withSafeArea(CheckIn);
