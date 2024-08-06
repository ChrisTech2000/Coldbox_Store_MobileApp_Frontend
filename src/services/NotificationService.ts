import type { AxiosError } from 'axios';

import { ENotificationsEndpoints } from '#constants/api.routes';
import type { GetNotificationsResponse } from '#types/api.responses';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

class NotificationService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public getNotifications = async (userId: number) => {
    try {
      const { data } = await this.get<GetNotificationsResponse>(
        ENotificationsEndpoints.GET_NOTIFICATIONS,
        {
          params: { userId },
        }
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
