import { useMemo } from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import snakeCase from 'lodash/snakeCase';

import { dateFmt, type Translator, useTranslationUtils } from '#i18n/utils';
import { ERoles, Farmer, type User } from '#types/global';
import NotificationService from '#services/NotificationService';
import { useAuthStore } from '#stores/auth';
import { type IApiQueryOptions, useApiCall } from '#services/hooks/useAPiCall';
import { useAppEventListener } from '#ui/lib/emitter';
import ColdtivateService from '#services/ColdtivateService';
import type { CoolingUnit } from '#types/global';

import type { MarketSurveyStackRoutes } from '../Main/HistoryTabStack/MarketSurveyStack';

class NotificationManager {
  private readonly _t: Translator;
  private readonly _userId: number;
  private readonly _userRole?: ERoles;

  constructor(t: Translator, user: User) {
    this._t = t;
    this._userId = user.id;
    this._userRole = user.role;
  }

  public processNotifications = async (args: {
    farmers: Array<Farmer>;
    units: Array<CoolingUnit>;
  }) => {
    const { farmers, units } = args;

    const { notifications, newNotificationsCount } = await this._formatNotifications();

    const _farmerKey = (user: User) => snakeCase(`${user.firstName} ${user.lastName}`);

    const farmerMap = new Map(farmers.map((farmer) => [_farmerKey(farmer.user), farmer]));
    const unitMap = new Map(units.map((unit) => [snakeCase(unit.name), unit]));

    return {
      newNotificationsCount,
      notifications: notifications.map((notification) => {
        const crates = notification?.crates || {};
        const farmerName = crates.farmer;
        const unitName = crates.coolingUnit;
        return {
          datum: notification,
          ctx: {
            farmer: farmerName ? (farmerMap.get(snakeCase(farmerName)) ?? null) : null,
            coolingUnit: unitName ? (unitMap.get(snakeCase(unitName)) ?? null) : null,
          },
        };
      }),
    };
  };

  private _formatNotifications = async () => {
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
}

export type FormattedNotification = Awaited<
  ReturnType<NotificationManager['_formatNotifications']>
>['notifications'][0];

export type ProcessedNotifications = Awaited<
  ReturnType<NotificationManager['processNotifications']>
>;

export function useNotifications(opts?: IApiQueryOptions<ProcessedNotifications>) {
  const user = useAuthStore((store) => store.user);
  const { t } = useTranslationUtils();

  const manager = useMemo(() => new NotificationManager(t, user!), [t, user?.id]);

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
      ...opts,
      skip: !user?.id || isLoadingFarmers || isLoadingUnits,
      defaultData: {
        notifications: [],
        newNotificationsCount: 0,
      },
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
