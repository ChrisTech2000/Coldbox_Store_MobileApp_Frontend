import isEmpty from 'lodash/isEmpty';
import ms from 'ms';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';

import { MovementDiagram } from '#screens/Dashboard/Main/History/components/MovementDiagram';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import type { GetAllCropsResponse, GetMovementsHistoryResponse } from '#types/api.responses';
import {
  type Company,
  type CoolingUnit,
  type Crop,
  type FarmerSurvey,
  type User,
} from '#types/global';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import ColdtivateService from '#services/ColdtivateService';
import NotificationService from '#services/NotificationService';
import { useAppEventListener } from '#ui/lib/emitter';
import { type ProcessedNotifications } from '../../lib/notifications';
import NotificationItem from './components/NotificationItem';

import { useRightDrawerStore } from '#navigation/Dashboard';
import type { NotificationOpenSurveyEventDatums } from '#navigation/Dashboard/lib/notifications';
import {
  getCompanyOwnerName,
  getCropInfo,
  getUserOwnerName,
} from '#screens/Dashboard/Main/History/utils/useMovementsData';
import { type ManagementCompany, useManagementStore } from '#stores/management';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { useMap, type UseMap } from '#ui/hooks/useMap';

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
  crops: Array<GetAllCropsResponse>;
  companies: Array<Company>;
  coolingUnit: CoolingUnit;
  users: Array<User>;
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

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
  const toast = InAppNotifications.useToast();

  const [farmerSurveyDatums, setFarmerSurveyDatums] = useState<CommoditySurveyDatum | undefined>(
    undefined
  );
  const [orderDatum, setOrderDatum] = useState<OrderRequiresMovementDatum | undefined>(undefined);
  const [usersMap, usersMapActions] = useMap<number, User>();

  const modalRef = useRef<Modalize>(null);
  const modalTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const isSurveyLoading = useSettingUpSurvey((store) => store.isLoading);

  const { data: crops } = useApiCall('getAllCrops', ColdtivateService.getAllCrops, undefined, {
    skip: !user?.id,
    defaultData: [],
  });

  const { data: companies } = useApiCall(
    'getCompanies',
    ColdtivateService.getCompanies,
    undefined,
    { skip: !user?.id, defaultData: [] }
  );

  useAppEventListener<[CommoditySurveyDatum]>(
    'DISPATCH_NOTIFICATION_OPEN_COMMODITY_MODAL',
    setFarmerSurveyDatums
  );

  useAppEventListener<[OrderRequiresMovementDatum]>(
    'DISPATCH_NOTIFICATION_ORDER_REQUIRES_MOVEMENT_MODAL',
    async (value) => {
      const { movement, crops, companies, users } = value;

      if (!isEmpty(movement.checkin)) {
        movement.checkin = {
          ...movement.checkin,
          ownerName: movement.checkin?.ownedOnBehalfOfCompanyId
            ? getCompanyOwnerName(movement.checkin?.ownedOnBehalfOfCompanyId, companies ?? [])
            : getUserOwnerName(movement.checkin?.ownedByUserId, users ?? []),
          crates: movement.checkin?.crates.map((crate) => ({
            ...crate,
            crop: getCropInfo(crate.cropId, crops ?? []),
          })),
        };
      }

      if (!isEmpty(movement.checkout)) {
        movement.checkout = {
          ...movement.checkout,
          crates: movement.checkout?.crates.map((crate) => ({
            ...crate,
            ownerName: crate.ownedOnBehalfOfCompanyId
              ? getCompanyOwnerName(crate.ownedOnBehalfOfCompanyId, companies ?? [])
              : getUserOwnerName(crate.ownedByUserId, users ?? []),
            crop: getCropInfo(crate.cropId, crops ?? []),
          })),
        };
      }

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

      <FlashList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={notifications}
        extraData={usersMap}
        keyExtractor={(item) => `notification-#${item.datum.id}`}
        renderItem={({ item }) => (
          <NotificationItem
            item={item.datum}
            updateStatusHandler={async () => {
              if (!item.datum.seen) {
                await NotificationService.updateNotificationStatus(item.datum.id);
              }
              switch (item.datum.eventType) {
                case 'FARMER_SURVEY': {
                  await NotificationHandlers.farmerSurvey(item, managementCompany, crops);
                  break;
                }
                case 'MARKET_SURVEY': {
                  await NotificationHandlers.marketSurvey(item, managementCompany, crops);
                  break;
                }
                case 'ORDER_REQUIRES_MOVEMENT': {
                  const datums = await NotificationHandlers.reallocate(
                    item,
                    crops,
                    companies ?? [],
                    usersMap
                  );
                  usersMapActions.setAll(datums);
                  break;
                }
                default:
                  break;
              }
            }}
          />
        )}
        estimatedItemSize={40}
        estimatedListSize={{ height: DEVICE_HEIGHT, width: DEVICE_WIDTH / 2 }}
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

    const isAlreadyFilledIn = surveyList.some(
      (item) => item.cropName.toLowerCase() === notification.datum.crates.crop.toLowerCase()
    );
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

  static async marketSurvey(
    notification: NotificationDatum,
    managementCompany: ManagementCompany,
    crops: Array<GetAllCropsResponse>
  ) {
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

    const isValidMovement =
      movementDetails &&
      movementDetails.checkout.marketSurveyDelay &&
      movementDetails.checkout?.crates?.[0]?.ownedByUserId;
    if (!isValidMovement) throw new Error();

    const owner = await ColdtivateService.getUser(
      movementDetails.checkout.crates[0].ownedByUserId!
    );

    const movementCropsForSurvey = movementDetails.checkout.crates.reduce(
      (acc, crate) => {
        const datum = getCropInfo(crate.cropId, crops ?? []);
        if (datum && !movementDetails.checkout.hasMarketSurvey.includes(crate.cropId)) {
          acc.push(datum);
        }
        return acc;
      },
      [] as Array<{ id: number; name: string }>
    );

    const datums = {
      eventType: 'MARKET_SURVEY',
      datums: {
        checkoutId: movementDetails.checkout.id,
        companyCurrency: managementCompany?.currency || 'NGN',
        crops: movementCropsForSurvey,
        owner: `${owner.firstName ?? ''} ${owner.lastName ?? ''}`,
      },
    } satisfies NotificationOpenSurveyEventDatums;

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_SURVEY, datums);
    useRightDrawerStore.getState().toggle(false);
  }

  static async reallocate(
    notification: NotificationDatum,
    crops: Array<GetAllCropsResponse>,
    companies: Array<Company>,
    usersMap: UseMap<number, User>
  ) {
    const coolingUnit = notification.ctx.coolingUnit;
    if (!coolingUnit) throw new Error();

    const movements = await ColdtivateService.getMovementsHistory({ coolingUnit: coolingUnit.id });

    const movementDetails = movements.find(
      (movement) => movement.id === notification.datum.specificId
    );
    if (!movementDetails) throw new Error();

    const checkOutUserIds = (movementDetails.checkout?.crates || []).reduce((acc, crate) => {
      if (crate.ownedByUserId && !crate.ownedOnBehalfOfCompanyId) {
        acc.push(crate.ownedByUserId);
      }
      return acc;
    }, [] as Array<number>);

    const userIdsToLoad = Array.from(
      new Set<number>([
        ...checkOutUserIds,
        ...(movementDetails.checkin?.ownedByUserId ? [movementDetails.checkin.ownedByUserId] : []),
      ])
    );

    const idsToFetch = userIdsToLoad.filter((id) => !usersMap.has(id));

    const newUsers =
      idsToFetch.length > 0
        ? await Promise.all(idsToFetch.map(async (id) => await ColdtivateService.getUser(id)))
        : [];

    const newUsersMap = new Map(usersMap);
    for (const user of newUsers) {
      newUsersMap.set(user.id, user);
    }

    const users = userIdsToLoad
      .map((id) => newUsersMap.get(id))
      .filter((user): user is User => !!user);

    const datums = {
      movement: movementDetails,
      coolingUnit,
      crops,
      companies,
      users,
    } satisfies OrderRequiresMovementDatum;

    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_ORDER_REQUIRES_MOVEMENT_MODAL, datums);
    useRightDrawerStore.getState().toggle(false);

    return newUsersMap;
  }
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom'], true);
