import type { AxiosError } from 'axios';

import type {
  VerifyEcozenSensorConnectivityParams,
  VerifyFigorrSensorConnectivityParams,
  VerifyUbibotSensorConnectivityParams,
  VerifyVictronSensorConnectivityParams,
} from '#types/api.params';
import { ESensorEndpoints } from '#constants/api.routes';
import type {
  VerifyFigorrSensorConnectivityResponse,
  VerifyUbibotSensorConnectivityResponse,
  VerifyVictronSensorConnectivityResponse,
} from '#types/api.responses';

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
          type: 'ecozen',
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

  public verifyUbibotSensorConnectivity = async (params: VerifyUbibotSensorConnectivityParams) => {
    try {
      const { data } = await this.post<VerifyUbibotSensorConnectivityResponse>(
        ESensorEndpoints.UBIBOT_CHECK,
        {
          ...params,
          type: 'ubibot',
        },
        {
          // eslint-disable-next-line
          // @ts-ignore
          ignoreUnauthorized: true,
        },
        ['accountKey', 'channelId']
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public verifyFigorrSensorConnectivity = async (params: VerifyFigorrSensorConnectivityParams) => {
    try {
      const { data } = await this.post<VerifyFigorrSensorConnectivityResponse>(
        ESensorEndpoints.FIGORR_CHECK,
        params,
        {
          // eslint-disable-next-line
          // @ts-ignore
          ignoreUnauthorized: true,
        },
        ['apiKey', 'deviceTag']
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public verifyVictronSensorConnectivity = async (
    params: VerifyVictronSensorConnectivityParams
  ) => {
    try {
      const { data } = await this.post<VerifyVictronSensorConnectivityResponse>(
        ESensorEndpoints.VICTRON_CHECK,
        params,
        {
          // eslint-disable-next-line
          // @ts-ignore
          ignoreUnauthorized: true,
        },
        [] // TODO: Add unserializable fields, if they exist
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
