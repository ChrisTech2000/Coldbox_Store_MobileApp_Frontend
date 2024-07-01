import { AxiosError } from 'axios';

import { EDashboardEndpoints } from '#constants/api.routes';
import type {
  GetDashboardProducesParams,
  GetFarmerDashboardProducesParams,
  GetFarmerParams,
} from '#types/api.params';
import type { GetDashboardProducesResponse, GetFarmerResponse } from '#types/api.responses';
import type { DashboardProduce } from '#types/global';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

class ColdtivateService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public getFarmer = async (params: GetFarmerParams): Promise<GetFarmerResponse[] | undefined> => {
    try {
      const { data } = await this.get<GetFarmerResponse[]>(EDashboardEndpoints.GET_FARMER, {
        params,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getDashboardProduces = async (
    params: GetDashboardProducesParams[]
  ): Promise<GetDashboardProducesResponse | undefined> => {
    try {
      const { data } = await this.get<GetDashboardProducesResponse[]>(
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
  ): Promise<DashboardProduce[] | undefined> => {
    try {
      const { data } = await this.get<DashboardProduce[]>(
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
