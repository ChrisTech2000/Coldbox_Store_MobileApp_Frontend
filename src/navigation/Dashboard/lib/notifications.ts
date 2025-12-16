import { useMemo } from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import ms from 'ms';
import { useShallow } from 'zustand/react/shallow';

import { dateFmt, type Translator, useTranslationUtils, LanguageManager } from '#i18n/utils';
import { ERoles, type User } from '#types/global';
import NotificationService from '#services/NotificationService';
import { useAuthStore } from '#stores/auth';
import { useApiCall } from '#services/hooks/useAPiCall';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import type { MarketSurveyStackRoutes } from '../Main/HistoryTabStack/MarketSurveyStack';
import DataloaderService from '#services/DataloaderService';
import { formatCurrencyWithSymbol } from '#screens/Dashboard/Main/Dashboard/CheckIn/utils';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import type { TranslationLocales } from '#i18n/constants';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

class NotificationManager {
  private readonly _t: Translator;
  private readonly _userId?: number;
  private readonly _userRole?: ERoles;

  constructor(t: Translator, user: User | null) {
    this._t = t;
    this._userId = user?.id;
    this._userRole = user?.role;
  }

  public processNotifications = async (options: {
    country?: string;
    locale: TranslationLocales;
  }) => {
    const { notifications, newNotificationsCount } = await this._formatNotifications(options);

    return {
      newNotificationsCount,
      notifications: await Promise.all(
        notifications.map(async (notification) => {
          const crates = notification?.crates || {};
          return {
            datum: notification,
            ctx: {
              farmer: crates.farmerId
                ? ((await DataloaderService.farmers.getById(crates.farmerId)) ?? null)
                : null,
              user: crates.userId
                ? ((await DataloaderService.users.getById(crates.userId)) ?? null)
                : null,
              coolingUnit: crates.coolingUnitId
                ? ((await DataloaderService.coolingUnits.getById(crates.coolingUnitId)) ?? null)
                : null,
            },
          };
        })
      ),
    };
  };

  private _formatNotifications = async (options: {
    country?: string;
    locale: TranslationLocales;
  }) => {
    if (!this._userId) throw new Error();
    const result = await NotificationService.getNotifications(this._userId);

    let newNotificationsCount: number = 0;

    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();

    const notifications = (result ?? []).map((item) => {
      const isFarmer = this._userRole === ERoles.COOLING_USER;
      const crates = item.crates || {};
      const commonParams = {
        farmer: (crates.farmer ?? '').trim(),
        crop: find(lookupMap, {
          name: crates.crop ?? '',
          country: options.country,
          locale: options.locale,
        }),
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
            ? this._t('Dashboard.Notifications.coolingUserSurvey', { crop: commonParams.crop })
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
        case 'LISTING_PRICE_UPDATED': {
          message = this._t('Dashboard.Notifications.listingPriceUpdated', {
            crop: commonParams.crop,
            unitName: item.crates.coolingUnit,
            priceTag: formatCurrencyWithSymbol(
              item.marketListing?.currency ?? DEFAULT_CURRENCY_CODE,
              item.marketListing?.pricePerKg ?? 0
            ),
          });
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

export function useNotifications() {
  const user = useAuthStore((store) => store.user);
  const { t } = useTranslationUtils();

  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();
  const country = companyCountry || farmerCountry || undefined;

  const manager = useMemo(() => new NotificationManager(t, user), [t, user]);

  return useApiCall(
    'getNotifications',
    manager.processNotifications,
    { locale, country },
    {
      skip: !user?.id,
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
    APP_EVENTS.DISPATCH_NOTIFICATION_OPEN_SURVEY,
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
