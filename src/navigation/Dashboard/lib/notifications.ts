import { useMemo } from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import moize from 'moize';
import ms from 'ms';

import { dateFmt, type Translator, useTranslationUtils } from '#i18n/utils';
import { ERoles, Farmer, type User } from '#types/global';
import NotificationService from '#services/NotificationService';
import { useAuthStore } from '#stores/auth';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAppEventListener } from '#ui/lib/emitter';
import ColdtivateService from '#services/ColdtivateService';
import type { CoolingUnit } from '#types/global';
import { stringToHash } from '#ui/lib/hash';

import type { MarketSurveyStackRoutes } from '../Main/HistoryTabStack/MarketSurveyStack';

class NotificationManager {
  private readonly _t: Translator;
  private readonly _userId?: number;
  private readonly _userRole?: ERoles;

  constructor(t: Translator, user: User | null) {
    this._t = t;
    this._userId = user?.id;
    this._userRole = user?.role;
  }

  public processNotifications = async (args: {
    farmers: Array<Farmer>;
    units: Array<CoolingUnit>;
  }) => {
    const { farmers, units } = args;

    const { notifications, newNotificationsCount } = await this._formatNotifications();

    return {
      newNotificationsCount,
      notifications: notifications.map((notification) => {
        const crates = notification?.crates || {};
        const farmerName = crates.farmer;
        const unitName = crates.coolingUnit;
        return {
          datum: notification,
          ctx: {
            farmer: farmerName ? (this._findFarmerByName(farmerName, farmers) ?? null) : null,
            coolingUnit: unitName ? (this._findUnitByName(unitName, units) ?? null) : null,
          },
        };
      }),
    };
  };

  private _formatNotifications = async () => {
    if (!this._userId) throw new Error();
    const result = await NotificationService.getNotifications(this._userId);

    let newNotificationsCount: number = 0;

    const notifications = (result ?? []).map((item) => {
      const isFarmer = this._userRole === ERoles.COOLING_USER;
      const crates = item.crates || {};
      const commonParams = {
        farmer: crates.farmer ?? '',
        crop: crates.crop ?? '',
        movementCode: item.movementCode ?? '',
      };

      let message: string | undefined, link: string | undefined;

      switch (item.eventType) {
        case 'SENSOR_ERROR': {
          message = this._t('Dashboard.Notifications.sensorError', {
            unitName: item.coolingUnitName,
          });
          break;
        }
        case 'TIME_TO_PICKUP': {
          message = isFarmer
            ? this._t('Dashboard.Notifications.pickup', {
                ...commonParams,
                unitId: crates.coolingUnit ?? '',
                checkIn: dateFmt(crates.checkinDate, 'yyyy-MM-dd'),
              })
            : this._t('Dashboard.Notifications.notifyCoolingUser', {
                ...commonParams,
                unitId: crates.coolingUnit ?? '',
                checkIn: dateFmt(crates.checkinDate, 'yyyy-MM-dd'),
              });
          break;
        }
        case 'MARKET_SURVEY': {
          message = this._t('Dashboard.Notifications.survey', commonParams);
          link = this._t('Dashboard.Notifications.link');
          break;
        }
        case 'FARMER_SURVEY': {
          message = isFarmer
            ? this._t('Dashboard.Notifications.coolingUserSurvey', { crop: crates.crop ?? '' })
            : this._t('Dashboard.Notifications.operatorSurvey', commonParams);
          link = this._t('Dashboard.Notifications.link');
          break;
        }
        case 'CHECKIN_EDITED': {
          const date = dateFmt(item.date, 'dd-MM-yyyy HH:mm');
          message = this._t('Dashboard.Notifications.checkIn', { ...commonParams, date });
          break;
        }
        case 'ORDER_REQUIRES_MOVEMENT': {
          message = this._t('Dashboard.Notifications.orderRequiresMovement');
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

  private _findUnitByName = moize(
    (unitName: string, units: Array<CoolingUnit>) => units.find(({ name }) => name === unitName),
    {
      maxAge: ms('5 seconds'),
      isSerialized: true,
      serializer: ([unitName, units]) => {
        const ids = (units as Array<CoolingUnit>).map(({ id }) => id).sort((a, b) => a - b);
        return [stringToHash([unitName, ids.join('.')].join('::'))];
      },
    }
  );

  private _findFarmerByName = moize(
    (farmerName: string, farmers: Array<Farmer>) =>
      farmers.find((farmer) => farmerName === `${farmer.user.firstName} ${farmer.user.lastName}`),
    {
      maxAge: ms('5 seconds'),
      isSerialized: true,
      serializer: ([farmerName, farmers]) => {
        const ids = (farmers as Array<Farmer>).map(({ id }) => id).sort((a, b) => a - b);
        return [stringToHash([farmerName, ids.join('.')].join('::'))];
      },
    }
  );
}

export type FormattedNotification = Awaited<
  ReturnType<NotificationManager['_formatNotifications']>
>['notifications'][0];

export type ProcessedNotifications = Awaited<
  ReturnType<NotificationManager['processNotifications']>
>;

export function useNotifications() {
  const user = useAuthStore((store) => store.user);
  const { t } = useTranslationUtils();

  const manager = useMemo(() => new NotificationManager(t, user), [t, user]);

  const { data: farmers, isLoading: isLoadingFarmers } = useApiCall(
    'getFarmers',
    ColdtivateService.getFarmers,
    undefined,
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  const { data: units, isLoading: isLoadingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {},
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  return useApiCall(
    'getNotifications',
    manager.processNotifications,
    { farmers: farmers!, units: units! },
    {
      skip: !user?.id || isLoadingFarmers || isLoadingUnits,
      defaultData: {
        notifications: [],
        newNotificationsCount: 0,
      },
      refreshInterval: ms('10 seconds'),
    }
  );
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
