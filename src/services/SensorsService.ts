import type { AxiosError } from 'axios';

import { ESensorEndpoints } from '#constants/api.routes';
import type {
  ListUserSensorsParams,
  VerifyEcozenSensorConnectivityParams,
} from '#types/api.params';
import type { ListUserSensorsResponse } from '#types/api.responses';
import { ESensorType } from '#types/global';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

class SensorsService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public verifyEcozenSensorConnectivity = async (params: VerifyEcozenSensorConnectivityParams) => {
    try {
      const { data } = await this.post(
        ESensorEndpoints.ECOZEN_CHECK,
        {
          ...params,
          type: ESensorType.ECOZEN,
        },
        {
          // eslint-disable-next-line
          // @ts-ignore
          ignoreUnauthorized: true,
        },
        ['machineID']
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public listUserSensors = async (params: ListUserSensorsParams) => {
    try {
      const { data } = await this.post<ListUserSensorsResponse>(
        ESensorEndpoints.LIST_USER_SENSORS,
        params,
        {
          // eslint-disable-next-line
          // @ts-ignore
          ignoreUnauthorized: true,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new SensorsService();
