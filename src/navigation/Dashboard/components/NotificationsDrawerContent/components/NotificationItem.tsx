import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';

import NotificationService from '#services/NotificationService';
import ColdtivateService from '#services/ColdtivateService';
import { dateFmt } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { useRightDrawerStore } from '#navigation/Dashboard';
import { cn } from '#ui/lib/cn';
import type { NotificationOpenSurveyEventDatums } from '#navigation/Dashboard/lib/notifications';

import { useSettingUpSurvey, type CommoditySurveyDatum, type Notification } from '../index';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';

export default function NotificationItem({
  item,
  revalidate,
  findNotificationById,
}: {
  item: Notification;
  revalidate: () => Promise<void>;
  findNotificationById: (notificationId: number) => Notification | undefined;
}) {
  const managementCompany = useManagementStore(useShallow((store) => store.company));

  const isSettingUpSurvey = useSettingUpSurvey(useShallow((store) => store.isLoading));
  const toggleSettingUpSurveyStatus = useSettingUpSurvey((store) => store.toggle);

  async function updateStatusHandler(notificationId: number): Promise<void> {
    toggleSettingUpSurveyStatus();

    if (!item.seen) {
      const result = await NotificationService.updateNotificationStatus(item.id);
      if (result?.id) await revalidate();
    }

    const notification = findNotificationById(notificationId);
    if (!notification) return toggleSettingUpSurveyStatus();

    const farmers = await ColdtivateService.getFarmers();
    const contextualFarmer = farmers?.find(
      (farmer) => `${farmer.user.firstName} ${farmer.user.lastName}` === notification.crates.farmer
    );
    if (!contextualFarmer) return toggleSettingUpSurveyStatus();

    switch (notification.eventType) {
      case 'FARMER_SURVEY':
        await _handleFarmerSurvey(notification, contextualFarmer.id);
        break;

      case 'MARKET_SURVEY':
        await _handleMarketSurvey(notification, contextualFarmer.id);
        break;

      default:
        break;
    }

    toggleSettingUpSurveyStatus();
  }

  async function _handleFarmerSurvey(notification: Notification, farmerId: number) {
    const [cropsResult, surveysResult] = await Promise.allSettled([
      ColdtivateService.getAllCrops(),
      ColdtivateService.getFarmerSurveys({ farmerId }),
    ]);

    const crops = cropsResult.status === 'fulfilled' ? cropsResult.value : [];
    const surveys = surveysResult.status === 'fulfilled' ? surveysResult.value : [];

    const list =
      surveys?.flatMap((survey) =>
        survey.co.map((item) => ({
          ...item,
          cropName: crops.find((crop) => crop.id === item.cropId)?.name ?? '',
        }))
      ) || [];

    const contextualCrop = crops.find((crop) => crop.name === notification.crates.crop);
    if (!contextualCrop) return toggleSettingUpSurveyStatus();

    const contextualFarmerSurvey = surveys?.at(0);
    const datum: CommoditySurveyDatum = {
      farmerSurveysLength: list.length + 1,
      companyCurrency: managementCompany?.currency ?? 'NGN',
      crops,
      contextualCrop,
      farmerId,
      commoditySurveys: list,
      userType: (contextualFarmerSurvey?.userType as EOccupation) ?? EOccupation.FARMER,
      experience: contextualFarmerSurvey?.experience ? EExperience.OLD : EExperience.NEW,
      experienceInMonths: contextualFarmerSurvey?.experienceDuration?.toString() ?? '1',
    };

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL, datum);
    useRightDrawerStore.getState().toggle(false);
  }

  async function _handleMarketSurvey(notification: Notification, farmerId: number) {
    const coolingUnits = await ColdtivateService.getCoolingUnits({});
    const contextualUnit = coolingUnits?.find(
      (unit) => unit.name === notification.crates.coolingUnit
    );

    if (!contextualUnit) return toggleSettingUpSurveyStatus();

    const movements = await ColdtivateService.getMovementsHistory({
      coolingUnit: contextualUnit.id,
      farmerId,
    });

    const movementDetails = movements.find(
      (movement) => movement.code === notification.movementCode
    );
    if (!movementDetails || !movementDetails.marketSurveyDelay)
      return toggleSettingUpSurveyStatus();

    const movementCropsForSurvey = movementDetails.movementCrops
      .filter((crop) => !movementDetails.hasMarketSurvey.includes(crop.id))
      .map((crop) => ({ id: crop.id, name: crop.name }));

    const datums: NotificationOpenSurveyEventDatums = {
      eventType: 'MARKET_SURVEY',
      datums: {
        checkoutId: movementDetails.checkoutId,
        companyCurrency: managementCompany?.currency || 'NGN',
        crops: movementCropsForSurvey,
        farmer: movementDetails.farmer,
      },
    };

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
          }
        }}
        disabled={isSettingUpSurvey}
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
