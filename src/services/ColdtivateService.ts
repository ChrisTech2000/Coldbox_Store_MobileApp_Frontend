import type { AxiosError } from 'axios';

import { EStorageEndpoints, EUserEndpoints } from '#constants/api.routes';
import type {
  AddLocationParams,
  EditLocationParams,
  GetCoolingUnitsParams,
  GetDashboardProducesParams,
  GetFarmerDashboardProducesParams,
  GetFarmerParams,
  GetLocationParams,
} from '#types/api.params';
import type {
  AddLocationResponse,
  GetFarmerResponse,
  GetLocationResponse,
} from '#types/api.responses';
import type { Company, CoolingUnit, DashboardProduce } from '#types/global';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs } from './utils';

class ColdtivateService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public getFarmer = async (params: GetFarmerParams): Promise<GetFarmerResponse[] | undefined> => {
    try {
      const { data } = await this.get<GetFarmerResponse[]>(EUserEndpoints.GET_FARMER, {
        params,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCompanies = async (): Promise<Company[] | undefined> => {
    try {
      const { data } = await this.get<Company[]>(EStorageEndpoints.GET_COMPANIES, {});
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnits = async (
    params: GetCoolingUnitsParams
  ): Promise<CoolingUnit[] | undefined> => {
    try {
      const { data } = await this.get<CoolingUnit[]>(EStorageEndpoints.GET_COOLING_UNITS, {
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
    params: GetDashboardProducesParams
  ): Promise<DashboardProduce[] | undefined> => {
    try {
      const { data } = await this.get<DashboardProduce[]>(
        EStorageEndpoints.GET_DASHBOARD_PRODUCTS,
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
        EStorageEndpoints.GET_DASHBOARD_PRODUCTS,
        { params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getLocations = async (companyId: number): Promise<Array<GetLocationResponse>> => {
    try {
      const params = { company: companyId };
      const { data } = await this.get<Array<GetLocationResponse>>(
        EStorageEndpoints.GET_MANAGEMENT_LOCATIONS,
        { params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getLocation = async (params: GetLocationParams): Promise<GetLocationResponse> => {
    try {
      const url = subs(EStorageEndpoints.GET_LOCATION, { locationId: params.locationId });
      const { data } = await this.get<GetLocationResponse>(url, {
        params: { company: params.companyId },
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addLocation = async (params: AddLocationParams): Promise<AddLocationResponse> => {
    try {
      const { data } = await this.post<AddLocationResponse>(
        EStorageEndpoints.GET_MANAGEMENT_LOCATIONS,
        params
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public editLocation = async (params: EditLocationParams): Promise<AddLocationResponse> => {
    try {
      const { locationId, ...rest } = params;
      const url = subs(EStorageEndpoints.GET_LOCATION, { locationId });
      const { data } = await this.put<AddLocationResponse>(url, rest);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new ColdtivateService();
