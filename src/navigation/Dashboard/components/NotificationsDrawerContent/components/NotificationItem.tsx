import React, { useState } from 'react';
import { type GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { Text } from '#ui/components/Text';

import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import type { NotificationOpenSurveyEventDatums } from '#navigation/Dashboard/lib/notifications';
import InAppNotifications from '#common/InAppNotifications';
import ColdtivateService from '#services/ColdtivateService';
import DataloaderService from '#services/DataloaderService';
import NotificationService from '#services/NotificationService';
import { useManagementStore } from '#stores/management';
import { useRightDrawerStore } from '#navigation/Dashboard';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { resolveCropInfo, resolveOwnerName } from '#services/utils/resolvers';
import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';
import reportCrash from '#ui/lib/reportCrash';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import type { Notifications, CommoditySurveyDatum, OrderRequiresMovementDatum } from '../index';

type Notification = Notifications[0]['datum'];

const NOTIFICATION_EXCEPTIONS = {
  FARMER_REQUIRED: 'Farmer information is required',
  SURVEY_FILLED_IN: 'Survey already filled',
  CROP_LIST_REQUIRED: 'Crop list information is required',
  MARKEY_SURVEY_INCOMPLETE: 'Must provide both a Farmer and Cooling Unit to process market survey',
  INVALID_HISTORY_MOVEMENT: 'Invalid history movement',
  HISTORY_MOVEMENT_NOT_FOUND: 'No movement history found for the cooling unit',
  UNIT_REQUIRED: 'Cooling Unit information is required',
  MOVEMENT_NOT_FOUND: 'Movement details not found for cooling unit',
} as const;

const useSettingUpSurvey = create<{
  isLoading: boolean;
  toggle: (value?: boolean) => void;
}>((set) => ({
  isLoading: false,
  toggle: (value) =>
    set((state) => ({ isLoading: typeof value !== 'undefined' ? value : !state.isLoading })),
}));

/**
 *
 * Base Notification component
 *
 */
export function NotificationBase(props: {
  item: Notification;
  updateStatusHandler?: () => Promise<void>;
  isDisableAllowed?: boolean;
}) {
  const { item, updateStatusHandler, isDisableAllowed } = props;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [isSurveyLoading, setIsSurveyLoading] = useSettingUpSurvey((store) => [
    store.isLoading,
    store.toggle,
  ]);

  const [_isLoading, _setIsLoading] = useState<boolean>(false);
  const [_notificationDisabled, _setNotificationDisabled] = useState<boolean>(false);

  async function onPressHandler(evt: GestureResponderEvent): Promise<void> {
    evt.stopPropagation();
    if (isSurveyLoading) return; // safe guard
    try {
      setIsSurveyLoading(true);
      _setIsLoading(true);
      if (!item.seen) {
        await NotificationService.updateNotificationStatus(item.id);
      }
      await updateStatusHandler?.();
    } catch (exception) {
      let toastId: string | undefined;
      if (exception instanceof Error) {
        if (exception.message === NOTIFICATION_EXCEPTIONS.SURVEY_FILLED_IN) {
          toastId = toast.show(t('Dashboard.Notifications.surveyAlreadyFilled'), {
            type: 'md_danger',
          });
          _setNotificationDisabled(true);
        }
      }
      if (!toastId) toast.show(t('actions.error'), { type: 'md_danger' });
      reportCrash(exception as Error, {
        extras: {
          notificationKind: item.eventType,
          hasCrates: !!item.crates,
        },
      });
    } finally {
      setIsSurveyLoading(false);
      _setIsLoading(false);
    }
  }

  const getTextVariant = (v: boolean) => (v ? undefined : 'TextMedium');
  const getTextColor = (v: boolean) => cn(v ? 'text-zinc-600' : 'text-black');

  const isTapDisabled =
    isSurveyLoading || ((isDisableAllowed ?? true) ? _notificationDisabled : false);
  const isTextDisabled = item.seen || isSurveyLoading;

  return (
    <View tw="p-0 mx-0 my-0.5 relative">
      {_isLoading ? (
        <View tw="absolute flex items-center justify-center z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-2.5">
          <ActivityIndicator size="small" color={paperTheme.colors.backdrop} animating />
        </View>
      ) : null}

      <View tw={cn('px-2 pt-2', _isLoading && 'opacity-25')}>
        <Text tw="text-zinc-400">{dateFmt(item.date, 'dd-MM-yyyy HH:mm')}</Text>
      </View>

      <TouchableOpacity
        tw={cn('p-2', _isLoading && 'opacity-25')}
        onPress={onPressHandler}
        disabled={isTapDisabled}
      >
        <Text variant={getTextVariant(isTextDisabled)} tw={getTextColor(isTextDisabled)}>
          {item.message}
          {item.link && (
            <Text variant={getTextVariant(isTextDisabled)} tw="text-blue-500">
              &nbsp;{item.link}
            </Text>
          )}
        </Text>
      </TouchableOpacity>

      <Divider tw={cn('w-full bg-zinc-600 mt-1.5', _isLoading && 'opacity-25')} />
    </View>
  );
}

/**
 *
 * Farmer Survey notification component and logic
 *
 */
export function FarmerSurveyNotification(props: {
  notification: Notifications[0];
  onSelect: (datum: CommoditySurveyDatum) => void;
}) {
  const { notification, onSelect } = props;

  const company = useManagementStore((store) => store.company);
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();
  const contextualCountry = company?.country || farmerCountry || undefined;

  async function updateStatusHandler(): Promise<void> {
    const farmer = notification.ctx.farmer;
    if (!farmer) throw new Error(NOTIFICATION_EXCEPTIONS.FARMER_REQUIRED);

    const surveys = await ColdtivateService.getFarmerSurveys({ farmerId: farmer.id });

    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();

    const surveyList = surveys
      ? await Promise.all(
          surveys.flatMap((survey) =>
            survey.co.map(async (item) => {
              const crop = await DataloaderService.crops.getById(item.cropId);
              return {
                ...item,
                cropName: find(lookupMap, {
                  name: crop?.name ?? '',
                  country: contextualCountry,
                  locale,
                }),
              };
            })
          )
        )
      : [];

    const isAlreadyFilledIn = surveyList.some(
      (item) => item.cropName.toLowerCase() === notification.datum.crates.crop.toLowerCase()
    );
    if (isAlreadyFilledIn) throw new Error(NOTIFICATION_EXCEPTIONS.SURVEY_FILLED_IN);

    const contextualCrop = await DataloaderService.crops.find(
      (crop) => crop.name === notification.datum.crates.crop
    );
    if (!contextualCrop) throw new Error(NOTIFICATION_EXCEPTIONS.CROP_LIST_REQUIRED);

    const contextualFarmerSurvey = surveys?.at(0);

    onSelect({
      farmerSurveysLength: surveyList.length + 1,
      companyCurrency: company?.currency ?? DEFAULT_CURRENCY_CODE,
      crops: cloneDeep(await DataloaderService.crops.getAll()).map((crop) => {
        crop.name = find(lookupMap, {
          name: crop.name,
          country: contextualCountry,
          locale,
        });
        return crop;
      }),
      contextualCrop: {
        ...contextualCrop,
        name: find(lookupMap, {
          name: contextualCrop.name,
          country: contextualCountry,
          locale,
        }),
      },
      farmerId: farmer.id,
      commoditySurveys: surveyList,
      userType: (contextualFarmerSurvey?.userType as EOccupation) ?? EOccupation.FARMER,
      experience: contextualFarmerSurvey?.experience ? EExperience.OLD : EExperience.NEW,
      experienceInMonths: contextualFarmerSurvey?.experienceDuration?.toString() ?? '1',
    });
    useRightDrawerStore.getState().toggle(false);
  }

  return <NotificationBase item={notification.datum} updateStatusHandler={updateStatusHandler} />;
}

/**
 *
 * Market Survey notification component and logic
 *
 */
export function MarketSurveyNotification(props: {
  notification: Notifications[0];
  onSelect: (datum: NotificationOpenSurveyEventDatums) => void;
}) {
  const { notification, onSelect } = props;

  const company = useManagementStore((store) => store.company);
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();
  const contextualCountry = company?.country || farmerCountry || undefined;

  async function updateStatusHandler(): Promise<void> {
    const farmer = notification.ctx.farmer;
    const coolingUnit = notification.ctx.coolingUnit;
    if (!farmer || !coolingUnit) throw new Error(NOTIFICATION_EXCEPTIONS.MARKEY_SURVEY_INCOMPLETE);

    const movements = await ColdtivateService.getMovementsHistory({ coolingUnit: coolingUnit.id });
    if (!movements) throw new Error(NOTIFICATION_EXCEPTIONS.HISTORY_MOVEMENT_NOT_FOUND);

    const movementDetails = movements.find(
      (movement) => movement.code === notification.datum.movementCode
    );

    const isValidMovement = movementDetails && movementDetails.checkout?.crates?.[0]?.ownedByUserId;
    if (!isValidMovement) throw new Error(NOTIFICATION_EXCEPTIONS.INVALID_HISTORY_MOVEMENT);

    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();

    const movementCropsForSurvey = (
      await Promise.all(
        movementDetails.checkout.crates.map(async (crate) => {
          if (movementDetails.checkout.hasMarketSurvey.includes(crate.cropId)) return;
          const crop = await DataloaderService.crops.getById(crate.cropId);
          if (!crop) return;
          return {
            id: crop.id,
            name: find(lookupMap, {
              name: crop.name,
              country: contextualCountry,
              locale,
            }),
          };
        })
      )
    ).filter(Boolean) as Array<{ id: number; name: string }>;

    const areAllCropsInSurvey = movementCropsForSurvey.every((crop) =>
      movementDetails.checkout.hasMarketSurvey.includes(crop.id)
    );

    if (areAllCropsInSurvey) throw new Error(NOTIFICATION_EXCEPTIONS.SURVEY_FILLED_IN);

    const owner = await ColdtivateService.getUser(
      movementDetails.checkout.crates[0].ownedByUserId!
    );

    onSelect({
      eventType: 'MARKET_SURVEY',
      datums: {
        checkoutId: movementDetails.checkout.id,
        companyCurrency: company?.currency ?? DEFAULT_CURRENCY_CODE,
        crops: movementCropsForSurvey,
        owner: `${owner.firstName ?? ''} ${owner.lastName ?? ''}`,
        ownerId: owner.id,
      },
    });
    useRightDrawerStore.getState().toggle(false);
  }

  return <NotificationBase item={notification.datum} updateStatusHandler={updateStatusHandler} />;
}

/**
 *
 * Order Requires Movement notification component and logic
 *
 */
export function OrderRequiresMovementNotification(props: {
  notification: Notifications[0];
  onSelect: (datum: OrderRequiresMovementDatum) => void;
}) {
  const { notification, onSelect } = props;

  const company = useManagementStore((store) => store.company);
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();
  const contextualCountry = company?.country || farmerCountry || undefined;

  async function updateStatusHandler(): Promise<void> {
    const coolingUnit = notification.ctx.coolingUnit;
    if (!coolingUnit) throw new Error(NOTIFICATION_EXCEPTIONS.UNIT_REQUIRED);

    const movements = await ColdtivateService.getMovementsHistory({ coolingUnit: coolingUnit.id });
    const movement = movements.find((movement) => movement.id === notification.datum.specificId);
    if (!movement) throw new Error(NOTIFICATION_EXCEPTIONS.MOVEMENT_NOT_FOUND);

    if (!isEmpty(movement.checkin)) {
      const { buildMap, find } = cropTranslationLookup();
      const lookupMap = buildMap();

      movement.checkin = {
        ...movement.checkin,
        ownerName: await resolveOwnerName(
          movement.checkin?.ownedByUserId,
          movement.checkin?.ownedOnBehalfOfCompanyId
        ),
        crates: await Promise.all(
          movement.checkin?.crates.map(async (crate) => {
            const resolvedCrop = await resolveCropInfo(crate.cropId);
            return {
              ...crate,
              crop: {
                ...resolvedCrop,
                name: find(lookupMap, {
                  name: resolvedCrop.name,
                  country: contextualCountry,
                  locale,
                }),
              },
            };
          })
        ),
      };
    }

    if (!isEmpty(movement.checkout)) {
      const { buildMap, find } = cropTranslationLookup();
      const lookupMap = buildMap();

      movement.checkout = {
        ...movement.checkout,
        crates: await Promise.all(
          movement.checkout?.crates.map(async (crate) => {
            const resolvedCrop = await resolveCropInfo(crate.cropId);
            return {
              ...crate,
              ownerName: await resolveOwnerName(
                crate.ownedByUserId,
                crate.ownedOnBehalfOfCompanyId
              ),
              crop: {
                ...resolvedCrop,
                name: find(lookupMap, {
                  name: resolvedCrop.name,
                  country: contextualCountry,
                  locale,
                }),
              },
            };
          })
        ),
      };
    }

    onSelect({ movement, coolingUnit });
    useRightDrawerStore.getState().toggle(false);
  }

  return (
    <NotificationBase
      item={notification.datum}
      updateStatusHandler={updateStatusHandler}
      isDisableAllowed={false}
    />
  );
}
