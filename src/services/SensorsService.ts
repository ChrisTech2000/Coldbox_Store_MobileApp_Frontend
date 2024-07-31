import type { AxiosError } from 'axios';

import type {
  VerifyEcozenSensorConnectivityParams,
  VerifyFigorrSensorConnectivityParams,
  VerifyUbibotSensorConnectivityParams,
} from '#types/api.params';
import { ESensorEndpoints } from '#constants/api.routes';

import HttpClient from './HttpClient';
import ErrorUtil, { CustomError } from './utils/ErrorUtil';

class SensorsService extends HttpClient {
  public verifyEcozenSensorConnectivity = async (params: VerifyEcozenSensorConnectivityParams) => {
    try {
      const { data } = await this.post(ESensorEndpoints.ECOZEN_CHECK, {
        ...params,
        type: 'ecozen',
      });
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
      const { data } = await this.post(ESensorEndpoints.UBIBOT_CHECK, {
        ...params,
        type: 'ubibot',
      });
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
      const { data } = await this.post(ESensorEndpoints.FIGORR_CHECK, params);
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
