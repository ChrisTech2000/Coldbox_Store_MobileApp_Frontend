import { AxiosError } from 'axios';

import { EDashboardEndpoints } from '#constants/api.routes';
import {
  GetFarmerDashboardProducesParams,
  type GetDashboardProducesParams,
} from '#types/api.params';
import {
  GetDashboardProducesResponse,
  GetFarmerDashboardProducesResponse,
} from '#types/api.responses';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

class ColdtivateService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public getDashboardProduces = async (
    params: GetDashboardProducesParams
  ): Promise<GetDashboardProducesResponse | undefined> => {
    try {
      const { data } = await this.get<GetDashboardProducesResponse>(
        EDashboardEndpoints.GET_DASHBOARD_PRODUCTS,
        { params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmerDashboardProduces = async (
    params: GetFarmerDashboardProducesParams
  ): Promise<GetFarmerDashboardProducesResponse | undefined> => {
    try {
      const { data } = await this.get<GetFarmerDashboardProducesResponse>(
        EDashboardEndpoints.GET_DASHBOARD_PRODUCTS,
        { params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new ColdtivateService();
