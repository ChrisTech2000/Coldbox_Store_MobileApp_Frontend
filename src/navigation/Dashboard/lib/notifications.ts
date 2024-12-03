import { useShallow } from 'zustand/react/shallow';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import { dateFmt, type Translator, useTranslationUtils } from '#i18n/utils';
import { ERoles, type User } from '#types/global';
import NotificationService from '#services/NotificationService';
import { useAuthStore } from '#stores/auth';
import { type IApiQueryOptions, useApiCall } from '#services/hooks/useAPiCall';
import { useAppEventListener } from '#ui/lib/emitter';

import type { MarketSurveyStackRoutes } from '../Main/HistoryTabStack/MarketSurveyStack';

function _buildFetcher(t: Translator) {
  return async function fetchNotifications(user: User) {
    const result = await NotificationService.getNotifications(user.id);

    let newNotificationsCount: number = 0;

    const notifications = (result ?? []).map((item) => {
      const isFarmer = user.role === ERoles.COOLING_USER;
      const crates = item.crates || {};
      const commonParams = {
        farmer: crates.farmer ?? '',
        crop: crates.crop ?? '',
        movementCode: item.movementCode ?? '',
      };

      let message: string | undefined, link: string | undefined;

      switch (item.eventType) {
        case 'SENSOR_ERROR': {
          message = t('Dashboard.Notifications.sensorError', { unitName: item.coolingUnitName });
          break;
        }
        case 'TIME_TO_PICKUP': {
          message = isFarmer
            ? t('Dashboard.Notifications.pickup', {
                ...commonParams,
                unitId: crates.coolingUnit ?? '',
                checkIn: dateFmt(crates.checkinDate, 'yyyy-MM-dd'),
              })
            : t('Dashboard.Notifications.notifyCoolingUser', {
                ...commonParams,
                unitId: crates.coolingUnit ?? '',
                checkIn: dateFmt(crates.checkinDate, 'yyyy-MM-dd'),
              });
          break;
        }
        case 'MARKET_SURVEY': {
          message = t('Dashboard.Notifications.survey', commonParams);
          link = t('Dashboard.Notifications.link');
          break;
        }
        case 'FARMER_SURVEY': {
          message = isFarmer
            ? t('Dashboard.Notifications.coolingUserSurvey', { crop: crates.crop ?? '' })
            : t('Dashboard.Notifications.operatorSurvey', commonParams);
          link = t('Dashboard.Notifications.link');
          break;
        }
        case 'CHECKIN_EDITED': {
          const date = dateFmt(item.date, 'dd-MM-yyyy HH:mm');
          message = t('Dashboard.Notifications.checkIn', { ...commonParams, date });
          break;
        }
        case 'ORDER_REQUIRES_MOVEMENT': {
          message = t('Dashboard.Notifications.orderRequiresMovement');
          break;
        }
        default: {
          message = undefined;
          link = undefined;
          break;
        }
      }

      if (!item.seen) newNotificationsCount += 1;
      return { ...item, message, link };
    });

    return { notifications, newNotificationsCount };
  };
}

export type ProcessedNotifications = Awaited<ReturnType<ReturnType<typeof _buildFetcher>>>;

export function useNotifications(opts?: IApiQueryOptions<ProcessedNotifications>) {
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();

  return useApiCall('getNotifications', _buildFetcher(t), user!, {
    ...opts,
    skip: !user?.id,
    defaultData: {
      notifications: [],
      newNotificationsCount: 0,
    },
  });
}

export type NotificationOpenSurveyEventDatums = {
  eventType: 'MARKET_SURVEY';
  datums: MarketSurveyStackRoutes['MarketSurveyBase'];
};

export function useNotificationOpenSurveyListener() {
  // eslint-disable-next-line
  const navigation = useNavigation<NavigationProp<any>>();

  useAppEventListener<[NotificationOpenSurveyEventDatums]>(
    'DISPATCH_NOTIFICATION_OPEN_SURVEY',
    ({ eventType, datums }) => {
      switch (eventType) {
        case 'MARKET_SURVEY':
          return navigation.navigate('Main', {
            screen: 'History',
            params: {
              screen: 'MarketSurveyStack',
              params: {
                screen: 'MarketSurveyBase',
                params: datums,
              },
            },
          });
        default:
          return;
      }
    }
  );
}
