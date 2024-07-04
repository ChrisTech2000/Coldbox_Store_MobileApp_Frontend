import { AxiosError } from 'axios';

import { EStorageEndpoints, EUserEndpoints } from '#constants/api.routes';
import type {
  GetCoolingUnitsParams,
  GetDashboardProducesParams,
  GetFarmerCratesParams,
  GetFarmerDashboardProducesParams,
  GetFarmerParams,
  GetOperatorFarmersParams,
} from '#types/api.params';
import type { GetFarmerResponse, GetLocationsResponse } from '#types/api.responses';
import type { Company, CoolingUnit, Crate, DashboardProduce } from '#types/global';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

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

  public getOperatorFarmers = async (
    params: GetOperatorFarmersParams
  ): Promise<GetFarmerResponse[] | undefined> => {
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

  public getFarmerCrates = async (params: GetFarmerCratesParams): Promise<Crate[] | undefined> => {
    try {
      const { data } = await this.get<Crate[]>(EStorageEndpoints.GET_FARMER_CRATES, { params });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getLocations = async (companyId: number): Promise<GetLocationsResponse> => {
    try {
      const params = { company: companyId };
      const { data } = await this.get<GetLocationsResponse>(
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
}

export default new ColdtivateService();
