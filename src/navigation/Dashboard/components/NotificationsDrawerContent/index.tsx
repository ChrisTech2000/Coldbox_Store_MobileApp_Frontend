import React, { useCallback, useState } from 'react';
import { create } from 'zustand';
import { View, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { Crop } from '#types/global';
import type { GetAllCropsResponse } from '#types/api.responses';
import { useAuthStore } from '#stores/auth';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import { type ProcessedNotifications } from '../../lib/notifications';
import { useAppEventListener } from '#ui/lib/emitter';
import NotificationItem from './components/NotificationItem';
import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';

export type Notifications = ProcessedNotifications['notifications'];
export type Notification = Notifications[0];

export type CommoditySurveyDatum = {
  farmerSurveysLength: number;
  companyCurrency: string;
  crops: Array<Crop | GetAllCropsResponse>;
  contextualCrop: Crop | GetAllCropsResponse;
};

type Props = {
  notifications: Notifications;
};

export const _useSettingUpSurvey = create<{
  isLoading: boolean;
  toggle: (value?: boolean) => void;
}>((set) => ({
  isLoading: false,
  toggle: (value) => set((state) => ({ isLoading: value ?? !state.isLoading })),
}));

function NotificationsDrawerContent(props: Props) {
  const { notifications } = props;

  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const [modalDatums, setModalDatums] = useState<CommoditySurveyDatum | undefined>(undefined);
  const isSettingUpSurvey = _useSettingUpSurvey(useShallow((store) => store.isLoading));

  const revalidate = useCallback(async () => {
    await mutate(getQueryKey('getNotifications', user));
  }, [user]);

  const findNotificationById = useCallback(
    (notificationId: number) =>
      notifications.find((notification) => notification.id === notificationId),
    [notifications]
  );

  useAppEventListener<[CommoditySurveyDatum]>(
    'DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL',
    setModalDatums
  );

  return (
    <View tw="flex-1 justify-start">
      <View tw="p-4 bg-zinc-100 border-b-0.5 border-zinc-500 flex flex-row items-center justify-between">
        <Text variant="TitleRegular">{t('Dashboard.Notifications.text.notifications')}</Text>
        {isSettingUpSurvey ? (
          <ActivityIndicator size={18} color={paperTheme.colors.backdrop} animating />
        ) : null}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => `notification-#${item.id}`}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            revalidate={revalidate}
            findNotificationById={findNotificationById}
          />
        )}
        nestedScrollEnabled
      />

      {typeof modalDatums !== 'undefined' ? (
        <FarmersSurveyModal
          isModalVisible
          companyCurrency={modalDatums.companyCurrency}
          cropSelectionAvailable={{
            title: t('Dashboard.History.survey.baseSurvey.newCommodity', {
              index: modalDatums.farmerSurveysLength,
            }),
            crops: modalDatums.crops,
          }}
          onDismiss={() => setModalDatums(undefined)}
          onSubmit={console.log}
          initialCropSelection={modalDatums.contextualCrop}
        />
      ) : null}
    </View>
  );
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom']);
