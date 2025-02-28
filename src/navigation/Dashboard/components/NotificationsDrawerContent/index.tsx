import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, View, useWindowDimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ms from 'ms';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';
import * as BottomSheet from '#ui/components/BottomSheet';

import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import { MovementDiagram } from '#screens/Dashboard/Main/History/components/MovementDiagram';
import { formatFloat } from '#screens/Dashboard/Main/components/FarmerSurveyModal/schema';

import { useTranslationUtils } from '#i18n/utils';
import type { GetAllCropsResponse, GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, type Crop, type FarmerSurvey } from '#types/global';
import InAppNotifications from '#common/InAppNotifications';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import ColdtivateService from '#services/ColdtivateService';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import type { ProcessedNotifications } from '../../lib/notifications';
import {
  NotificationBase,
  FarmerSurveyNotification,
  MarketSurveyNotification,
  OrderRequiresMovementNotification,
} from './components/NotificationItem';

export type Notifications = ProcessedNotifications['notifications'];

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

function _getDefaultDrawerWidth(height: number, width: number) {
  /*
   * Default drawer width is screen width - header height
   * with a max width of 280 on mobile and 320 on tablet
   * https://material.io/components/navigation-drawer
   */
  const smallerAxisSize = Math.min(height, width);
  const isLandscape = width > height;
  const isTablet = smallerAxisSize >= 600;
  const appBarHeight = Platform.OS === 'ios' ? (isLandscape ? 32 : 44) : 56;
  const maxWidth = isTablet ? 320 : 280;

  return Math.min(smallerAxisSize - appBarHeight, maxWidth);
}

function NotificationsDrawerContent(props: { notifications: Notifications }) {
  const { notifications } = props;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [farmerSurveyDatums, setFarmerSurveyDatums] = useState<CommoditySurveyDatum | undefined>(
    undefined
  );
  const [orderDatum, setOrderDatum] = useState<OrderRequiresMovementDatum | undefined>(undefined);
  const [modalRef] = BottomSheet.useBottomSheet();

  const modalTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const windowDimensions = useWindowDimensions();
  const estimatedListSize = useMemo(
    () => ({
      height: windowDimensions.height,
      width: _getDefaultDrawerWidth(windowDimensions.height, windowDimensions.width),
    }),
    [windowDimensions.height, windowDimensions.width]
  );

  useEffect(() => {
    return () => {
      if (modalTimeout.current) clearTimeout(modalTimeout.current);
    };
  }, []);

  return (
    <View tw="flex-1 justify-start">
      <View tw="p-4 bg-zinc-100 border-b-0.5 border-zinc-500">
        <Text variant="TitleRegular">{t('Dashboard.Notifications.text.notifications')}</Text>
      </View>

      <FlashList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(item) => `notification-#${item.datum.id}`}
        renderItem={({ item }) => {
          switch (item.datum.eventType) {
            case 'FARMER_SURVEY':
              return (
                <FarmerSurveyNotification notification={item} onSelect={setFarmerSurveyDatums} />
              );
            case 'MARKET_SURVEY':
              return (
                <MarketSurveyNotification
                  notification={item}
                  onSelect={(value) => {
                    // FYK -> redirects to market survey screen
                    emitter.emit(APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_SURVEY, value);
                  }}
                />
              );
            case 'ORDER_REQUIRES_MOVEMENT':
              return (
                <OrderRequiresMovementNotification
                  notification={item}
                  onSelect={(value) => {
                    setOrderDatum(value);
                    modalRef.current?.open();
                  }}
                />
              );
            default:
              return <NotificationBase item={item.datum} />;
          }
        }}
        estimatedItemSize={20}
        estimatedListSize={estimatedListSize}
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
                    averagePrice: Number(formatFloat(values.averagePrice)),
                    unit: values.unitOfMeasurement,
                    quantityTotal: Number(
                      formatFloat(values.weightDistribution.totalProducedWeekly)
                    ),
                    quantityBelowMarketPrice: Number(
                      formatFloat(values.weightDistribution.quantityLost)
                    ),
                    quantitySelfConsumed: Number(
                      formatFloat(values.weightDistribution.quantitySelfConsumed)
                    ),
                    quantitySold: Number(formatFloat(values.weightDistribution.quantitySold)),
                    averageSeasonInMonths: null,
                    kgInUnit: Number(formatFloat(values.unitaryWeight as string)),
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
              toast.show(t('navigation.error.serverErrorMessage', { type: 'md_danger' }));
              reportCrash(exception as Error);
            }
          }}
        />
      ) : null}

      {typeof orderDatum !== 'undefined' ? (
        <BottomSheet.Root
          ref={modalRef}
          onClose={() => {
            modalTimeout.current = setTimeout(() => setOrderDatum(undefined), ms('3 seconds'));
          }}
        >
          <BottomSheet.Content>
            <MovementDiagram
              movement={orderDatum!.movement}
              coolingUnit={orderDatum!.coolingUnit}
            />
          </BottomSheet.Content>
        </BottomSheet.Root>
      ) : null}
    </View>
  );
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom'], true);
