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
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import { type ProcessedNotifications } from '../../lib/notifications';
import { useAppEventListener } from '#ui/lib/emitter';
import NotificationItem from './components/NotificationItem';
import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import ColdtivateService from '#services/ColdtivateService';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import InAppNotifications from '#common/InAppNotifications';
import NotificationService from '#services/NotificationService';

import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { useRightDrawerStore } from '#navigation/Dashboard';
import type { NotificationOpenSurveyEventDatums } from '#navigation/Dashboard/lib/notifications';
import { type ManagementCompany, useManagementStore } from '#stores/management';

export type Notifications = ProcessedNotifications['notifications'];
type NotificationDatum = Notifications[0];
export type Notification = NotificationDatum['datum'];

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
  const managementCompany = useManagementStore(useShallow((store) => store.company));
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

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    skip: !user?.id,
    defaultData: [],
  });

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
        keyExtractor={(item) => `notification-#${item.datum.id}`}
        renderItem={({ item }) => (
          <NotificationItem
            item={item.datum}
            updateStatusHandler={async () => {
              if (!item.datum.seen) {
                const result = await NotificationService.updateNotificationStatus(item.datum.id);
                if (result?.id) await revalidate();
              }
              switch (item.datum.eventType) {
                case 'FARMER_SURVEY': {
                  await NotificationHandlers.farmerSurvey(item, managementCompany, crops);
                  break;
                }
                case 'MARKET_SURVEY': {
                  await NotificationHandlers.marketSurvey(item, managementCompany);
                  break;
                }
                case 'ORDER_REQUIRES_MOVEMENT': {
                  await NotificationHandlers.reallocate(item);
                  break;
                }
                default:
                  break;
              }
            }}
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

class NotificationHandlers {
  static async farmerSurvey(
    notification: NotificationDatum,
    managementCompany: ManagementCompany,
    crops: Array<GetAllCropsResponse>
  ) {
    const farmer = notification.ctx.farmer;
    if (!farmer) throw new Error();

    const surveys = await ColdtivateService.getFarmerSurveys({ farmerId: farmer.id });

    const surveyList =
      surveys?.flatMap((survey) =>
        survey.co.map((item) => ({
          ...item,
          cropName: crops.find((crop) => crop.id === item.cropId)?.name ?? '',
        }))
      ) || [];

    const isAlreadyFilledIn = surveyList
      .map((item) => item.cropName.toLowerCase())
      .includes(notification.datum.crates.crop.toLowerCase());

    if (isAlreadyFilledIn) throw new Error('surveyAlreadyFilled');

    const contextualCrop = crops.find((crop) => crop.name === notification.datum.crates.crop);
    if (!contextualCrop) throw new Error();

    const contextualFarmerSurvey = surveys?.at(0);
    const datum = {
      farmerSurveysLength: surveyList.length + 1,
      companyCurrency: managementCompany?.currency ?? 'NGN',
      crops,
      contextualCrop,
      farmerId: farmer.id,
      commoditySurveys: surveyList,
      userType: (contextualFarmerSurvey?.userType as EOccupation) ?? EOccupation.FARMER,
      experience: contextualFarmerSurvey?.experience ? EExperience.OLD : EExperience.NEW,
      experienceInMonths: contextualFarmerSurvey?.experienceDuration?.toString() ?? '1',
    } satisfies CommoditySurveyDatum;

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL, datum);
    useRightDrawerStore.getState().toggle(false);
  }

  static async marketSurvey(notification: NotificationDatum, managementCompany: ManagementCompany) {
    const farmer = notification.ctx.farmer;
    const coolingUnit = notification.ctx.coolingUnit;
    if (!farmer || !coolingUnit) throw new Error();

    const movements = await ColdtivateService.getMovementsHistory({
      coolingUnit: coolingUnit.id,
      farmerId: farmer.id,
    });

    const movementDetails = movements.find(
      (movement) => movement.code === notification.datum.movementCode
    );
    if (!movementDetails || !movementDetails.marketSurveyDelay) throw new Error();

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

  static async reallocate(notification: NotificationDatum) {
    const coolingUnit = notification.ctx.coolingUnit;
    if (!coolingUnit) throw new Error();

    const movements = await ColdtivateService.getMovementsHistory({ coolingUnit: coolingUnit.id });

    const movementDetails = movements.find(
      (movement) => movement.id === notification.datum.specificId
    );
    if (!movementDetails) throw new Error();

    const datums = {
      movement: movementDetails,
      coolingUnit,
    } satisfies OrderRequiresMovementDatum;

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_ORDER_REQUIRES_MOVEMENT_MODAL, datums);
    useRightDrawerStore.getState().toggle(false);
  }
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom'], true);
