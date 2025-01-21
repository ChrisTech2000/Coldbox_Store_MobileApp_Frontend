import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Dialog, Divider, Icon, List, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import type { TemperatureAlertEvtDatum } from '#navigation/Dashboard/components/TemperatureAlert';
import ColdtivateService from '#services/ColdtivateService';
import MarketplaceService from '#services/MarketplaceService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { type ProduceCrate, useCheckInStore } from '#stores/checkIn';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import type { CheckInResponse, CheckInWitCodeResponse } from '#types/api.responses';
import { ECoolingUnitMetric, EDateCropped, EPricingType } from '#types/global';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';

import {
  CheckIn1ScreenOverlay,
  CheckIn2ScreenOverlay,
  CheckIn3ScreenOverlay,
} from '#screens/Dashboard/Tutorial/CheckInOverlays';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { FarmerSurvey } from '../FarmerSurvey';
import { SetupSchema } from './CrateSetup';
import { CheckInWithCodeModal } from './components/CheckInWithCodeModal';
import { CheckedInCard } from './components/CheckedInCard';
import { formatCurrencyWithSymbol, processMarketplaceCrateListing } from './utils';

function CheckIn({ route, navigation }: CheckInStackRouteProps<'CheckIn'>) {
  const { user, coolingUnit } = route.params;

  const { t } = useTranslationUtils();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

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
  } = useCheckInStore();

  useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_IN_STEP_1,
    OverlayComponent: CheckIn1ScreenOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_IN_STEP_2,
    OverlayComponent: CheckIn2ScreenOverlay,
    fullScreen: true,
  });

  const { onLayout: onCheckIn3Layout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_IN_STEP_3,
    OverlayComponent: CheckIn3ScreenOverlay,
  });

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
  const [indexForActiveOptions, setIndexForActiveOptions] = useState<number>(-1);
  const [isSubmitting, toggleIsSubmitting] = useToggle(false);

  const allCrates = useMemo(
    () => produces.flatMap((produce) => produce.crates),
    [produces, produces.length]
  );

  const allHavePlannedDays = useMemo(() => {
    return produces.flatMap((produce) => produce.crates).every((crate) => !!crate.plannedDays);
  }, [produces, produces.length]);

  const total = useMemo(() => {
    const price = coolingUnit.commonPricingType?.value;

    if (!allHavePlannedDays || coolingUnit.commonPricingType?.type === EPricingType.FIXED) {
      if (coolingUnit.commonPricingType?.metric === ECoolingUnitMetric.KILOGRAMS) {
        return allCrates.reduce((acc, current) => (acc += current.weight * price), 0) ?? 0;
      }
      return (price * allCrates.length).toFixed(2);
    }

    return allCrates
      .reduce((acc, current) => {
        if (coolingUnit.commonPricingType?.metric === ECoolingUnitMetric.KILOGRAMS) {
          acc += (current.plannedDays ?? 1) * price * current.weight;
        } else {
          acc += (current.plannedDays ?? 1) * price;
        }
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

  async function onSubmit(): Promise<void> {
    if (!produces || !produces.length) {
      toast.show(t('Dashboard.CrateManagement.CheckIn.emptyMessage'), {
        type: 'md_danger',
      });
      return;
    }

    toggleIsSubmitting();

    let result: CheckInWitCodeResponse | CheckInResponse | undefined = undefined;

    if (typeof checkOutCode === 'string') {
      result = await ColdtivateService.checkInWithCode({
        params: {
          code: checkOutCode,
          farmer: user.id,
          coolingUnitId: coolingUnit?.id as number,
          days: produces[0].crates[0].plannedDays,
          tags: produces
            .flatMap((produce) => produce.crates)
            .map((crate) => crate.tag)
            .filter((tag) => typeof tag === 'string'),
        },
      });
    } else {
      result = await ColdtivateService.checkIn({
        farmerId: user.id,
        id: undefined,
        produces: cloneDeep(produces).map((produce) => {
          delete produce.price;
          let harvestDate: number | null = null;
          switch (produce.harvestDate) {
            case EDateCropped.TODAY:
              harvestDate = produce.crop.harvestedToday;
              break;
            case EDateCropped.YESTERDAY:
              harvestDate = produce.crop.harvestedYesterday;
              break;
            case EDateCropped.DAY_BEFORE:
              harvestDate = produce.crop.harvestedDayBeforeYesterday;
              break;
            case EDateCropped.EVEN_BEFORE:
              harvestDate = produce.crop.harvestedBefore;
              break;
            default:
              break;
          }

          return {
            ...produce,
            crop: { id: produce.crop.id },
            harvestDate: (harvestDate ?? produce.harvestDate) as number,
            crates: produce.crates.map((crate) => {
              const crateShallow = { ...crate };
              delete crateShallow.isSellable;
              if (crateShallow.checkOut === null) delete crateShallow.checkOut;
              return crateShallow;
            }),
          };
        }),
      });

      await ColdtivateService.updateFarmer({
        farmerId: user.id,
        coolingUnitId: coolingUnit.id,
        updateCoolingUnits: true,
      });
    }

    if (typeof result !== 'object') return toggleIsSubmitting();

    if (guard('SET', 'MarketplaceListForSale')) {
      if ('movement' in result) {
        const processedCrateListing = processMarketplaceCrateListing(produces, result.produces);
        await Promise.allSettled(
          processedCrateListing.map(
            async ({ crateIds, pricePerKg }) =>
              await MarketplaceService.upsertListedCrate({
                crateIds,
                producePricePerKg: pricePerKg,
                operatorOnBehalfOfSellerFarmerId: user.id,
              })
          )
        );
      }
    }

    toast.show(t('Dashboard.CrateManagement.CheckIn.successMessage'), {
      type: 'md_success',
    });

    if (guard('VIEW', 'TemperatureAlertModal')) {
      const temperatureAlertDatum = {
        coolingUnitId: coolingUnit.id,
        companyId: company!.id,
        showCompleteInfo: true,
      } satisfies TemperatureAlertEvtDatum;

      emitter.emit(APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT, temperatureAlertDatum);
    }

    resetCheckInStore();
    rootNavigation.navigate('RootMainTabStack');
    refreshData.forEach((fn) => fn());
    toggleIsSubmitting();
  }

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
    <View tw="flex-1">
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
          {produces.length > 0 ? (
            <Text tw="text-base mt-4 mb-2 self-center">
              {t('Dashboard.CrateManagement.CheckIn.cratesAddedLabel')}
            </Text>
          ) : null}

          {produces.length === 0 ? (
            <Text tw="text-base mt-6 self-center text-gray-600">
              {t('Dashboard.CrateManagement.CheckIn.emptyState')}
            </Text>
          ) : null}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={produces}
            extraData={surveys}
            keyExtractor={(item, itemIdx) => `crate-${item.crop.id}-#${itemIdx}`}
            renderItem={({ item, index }) => (
              <View>
                <CheckedInCard
                  item={item}
                  index={index}
                  coolingUnit={coolingUnit}
                  currencyCode={company?.currency || DEFAULT_CURRENCY_CODE}
                  checkOutCode={checkOutCode}
                  totalCrates={allCrates.length}
                  openOptionsModal={() => setIndexForActiveOptions(index)}
                  setCrateIDs={setCrateIDs}
                  disabled={isSubmitting}
                />
                {!surveys?.find((survey) => survey.co.some((s) => s.cropId === item.crop.id)) ? (
                  <FarmerSurvey
                    cropId={item.crop.id}
                    cropName={item.crop.name}
                    farmerId={user.id}
                    surveys={surveys}
                    disabled={isSubmitting}
                  />
                ) : null}
              </View>
            )}
            nestedScrollEnabled
          />
        </ScrollView>

        <View tw="space-y-2 mb-20">
          {!checkOutCode ? (
            <Button
              tw={cn('w-full border-2', !isSubmitting && 'border-green-primary')}
              mode="outlined"
              onPress={navigateToCropSelection}
              icon="basket"
              contentStyle="flex flex-row-reverse items-center"
              disabled={isSubmitting}
            >
              {t('Dashboard.CrateManagement.CheckIn.addCrates')}
            </Button>
          ) : null}
          {!produces || produces.length === 0 ? (
            <Button
              tw={cn('w-full border-2', !isSubmitting && 'border-green-primary')}
              mode="outlined"
              onPress={() => setIsCodeModalOpen(true)}
              icon="ticket-confirmation-outline"
              contentStyle="flex flex-row-reverse items-center"
              disabled={isSubmitting}
            >
              {t('Dashboard.CrateManagement.CheckIn.checkInWithCode')}
            </Button>
          ) : null}

          {!allHavePlannedDays && coolingUnit.commonPricingType?.type !== EPricingType.FIXED ? (
            <Text variant="TextMedium" tw="text-base">
              {t('Dashboard.CrateManagement.CheckIn.noPlannedDaysMessage')}
            </Text>
          ) : null}
        </View>

        {!produces || produces.length === 0 ? (
          <CheckInWithCodeModal
            closeModal={() => setIsCodeModalOpen(false)}
            isModalOpen={isCodeModalOpen}
          />
        ) : null}
      </View>

      <View tw="w-full flex flex-row items-center justify-center space-x-1 py-1.5 px-4">
        <Button
          tw={cn('w-1/2 border-2', !isSubmitting && 'border-green-primary')}
          mode="outlined"
          onPress={() => {
            resetCheckInStore();
            rootNavigation.navigate('RootMainTabStack');
          }}
          icon="close-circle-outline"
          contentStyle="flex flex-row-reverse items-center"
          labelStyle={cn(!isSubmitting && 'text-green-primary')}
          disabled={isSubmitting}
        >
          {t('actions.cancel')}
        </Button>
        <Button
          onLayout={onCheckIn3Layout}
          tw={cn(
            'w-1/2 border-2',
            !produces || (produces.length === 0 && 'border-2 border-gray-100'),
            !(!produces || produces.length === 0 || isSubmitting) && 'border-green-primary'
          )}
          mode="contained"
          onPress={async (evt) => {
            evt.stopPropagation();
            try {
              await onSubmit();
            } catch (exception) {
              reportCrash(exception as Error);
            }
          }}
          icon="check-circle-outline"
          contentStyle="flex flex-row-reverse items-center"
          disabled={!produces || produces.length === 0 || isSubmitting}
        >
          {t('actions.confirm')}
        </Button>
      </View>

      <View tw="absolute bottom-20 right-0 left-0 w-full">
        <View tw="w-full h-14 flex flex-row items-center justify-between bg-teal-50 px-4">
          <Text variant="TextMedium" tw="text-lg font-bold">
            {allHavePlannedDays
              ? t('Dashboard.CrateManagement.CheckIn.estimatedCost')
              : t('Dashboard.CrateManagement.CheckIn.pricing')}
          </Text>
          <Text variant="TextMedium" tw="text-lg font-bold text-green-primary">
            {formatCurrencyWithSymbol(company?.currency || DEFAULT_CURRENCY_CODE, total)}
            {coolingUnit.commonPricingType?.type === EPricingType.PERIODICITY && !allHavePlannedDays
              ? ` / ${t('Dashboard.CrateManagement.CheckIn.day')}`
              : ''}
          </Text>
        </View>
        <Divider tw="w-full bg-gray-600" />
      </View>

      <Portal>
        <Dialog
          visible={indexForActiveOptions !== -1}
          onDismiss={() => setIndexForActiveOptions(-1)}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Content tw="px-0">
            <TouchableOpacity
              tw="space-x-3 w-full py-2.5 px-6 flex flex-row items-center"
              onPress={(evt) => {
                evt.stopPropagation();
                const contextualProduce = produces.at(indexForActiveOptions);
                if (typeof contextualProduce === 'undefined') return; // safe guard
                setIndexForActiveOptions(-1);
                navigation.navigate('CrateSetup', { contextualProduce });
              }}
            >
              <Icon source="pencil" size={18} />
              <Text variant="TextMedium" tw="text-base">
                {t('actions.edit')}
              </Text>
            </TouchableOpacity>
            <Divider tw="bg-zinc-400" />
            <TouchableOpacity
              tw="space-x-3 w-full py-2.5 px-6 flex flex-row items-center"
              onPress={() => {
                removeProduce(produces[indexForActiveOptions]);
                setIndexForActiveOptions(-1);
              }}
            >
              <Icon source="trash-can-outline" size={18} color={colors.red[700]} />
              <Text variant="TextMedium" tw="text-base text-red-700">
                {t('actions.delete')}
              </Text>
            </TouchableOpacity>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(CheckIn, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
