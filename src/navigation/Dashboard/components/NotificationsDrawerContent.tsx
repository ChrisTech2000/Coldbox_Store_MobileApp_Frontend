import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { getQueryKey } from '#services/hooks/useAPiCall';
import NotificationService from '#services/NotificationService';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';
import { useManagementStore } from '#stores/management';

import {
  type NotificationOpenSurveyEventDatums,
  type ProcessedNotifications,
} from '../lib/notifications';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import ColdtivateService from '#services/ColdtivateService';
import { useRightDrawerStore } from '../index';

type Notifications = ProcessedNotifications['notifications'];
type Notification = Notifications[0];

type Props = {
  notifications: Notifications;
};

function NotificationsDrawerContent(props: Props) {
  const { notifications } = props;

  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const revalidate = useCallback(async () => {
    await mutate(getQueryKey('getNotifications', user));
  }, [user]);

  const findNotificationById = useCallback(
    (notificationId: number) =>
      notifications.find((notification) => notification.id === notificationId),
    [notifications]
  );

  return (
    <View tw="flex-1 justify-start">
      <View tw="p-4 bg-zinc-100 border-b-0.5 border-zinc-500">
        <Text variant="TitleRegular">{t('Dashboard.Notifications.text.notifications')}</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => `notification-#${item.id}`}
        renderItem={({ item }) => (
          <_NotificationItem
            item={item}
            revalidate={revalidate}
            findNotificationById={findNotificationById}
          />
        )}
        nestedScrollEnabled
      />
    </View>
  );
}

function _NotificationItem({
  item,
  revalidate,
  findNotificationById,
}: {
  item: Notification;
  revalidate: () => Promise<void>;
  findNotificationById: (notificationId: number) => Notification | undefined;
}) {
  const managementCompany = useManagementStore(useShallow((store) => store.company)); // RE & OP

  async function updateStatusHandler(notificationId: number): Promise<void> {
    if (!item.seen) {
      const result = await NotificationService.updateNotificationStatus(item.id);
      if (result?.id) await revalidate();
    }

    const notification = findNotificationById(notificationId);
    if (typeof notification === 'undefined') return;

    const farmers = await ColdtivateService.getFarmers();

    let contextualFarmerId: number | undefined = undefined;
    for (const farmer of farmers ?? []) {
      const currentFarmerName = `${farmer.user.firstName} ${farmer.user.lastName}`;
      if (currentFarmerName === notification.crates.farmer) {
        contextualFarmerId = farmer.id;
        break;
      }
      continue;
    }

    switch (notification.eventType) {
      case 'FARMER_SURVEY': {
        if (typeof contextualFarmerId === 'undefined') return;

        const datums = {
          eventType: 'FARMER_SURVEY',
          datums: { farmerId: contextualFarmerId },
        } satisfies NotificationOpenSurveyEventDatums;

        emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_SURVEY, datums);
        useRightDrawerStore.getState().toggle(false);
        break;
      }

      case 'MARKET_SURVEY': {
        const coolingUnits = await ColdtivateService.getCoolingUnits({});

        let contextualUnitId: number | undefined = undefined;
        for (const coolingUnit of coolingUnits ?? []) {
          if (coolingUnit.name === notification.crates.coolingUnit) {
            contextualUnitId = coolingUnit.id;
            break;
          }
          continue;
        }
        if (typeof contextualUnitId === 'undefined') return;

        const movements = await ColdtivateService.getMovementsHistory({
          coolingUnit: contextualUnitId,
          farmerId: contextualFarmerId,
        });

        const movementDetails = movements.find(
          (movement) => movement.code === notification.movementCode
        );
        if (typeof movementDetails === 'undefined') return;

        if (!movementDetails.marketSurveyDelay) {
          // TODO -> show toast notification because the survey cannot be filled at this time
          return;
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
            farmer: movementDetails.farmer,
          },
        } satisfies NotificationOpenSurveyEventDatums;

        emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_SURVEY, datums);
        useRightDrawerStore.getState().toggle(false);
        break;
      }
    }
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

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom']);
