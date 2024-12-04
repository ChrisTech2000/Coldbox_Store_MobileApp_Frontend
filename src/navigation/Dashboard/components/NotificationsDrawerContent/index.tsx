import React, { useCallback, useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { View, FlatList } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import { useSWRConfig } from 'swr';
import { Modalize } from 'react-native-modalize';
import ms from 'ms';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { MovementDiagram } from '#screens/Dashboard/Main/History/components/MovementDiagram';

import type { CoolingUnit, Crop, FarmerSurvey } from '#types/global';
import type { GetAllCropsResponse, GetMovementsHistoryResponse } from '#types/api.responses';
import { useAuthStore } from '#stores/auth';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import { type ProcessedNotifications } from '../../lib/notifications';
import { useAppEventListener } from '#ui/lib/emitter';
import NotificationItem from './components/NotificationItem';
import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import ColdtivateService from '#services/ColdtivateService';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import InAppNotifications from '#common/InAppNotifications';

export type Notifications = ProcessedNotifications['notifications'];
export type Notification = Notifications[0];

export type CommoditySurveyDatum = {
  farmerSurveysLength: number;
  companyCurrency: string;
  crops: Array<Crop | GetAllCropsResponse>;
  contextualCrop: Crop | GetAllCropsResponse;
  userType: EOccupation;
  experience: EExperience;
  experienceInMonths: string;
  farmerId: number;
  commoditySurveys: Array<FarmerSurvey & { cropName: string }>;
};

export type OrderRequiresMovementDatum = {
  movement: GetMovementsHistoryResponse[0];
  coolingUnit: CoolingUnit;
};

export const useSettingUpSurvey = create<{
  isLoading: boolean;
  toggle: (value?: boolean) => void;
}>((set) => ({
  isLoading: false,
  toggle: (value) =>
    set((state) => ({ isLoading: typeof value !== 'undefined' ? value : !state.isLoading })),
}));

function NotificationsDrawerContent(props: { notifications: Notifications }) {
  const { notifications } = props;

  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();
  const toast = InAppNotifications.useToast();

  const [farmerSurveyDatums, setFarmerSurveyDatums] = useState<CommoditySurveyDatum | undefined>(
    undefined
  );
  const [orderDatum, setOrderDatum] = useState<OrderRequiresMovementDatum | undefined>(undefined);

  const modalRef = useRef<Modalize>(null);
  const modalTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const isSurveyLoading = useSettingUpSurvey((store) => store.isLoading);

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
    setFarmerSurveyDatums
  );

  useAppEventListener<[OrderRequiresMovementDatum]>(
    'DISPATCH_NOTIFICATION_ORDER_REQUIRES_MOVEMENT_MODAL',
    (value) => {
      setOrderDatum(value);
      modalRef.current?.open();
    }
  );

  useEffect(() => {
    return () => {
      if (modalTimeout.current) clearTimeout(modalTimeout.current);
    };
  }, []);

  return (
    <View tw="flex-1 justify-start">
      <View tw="p-4 bg-zinc-100 border-b-0.5 border-zinc-500 flex flex-row items-center justify-between">
        <Text variant="TitleRegular">{t('Dashboard.Notifications.text.notifications')}</Text>
        {isSurveyLoading ? (
          <ActivityIndicator size={18} color={paperTheme.colors.backdrop} animating />
        ) : null}
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
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

      {typeof farmerSurveyDatums !== 'undefined' ? (
        <FarmersSurveyModal
          isModalVisible
          companyCurrency={farmerSurveyDatums.companyCurrency}
          cropSelectionAvailable={{
            title: t('Dashboard.History.survey.baseSurvey.newCommodity', {
              index: farmerSurveyDatums.farmerSurveysLength,
            }),
            crops: farmerSurveyDatums.crops,
          }}
          onDismiss={() => setFarmerSurveyDatums(undefined)}
          initialCropSelection={farmerSurveyDatums.contextualCrop}
          onSubmit={async (values) => {
            try {
              await ColdtivateService.updateFarmerSurveys({
                farmer: farmerSurveyDatums.farmerId,
                userType: farmerSurveyDatums.userType,
                experience: farmerSurveyDatums.experience ? 'yes' : 'no',
                experienceDuration: Number(farmerSurveyDatums.experienceInMonths),
                commodities: [
                  ...farmerSurveyDatums.commoditySurveys.filter(
                    (commoditySurvey) =>
                      commoditySurvey.cropId !== farmerSurveyDatums.contextualCrop.id
                  ),
                  {
                    averagePrice: values.averagePrice,
                    unit: values.unitOfMeasurement,
                    quantityTotal: values.weightDistribution.totalProducedWeekly,
                    quantityBelowMarketPrice: values.weightDistribution.quantityLost,
                    quantitySelfConsumed: values.weightDistribution.quantitySelfConsumed,
                    quantitySold: values.weightDistribution.quantitySold,
                    averageSeasonInMonths: null,
                    kgInUnit: values.unitaryWeight as number,
                    currency: farmerSurveyDatums.companyCurrency,
                    reasonForLoss: values.reasonsForSpoilage,
                    cropId: farmerSurveyDatums.contextualCrop.id,
                  },
                ],
              });

              setFarmerSurveyDatums(undefined);
              toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.updateSuccess'), {
                type: 'md_success',
              });

              await revalidate();
            } catch (exception) {
              console.error(exception);
              toast.show(t('actions.error', { type: 'md_danger' }));
            }
          }}
        />
      ) : null}

      {typeof orderDatum !== 'undefined' ? (
        <Portal>
          <Modalize
            ref={modalRef}
            modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
            adjustToContentHeight
            withHandle={false}
            onClose={() => {
              modalTimeout.current = setTimeout(() => setOrderDatum(undefined), ms('3 seconds'));
            }}
          >
            <View tw="w-full items-center justify-center h-10">
              <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
            </View>

            <View tw="px-4 pb-4">
              <MovementDiagram
                movement={orderDatum!.movement}
                coolingUnit={orderDatum!.coolingUnit}
              />
            </View>
          </Modalize>
        </Portal>
      ) : null}
    </View>
  );
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom'], true);
