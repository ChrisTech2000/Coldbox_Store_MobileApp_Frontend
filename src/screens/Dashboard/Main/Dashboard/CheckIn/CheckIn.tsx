import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon, IconButton } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
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

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { SetupSchema } from './CrateSetup';
import { CheckInWithCodeModal } from './components/CheckInWithCodeModal';
import { CrateSetupModal } from './components/CrateSetupModal';
import { FarmerSurvey } from './components/FarmerSurvey';

function CheckIn({ route, navigation }: CheckInStackRouteProps<'CheckIn'>) {
  const { user, coolingUnit } = route.params;

  const { t } = useTranslationUtils();
  const { company } = useManagementStore();

  const { refreshDashboard } = useDashboardStore();
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
  const toast = useToast();

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
    const dailyPricePerCrate = coolingUnit.commonPricingType.value;

    if (!allHavePlannedDays) return (dailyPricePerCrate * allCrates.length).toFixed(2);

    return allCrates
      .reduce((acc, current) => {
        acc += (current.plannedDays ?? 1) * dailyPricePerCrate;
        return acc;
      }, 0)
      .toFixed(2);
  }, [produces, produces.length, coolingUnit, allHavePlannedDays, allCrates]);

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

  const onSubmit = useCallback(async () => {
    if (!produces || !produces.length) {
      toast.show(t('Dashboard.CrateManagement.CheckIn.emptyMessage'), {
        type: 'danger',
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
        type: 'success',
      });

      setTimeout(() => refreshDashboard?.(), 1000);
      rootNavigation.navigate('RootMainTabStack');
    }
  }, [user, produces, checkOutCode]);

  useEffect(() => {
    if (coolingUnit) setCoolingUnit(coolingUnit);
    if (user) setUser(user);
  }, [coolingUnit, user, checkOutCode]);

  return (
    <View tw="flex-1 p-4">
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.CrateManagement.coolingUserLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-lg">
          {user?.user.firstName}
        </Text>
      </View>
      <Divider tw="bg-gray-400 my-2" />
      <View tw="flex flex-row w-full justify-between items-center">
        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.CrateManagement.coolingUnitLabel')}
        </Text>
        <Text variant="TextMedium" tw="text-lg">
          {coolingUnit?.name}
        </Text>
      </View>
      <Divider tw="bg-gray-400 my-2" />

      <ScrollView>
        {produces.length === 0 && (
          <Text variant="TextMedium" tw="text-lg mt-3">
            {t('Dashboard.CrateManagement.CheckIn.emptyState')}
          </Text>
        )}
        <FlatList
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
                      {company?.currency}{' '}
                      {(coolingUnit.commonPricingType.value * item.crates.length).toFixed(2)} /{' '}
                      {t('Dashboard.CrateManagement.CheckIn.day')}
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
              {!surveys?.find((survey) => survey.co.some((s) => s.cropId === item.crop.id)) && (
                <FarmerSurvey cropName={item.crop.name} />
              )}
              {checkOutCode && (
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
                    mode={'id'}
                    isOpen={isIdsModalOpen === index}
                    numberOfCrates={allCrates.length}
                    closeModal={() => setIsIdsModalOpen(undefined)}
                    title={t('Dashboard.CrateManagement.CheckIn.Setup.modals.id')}
                  />
                </React.Fragment>
              )}
              <Divider tw="w-full bg-grey-400" />
            </View>
          )}
          nestedScrollEnabled
        />
      </ScrollView>

      <View tw="space-y-2">
        {!checkOutCode && (
          <Button
            tw="w-full border-2 border-green-primary"
            mode="outlined"
            onPress={() => navigation.navigate('SelectCropType')}
            icon="basket"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('Dashboard.CrateManagement.CheckIn.addCrates')}
          </Button>
        )}
        {(!produces || produces.length === 0) && (
          <Button
            tw="w-full border-2 border-green-primary"
            mode="outlined"
            onPress={() => setIsCodeModalOpen(true)}
            icon="ticket-confirmation-outline"
            contentStyle="flex flex-row-reverse items-center"
          >
            {t('Dashboard.CrateManagement.CheckIn.checkInWithCode')}
          </Button>
        )}

        {!allHavePlannedDays && (
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckIn.noPlannedDaysMessage')}
          </Text>
        )}

        <View tw="w-full flex flex-row items-center justify-between mb-2">
          <Text variant="TextMedium" tw="text-lg font-bold">
            {allHavePlannedDays
              ? t('Dashboard.CrateManagement.CheckIn.estimatedCost')
              : t('Dashboard.CrateManagement.CheckIn.pricing')}
          </Text>
          <Text variant="TextMedium" tw="text-lg font-bold">
            {`${company?.currency} ${total}`}{' '}
            {!allHavePlannedDays && `/ ${t('Dashboard.CrateManagement.CheckIn.day')}`}
          </Text>
        </View>
        <View tw="w-full flex flex-row items-center justify-center space-x-1">
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
          >
            {t('actions.confirm')}
          </Button>
        </View>
      </View>
      {(!produces || produces.length === 0) && (
        <CheckInWithCodeModal
          closeModal={() => setIsCodeModalOpen(false)}
          isModalOpen={isCodeModalOpen}
        />
      )}
    </View>
  );
}

export default withSafeArea(CheckIn);
