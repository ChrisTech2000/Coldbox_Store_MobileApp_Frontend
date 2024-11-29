import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useRightDrawerStore } from '#navigation/Dashboard';
import type { NotificationOpenSurveyEventDatums } from '#navigation/Dashboard/lib/notifications';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import ColdtivateService from '#services/ColdtivateService';
import NotificationService from '#services/NotificationService';
import { useManagementStore } from '#stores/management';

import { useSettingUpSurvey, type CommoditySurveyDatum, type Notification } from '../index';

export default function NotificationItem(props: {
  item: Notification;
  revalidate: () => Promise<void>;
  findNotificationById: (notificationId: number) => Notification | undefined;
}) {
  const { item, revalidate, findNotificationById } = props;

  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();

  const managementCompany = useManagementStore(useShallow((store) => store.company));
  const isSurveyLoading = useSettingUpSurvey((store) => store.isLoading);
  const setIsSurveyLoading = useSettingUpSurvey((store) => store.toggle);

  async function updateStatusHandler(notificationId: number): Promise<void> {
    setIsSurveyLoading(true);

    if (!item.seen) {
      const result = await NotificationService.updateNotificationStatus(item.id);
      if (result?.id) await revalidate();
    }

    const notification = findNotificationById(notificationId);
    if (!notification?.crates?.farmer) return setIsSurveyLoading(false);

    switch (notification.eventType) {
      case 'FARMER_SURVEY': {
        const farmers = await ColdtivateService.getFarmers();
        const contextualFarmer = farmers?.find(
          (farmer) =>
            `${farmer.user.firstName} ${farmer.user.lastName}` === notification.crates.farmer
        );
        if (!contextualFarmer) return setIsSurveyLoading(false);
        await _handleFarmerSurvey(notification, contextualFarmer.id);
        break;
      }

      case 'MARKET_SURVEY': {
        const farmers = await ColdtivateService.getFarmers();
        const contextualFarmer = farmers?.find(
          (farmer) =>
            `${farmer.user.firstName} ${farmer.user.lastName}` === notification.crates.farmer
        );
        if (!contextualFarmer) return setIsSurveyLoading(false);
        await _handleMarketSurvey(notification, contextualFarmer.id);
        break;
      }

      default:
        break;
    }

    setIsSurveyLoading(false);
  }

  async function _handleFarmerSurvey(notification: Notification, farmerId: number) {
    const [cropsResult, surveysResult] = await Promise.allSettled([
      ColdtivateService.getAllCrops(),
      ColdtivateService.getFarmerSurveys({ farmerId }),
    ]);

    const crops = cropsResult.status === 'fulfilled' ? cropsResult.value : [];
    const surveys = surveysResult.status === 'fulfilled' ? surveysResult.value : [];

    const surveyList =
      surveys?.flatMap((survey) =>
        survey.co.map((item) => ({
          ...item,
          cropName: crops.find((crop) => crop.id === item.cropId)?.name ?? '',
        }))
      ) || [];

    const notificationCrop = notification.crates.crop.toLowerCase();
    const isAlreadyInFilledIn = surveyList
      .map((item) => item.cropName.toLowerCase())
      .includes(notificationCrop);

    if (isAlreadyInFilledIn) {
      toast.show(t('Dashboard.Notifications.surveyAlreadyFilled'), {
        type: 'md_danger',
      });
      return setIsSurveyLoading(false);
    }

    const contextualCrop = crops.find((crop) => crop.name === notification.crates.crop);
    if (!contextualCrop) return setIsSurveyLoading(false);

    const contextualFarmerSurvey = surveys?.at(0);
    const datum = {
      farmerSurveysLength: surveyList.length + 1,
      companyCurrency: managementCompany?.currency ?? 'NGN',
      crops,
      contextualCrop,
      farmerId,
      commoditySurveys: surveyList,
      userType: (contextualFarmerSurvey?.userType as EOccupation) ?? EOccupation.FARMER,
      experience: contextualFarmerSurvey?.experience ? EExperience.OLD : EExperience.NEW,
      experienceInMonths: contextualFarmerSurvey?.experienceDuration?.toString() ?? '1',
    } satisfies CommoditySurveyDatum;

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL, datum);
    useRightDrawerStore.getState().toggle(false);
  }

  async function _handleMarketSurvey(notification: Notification, farmerId: number) {
    const coolingUnits = await ColdtivateService.getCoolingUnits({});

    const contextualUnit = coolingUnits?.find(
      (unit) => unit.name === notification.crates.coolingUnit
    );
    if (!contextualUnit) return setIsSurveyLoading(false);

    const movements = await ColdtivateService.getMovementsHistory({
      coolingUnit: contextualUnit.id,
      farmerId,
    });

    const movementDetails = movements.find(
      (movement) => movement.code === notification.movementCode
    );
    if (!movementDetails || !movementDetails.marketSurveyDelay) {
      return setIsSurveyLoading(false);
    }

    const movementCropsForSurvey = movementDetails.movementCrops
      .filter((crop) => !movementDetails.hasMarketSurvey.includes(crop.id))
      .map((crop) => ({ id: crop.id, name: crop.name }));

    const datums = {
      eventType: 'MARKET_SURVEY',
      datums: {
        checkoutId: movementDetails.checkoutId,
        companyCurrency: managementCompany?.currency || 'NGN',
        crops: movementCropsForSurvey,
        owner: movementDetails.owner,
      },
    } satisfies NotificationOpenSurveyEventDatums;

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_SURVEY, datums);
    useRightDrawerStore.getState().toggle(false);
  }

  return (
    <React.Fragment>
      <View tw="px-2 pt-2.5">
        <Text tw="text-zinc-400">{dateFmt(item.date, 'dd-MM-yyyy HH:mm')}</Text>
      </View>
      <TouchableOpacity
        tw="p-2"
        onPress={async (evt) => {
          evt.stopPropagation();
          try {
            await updateStatusHandler(item.id);
          } catch (exception) {
            console.error(exception);
            toast.show(t('actions.error'), { type: 'md_danger' });
            setIsSurveyLoading(false);
          }
        }}
        disabled={isSurveyLoading}
      >
        <Text
          variant={item.seen ? undefined : 'TextMedium'}
          tw={cn(item.seen ? 'text-zinc-600' : 'text-black')}
        >
          {item.message}
          {item.link ? (
            <Text variant={item.seen ? undefined : 'TextMedium'} tw="text-blue-500">
              &nbsp;{item.link}
            </Text>
          ) : null}
        </Text>
      </TouchableOpacity>
      <Divider tw="w-full bg-zinc-500 mt-1.5" />
    </React.Fragment>
  );
}
