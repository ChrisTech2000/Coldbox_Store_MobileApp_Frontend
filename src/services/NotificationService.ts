import type { AxiosError } from 'axios';

import { ENotificationsEndpoints } from '#constants/api.routes';
import type { GetNotificationsResponse } from '#types/api.responses';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs } from './utils';

class NotificationService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public getNotifications = async (userId: number) => {
    try {
      const { data } = await this.get<GetNotificationsResponse>(
        ENotificationsEndpoints.GET_NOTIFICATIONS,
        { params: { userId } }
      );
      return data;
    } catch (exception) {
      const customError: CustomError = ErrorUtil.handleAxiosError(exception as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public updateNotificationStatus = async (notificationId: number) => {
    try {
      const { data } = await this.put<GetNotificationsResponse[0]>(
        subs(ENotificationsEndpoints.UPDATE_NOTIFICATION, { notificationId }),
        { seen: true }
      );
      return data;
    } catch (exception) {
      const customError: CustomError = ErrorUtil.handleAxiosError(exception as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new NotificationService();
