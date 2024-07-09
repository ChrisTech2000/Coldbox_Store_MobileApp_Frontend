import type { AxiosError } from 'axios';

import { EOperationEndpoints, EStorageEndpoints, EUserEndpoints } from '#constants/api.routes';
import type {
  CheckOutParams,
  AddLocationParams,
  EditLocationParams,
  GetCoolingUnitsParams,
  GetDashboardProducesParams,
  GetFarmerCratesParams,
  GetFarmerDashboardProducesParams,
  GetFarmerParams,
  GetOperatorFarmersParams,
  GetLocationParams,
  CheckInParams,
  GetCoolingUnitCropsParams,
  UpdateUserParams,
  CheckInWithCodeParams,
} from '#types/api.params';
import type {
  AddLocationResponse,
  CheckInResponse,
  CheckInWithCodeResponse,
  CheckOutResponse,
  GetCoolingUnitCropsResponse,
  GetFarmerResponse,
  GetLocationResponse,
  GetOperatorsResponse,
} from '#types/api.responses';
import type { Company, CoolingUnit, Crate, DashboardProduce, User } from '#types/global';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { serialize, subs } from './utils';
import { WithRequired } from 'types/miscellaneous';

class ColdtivateService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  ///////// DASHBOARD
  public getCompanies = async (): Promise<Array<Company> | undefined> => {
    try {
      const { data } = await this.get<Array<Company>>(EStorageEndpoints.GET_COMPANIES, {});
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnits = async (
    params: GetCoolingUnitsParams
  ): Promise<Array<CoolingUnit> | undefined> => {
    try {
      const { data } = await this.get<Array<CoolingUnit>>(EStorageEndpoints.GET_COOLING_UNITS, {
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
  ): Promise<Array<DashboardProduce> | undefined> => {
    try {
      const { data } = await this.get<Array<DashboardProduce>>(
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
  ): Promise<Array<DashboardProduce> | undefined> => {
    try {
      const { data } = await this.get<Array<DashboardProduce>>(
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

  ///////// FARMER
  public getFarmer = async (params: GetFarmerParams): Promise<GetFarmerResponse | undefined> => {
    try {
      const { data } = await this.get<GetFarmerResponse>(EUserEndpoints.GET_FARMER, {
        params,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  ///////// CRATE MANAGEMENT
  public getOperatorFarmers = async (
    params: GetOperatorFarmersParams
  ): Promise<GetFarmerResponse | undefined> => {
    try {
      const { data } = await this.get<GetFarmerResponse>(EUserEndpoints.GET_FARMER, {
        params,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmerCrates = async (
    params: GetFarmerCratesParams
  ): Promise<Array<Crate> | undefined> => {
    try {
      const { data } = await this.get<Array<Crate>>(EStorageEndpoints.GET_FARMER_CRATES, {
        params,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnitCrops = async (
    params: GetCoolingUnitCropsParams
  ): Promise<GetCoolingUnitCropsResponse | undefined> => {
    try {
      const { data } = await this.get<GetCoolingUnitCropsResponse>(
        EStorageEndpoints.GET_COOLING_UNIT_CROPS,
        {
          params,
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public checkOut = async (params: CheckOutParams): Promise<CheckOutResponse> => {
    try {
      const { data } = await this.post<CheckOutResponse>(EOperationEndpoints.CHECK_OUT, params);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public checkIn = async (params: CheckInParams): Promise<CheckInResponse> => {
    const _params = {
      ...params,
      produces: JSON.stringify(serialize(params.produces, ['hasPicture'])),
    };

    try {
      const { data } = await this.post<CheckInResponse>(EOperationEndpoints.CHECK_IN, _params);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public checkInWithCode = async (
    params: CheckInWithCodeParams
  ): Promise<CheckInWithCodeResponse> => {
    try {
      const { data } = await this.post<CheckInWithCodeResponse>(
        EOperationEndpoints.MOVE_CHECKOUT,
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

  ///////// LOCATIONS
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

  public deleteLocation = async (locationId: number): Promise<Record<string, string>> => {
    try {
      const url = subs(EStorageEndpoints.GET_LOCATION, { locationId });
      const { data } = await this.delete<Record<string, string>>(url);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  ///////// OPERATORS
  public getOperators = async (companyId: number): Promise<Array<GetOperatorsResponse>> => {
    try {
      const params = { company: companyId };
      const { data } = await this.delete<Array<GetOperatorsResponse>>(
        EUserEndpoints.GET_OPERATORS,
        { params }
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getInvitedOperators = async (companyId: number): Promise<Array<GetOperatorsResponse>> => {
    try {
      const params = { company: companyId };
      const { data } = await this.delete<Array<GetOperatorsResponse>>(
        EUserEndpoints.GET_INVITED_OPERATORS,
        { params }
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getOperatorByUserId = async (userId: number): Promise<Array<GetOperatorsResponse>> => {
    try {
      const params = { user_id: userId };
      const { data } = await this.delete<Array<GetOperatorsResponse>>(
        EUserEndpoints.GET_OPERATORS,
        {
          params,
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

  public updateUser = async (params: WithRequired<UpdateUserParams, 'userId'>): Promise<User> => {
    try {
      const { userId, ...rest } = params;
      rest.lastLogin = new Date().toISOString();
      rest.coolingUnits = params.coolingUnits ?? null;

      const url = subs(EUserEndpoints.UPDATE_USER, { userId });
      const { data } = await this.put<User>(url, rest);
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
