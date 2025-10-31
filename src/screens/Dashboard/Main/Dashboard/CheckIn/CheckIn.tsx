import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Dialog, Divider, Icon, List, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { cropTranslationLookup, getDefaultCropValues } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckInStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckInTabStack';
import type { TemperatureAlertEvtDatum } from '#navigation/Dashboard/components/TemperatureAlert';
import ColdtivateService from '#services/ColdtivateService';
import MarketplaceService from '#services/MarketplaceService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { type ProduceCrate, useCheckInStore } from '#stores/checkIn';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';
import type { CheckInResponse, CheckInWitCodeResponse } from '#types/api.responses';
import { ECoolingUnitMetric, EDateCropped, EPricingType } from '#types/global';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import reportCrash from '#ui/lib/reportCrash';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

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

const screenWidth = Dimensions.get('window').width;

function CheckIn({ route, navigation }: CheckInStackRouteProps<'CheckIn'>) {
  const { user, coolingUnit, isTutorial = false } = route.params;

  const { t } = useTranslationUtils();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  const company = useManagementStore((store) => store.company);
  const isTutorialActive = useTutorialStore((store) => store.isTutorialActive);
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
    layoutAdjustments: { x: LanguageManager.isRTL ? screenWidth / 2 : undefined },
  });

  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  const { data: surveys } = useApiCall(
    'getFarmerSurveys',
    ColdtivateService.getFarmerSurveys,
    { farmerId: user.id as number },
    {
      skip: !user.id || isTutorialActive || isTutorial,
      defaultData: [],
    }
  );

  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [indexForActiveOptions, setIndexForActiveOptions] = useState<number>(-1);
  const [isSubmitting, toggleIsSubmitting] = useToggle(false);

  const locale = LanguageManager.read();

  const { allCrates, allHavePlannedDays, translatedCropNames } = useMemo(() => {
    const combinedCrates: ProduceCrate['crates'] = [];
    let everyCrateHasPlannedDays = true;
    const translatedCropNames: Record<number, string> = {};

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    for (const produce of produces) {
      const cropId = produce.crop.id;
      if (!translatedCropNames[cropId]) {
        translatedCropNames[cropId] = find(translationMap, {
          name: produce.crop.name,
          country: company?.country,
          locale,
        });
      }
      for (const crate of produce.crates) {
        combinedCrates.push(crate);
        if (!crate.plannedDays) {
          everyCrateHasPlannedDays = false;
        }
      }
    }
    return {
      allCrates: combinedCrates,
      allHavePlannedDays: everyCrateHasPlannedDays,
      translatedCropNames,
    };
  }, [produces.length, company?.country, locale]);

  const total = useMemo(() => {
    if (!coolingUnit.commonPricingType) return '0.00';

    const metric = coolingUnit.commonPricingType.metric;

    return produces
      .reduce((acc, produce) => {
        const cropPricing = coolingUnit.crops.find((c) => c.cropId === produce.crop.id);

        let price = 0;
        let type: EPricingType | undefined;

        if (cropPricing?.pricing) {
          type = cropPricing.pricing.pricingType;
          price =
            type === EPricingType.PERIODICITY
              ? cropPricing.pricing.dailyRate
              : cropPricing.pricing.fixedRate;
        } else {
          price = coolingUnit.commonPricingType?.value ?? 0;
          type = coolingUnit.commonPricingType?.type;
        }

        for (const crate of produce.crates) {
          const metricMultiplier = metric === ECoolingUnitMetric.KILOGRAMS ? crate.weight : 1;

          if (type === EPricingType.FIXED) {
            acc += metricMultiplier * price;
          } else {
            const multiplier = allHavePlannedDays ? (crate.plannedDays ?? 1) : 1;
            acc += metricMultiplier * multiplier * price;
          }
        }

        return acc;
      }, 0)
      .toFixed(2);
  }, [coolingUnit, produces, allHavePlannedDays]);

  const setCrateIDs = useCallback(
    (modalCrates: SetupSchema['crates'], item: ProduceCrate) => {
      const _produce = cloneDeep(item);

      const updatedCrates = _produce.crates.map((crate, index) => ({
        ...crate,
        tag: modalCrates[index].tag?.toString() ?? '',
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

  const navigateToCropSelection = useCallback(() => {
    const now = new Date();
    const tempDate = new Date(coolingUnit.latestTemperatureTimestamp);
    const checkInDate = new Date(coolingUnit.lastCheckInDate as Date);
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

  async function handleCheckIn() {
    return ColdtivateService.checkIn({
      farmerId: user.id,
      id: undefined,
      produces: cloneDeep(produces).map((produce) => {
        delete produce.price;
        return {
          ...produce,
          crop: { id: produce.crop.id },
          harvestDate: (resolveHarvestDate(produce) ?? produce.harvestDate) as number,
          crates: produce.crates.map((crate) => {
            const crateShallow = { ...crate };
            delete crateShallow.isSellable;
            if (crateShallow.checkOut === null) delete crateShallow.checkOut;
            return crateShallow;
          }),
        };
      }),
    });
  }

  function resolveHarvestDate(produce: (typeof produces)[number]) {
    switch (produce.harvestDate) {
      case EDateCropped.TODAY:
        return produce.crop.harvestedToday;
      case EDateCropped.YESTERDAY:
        return produce.crop.harvestedYesterday;
      case EDateCropped.DAY_BEFORE:
        return produce.crop.harvestedDayBeforeYesterday;
      case EDateCropped.EVEN_BEFORE:
        return produce.crop.harvestedBefore;
      default:
        return produce.harvestDate;
    }
  }

  async function onSubmit(): Promise<void> {
    if (!produces.length) {
      toast.show(t('Dashboard.CrateManagement.CheckIn.emptyMessage'), { type: 'md_danger' });
      return;
    }

    toggleIsSubmitting();

    try {
      let result: CheckInWitCodeResponse | CheckInResponse | undefined;

      if (typeof checkOutCode === 'string') {
        result = await ColdtivateService.checkInWithCode({
          params: {
            code: checkOutCode,
            farmer: user.id,
            coolingUnitId: coolingUnit?.id as number,
            days: produces[0].crates[0].plannedDays,
            tags: produces
              .flatMap((p) => p.crates)
              .map((c) => c.tag)
              .filter(Boolean),
          },
        });
      } else {
        result = await handleCheckIn();

        await ColdtivateService.updateFarmer({
          farmerId: user.id,
          coolingUnitId: coolingUnit.id,
          updateCoolingUnits: true,
        });
      }

      if (!result) return;

      if (guard('SET', 'MarketplaceListForSale') && 'movement' in result) {
        const processedCrateListing = processMarketplaceCrateListing(produces, result.produces);
        await Promise.allSettled(
          processedCrateListing.map(({ crateIds, pricePerKg }) =>
            MarketplaceService.upsertListedCrate({
              crateIds,
              producePricePerKg: pricePerKg,
              operatorOnBehalfOfSellerFarmerId: user.id,
            })
          )
        );
      }

      toast.show(t('Dashboard.CrateManagement.CheckIn.successMessage'), { type: 'md_success' });

      if (guard('VIEW', 'TemperatureAlertModal')) {
        emitter.emit(APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT, {
          coolingUnitId: coolingUnit.id,
          companyId: company!.id,
          showCompleteInfo: true,
        });
      }

      resetCheckInStore();
      rootNavigation.navigate('RootMainTabStack');
      refreshData.forEach((fn) => fn());
    } catch (error) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(error as Error);
    } finally {
      toggleIsSubmitting();
    }
  }

  const isRTL = LanguageManager.isRTL;

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
            <Text tw={cn('text-base mt-4 mb-2 self-center', isRTL && 'self-start')}>
              {t('Dashboard.CrateManagement.CheckIn.cratesAddedLabel')}
            </Text>
          ) : null}

          {produces.length === 0 ? (
            <Text tw={cn('text-base mt-6 self-center text-gray-600', isRTL && 'self-start')}>
              {t('Dashboard.CrateManagement.CheckIn.emptyState')}
            </Text>
          ) : null}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={produces}
            extraData={{ surveys, translatedCropNames }}
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
                  cropName={translatedCropNames?.[item.crop.id] || ''}
                />
                {!surveys?.find((survey) => survey.co.some((s) => s.cropId === item.crop.id)) ? (
                  <FarmerSurvey
                    cropId={item.crop.id}
                    cropName={translatedCropNames?.[item.crop.id] || getDefaultCropValues(t).name}
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

        <View tw="space-y-2 mb-32 py-2.5">
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

      <View tw="absolute bottom-0 right-0 left-0 w-full">
        <View>
          <View tw="w-full h-14 flex flex-row items-center justify-between bg-teal-50 px-4">
            <Text variant="TextMedium" tw="text-lg font-bold">
              {allHavePlannedDays
                ? t('Dashboard.CrateManagement.CheckIn.estimatedCost')
                : t('Dashboard.CrateManagement.CheckIn.pricing')}
            </Text>
            <Text variant="TextMedium" tw="text-lg font-bold text-green-primary">
              {formatCurrencyWithSymbol(company?.currency || DEFAULT_CURRENCY_CODE, total)}
              {coolingUnit.commonPricingType?.type === EPricingType.PERIODICITY &&
              !allHavePlannedDays
                ? ` / ${t('Dashboard.CrateManagement.CheckIn.day')}`
                : ''}
            </Text>
          </View>
          <Divider tw="w-full bg-gray-600" />
        </View>

        <View tw="w-full flex flex-row items-center justify-center bg-white pt-4 pb-5 px-4 space-x-2">
          <Button
            tw={cn('flex-1 border-2', !isSubmitting && 'border-green-primary')}
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
            testID="confirm-check-in-button"
            onLayout={onCheckIn3Layout}
            tw={cn(
              'flex-1 border-2',
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
