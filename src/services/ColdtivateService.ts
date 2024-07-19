import type { AxiosError } from 'axios';
import snakeCase from 'lodash/snakeCase';

import {
  ECompanyEndpoints,
  EOperationEndpoints,
  EStorageEndpoints,
  EUserEndpoints,
} from '#constants/api.routes';
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
  UpdateCompanyParams,
  UpdateFarmerParams,
  GetCoolingUnitsByStatusParams,
  GetCheckOutParams,
  CheckOutWithCodeParams,
  GetFarmerSurveysParams,
  UpdateFarmerSurveysParams,
  GetCompanyEmployeeParams,
  UpdateFarmerCompany,
  RemoveCompanyParams,
  GetMovementsHistoryParams,
  EditCheckInParams,
  SendOperatorInvitationParams,
  AddCoolingUnitParams,
} from '#types/api.params';
import type {
  AddLocationResponse,
  CheckInResponse,
  GetCheckOutResponse,
  CheckOutResponse,
  GetCompanyEmployeesResponse,
  GetAllCropsResponse,
  GetCoolingUnitCropsResponse,
  GetFarmerResponse,
  GetLocationResponse,
  GetOperatorsResponse,
  GetCoolingUnitsByStatusResponse,
  CheckInWitCodeResponse,
  GetFarmerSurveysResponse,
  UpdateFarmerSurveysResponse,
  GetMovementsHistoryResponse,
  GetInvitedOperatorsResponse,
  GetMovementOperatorsResponse,
  GetInvitedCompanyEmployeesResponse,
  EditCheckInResponse,
} from '#types/api.responses';
import type { Company, CoolingUnit, Crate, DashboardProduce, Farmer, User } from '#types/global';
import type { WithRequired } from '#types/miscellaneous';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { serialize, subs } from './utils';

class ColdtivateService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  ///////// DASHBOARD
  public getCompanies = async (): Promise<Company[] | undefined> => {
    try {
      const { data } = await this.get<Company[]>(ECompanyEndpoints.GET_COMPANIES, {});
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCompanyById = async (companyId: number): Promise<Company> => {
    try {
      const url = subs(ECompanyEndpoints.GET_COMPANY, { companyId });
      const { data } = await this.get<Company>(url);
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

  public getFarmerSurveys = async (
    params: GetFarmerSurveysParams
  ): Promise<GetFarmerSurveysResponse | undefined> => {
    try {
      const { data } = await this.get<GetFarmerSurveysResponse>(EUserEndpoints.GET_FARMER_SURVEYS, {
        params,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public updateFarmerSurveys = async (
    params: UpdateFarmerSurveysParams
  ): Promise<UpdateFarmerSurveysResponse | undefined> => {
    try {
      const { farmer } = params;
      const url = subs(EUserEndpoints.UPDATE_FARMER_SURVEYS, { farmerId: farmer });
      const { data } = await this.put<UpdateFarmerSurveysResponse>(url, params);

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  async getFarmerByUserCode(userCode: string): Promise<Array<Farmer>> {
    try {
      const params = { user_code: userCode };
      const { data } = await this.get<Array<Farmer>>(EUserEndpoints.GET_FARMER, { params });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  }

  async updateFarmerCompany(params: UpdateFarmerCompany) {
    try {
      const url = subs(EUserEndpoints.UPDATE_FARMER, { farmerId: params.farmerId });
      const { data } = await this.put(url, {
        company_id: params.companyId,
        update_companies: true,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  }

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
    params: CheckOutWithCodeParams
  ): Promise<CheckInWitCodeResponse> => {
    try {
      const { data } = await this.post<CheckInWitCodeResponse>(
        EOperationEndpoints.MOVE_CHECKOUT,
        params,
        undefined,
        ['coolingUnitId']
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public editCheckIn = async (params: EditCheckInParams): Promise<EditCheckInResponse> => {
    try {
      const { id, ...rest } = params;
      const url = subs(EOperationEndpoints.EDIT_CHECK_IN, { id });
      const { data } = await this.put<EditCheckInResponse>(url, rest);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCheckOut = async (params: GetCheckOutParams): Promise<GetCheckOutResponse> => {
    try {
      const { data } = await this.get<GetCheckOutResponse>(EOperationEndpoints.MOVE_CHECKOUT, {
        params,
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getMovementsHistory = async (
    params: GetMovementsHistoryParams
  ): Promise<GetMovementsHistoryResponse> => {
    try {
      const { data } = await this.get<GetMovementsHistoryResponse>(
        EOperationEndpoints.GET_MOVEMENTS,
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

  public getMovementOperators = async (
    movementId: number
  ): Promise<GetMovementOperatorsResponse> => {
    try {
      const params = { movementId };
      const { data } = await this.get<GetMovementOperatorsResponse>(
        EStorageEndpoints.GET_OPERATORS,
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
      const { data } = await this.get<Array<GetOperatorsResponse>>(EUserEndpoints.GET_OPERATORS, {
        params,
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getInvitedOperators = async (
    companyId: number
  ): Promise<Array<GetInvitedOperatorsResponse>> => {
    try {
      const params = { company: companyId };
      const { data } = await this.get<Array<GetInvitedOperatorsResponse>>(
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
      const { data } = await this.get<Array<GetOperatorsResponse>>(EUserEndpoints.GET_OPERATORS, {
        params,
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public sendOperatorInvitation = async (params: SendOperatorInvitationParams) => {
    try {
      const { phone, coolingUnits, userId, message, url } = params;
      const { data } = await this.post<Array<GetOperatorsResponse>>(
        EUserEndpoints.INVITE_OPERATOR,
        {
          urlOne: url.partOne,
          urlTwo: url.partTwo,
          coolingUnits,
          userId,
          phone,
          ...message,
        },
        undefined,
        ['partOne', 'partTwo', 'urlOne', 'urlTwo']
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public sendEmployeeInvitation = async (params: SendOperatorInvitationParams) => {
    try {
      const { phone, coolingUnits, userId, message, url } = params;
      const { data } = await this.post<Array<GetOperatorsResponse>>(
        EUserEndpoints.INVITE_EMPLOYEE,
        {
          urlOne: url.partOne,
          urlTwo: url.partTwo,
          coolingUnits,
          userId,
          phone,
          ...message,
        },
        undefined,
        ['partOne', 'partTwo', 'urlOne', 'urlTwo']
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

  public getAllCrops = async (): Promise<Array<GetAllCropsResponse>> => {
    try {
      const { data } = await this.get<Array<GetAllCropsResponse>>(EStorageEndpoints.GET_ALL_CROPS);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public updateCompany = async (params: UpdateCompanyParams) => {
    try {
      const { companyId, logo, ...rest } = params;
      const formData = new FormData();

      for (const key in rest) {
        const name = snakeCase(key);
        const value = rest[key];
        if (Array.isArray(value)) {
          for (const item of value) {
            formData.append(name, item);
          }
          continue;
        }
        formData.append(name, value);
      }

      formData.append('digital_twin', rest.models.includes('digitalTwin'));
      formData.append('ML4_market', rest.models.includes('ml4Market'));
      formData.append('ML4_quality', rest.models.includes('ml4Quality'));
      formData.append('ML4_farmers', rest.models.includes('ml4Farmers'));

      formData.append('avatar', logo);
      if (logo) formData.append('logo', logo);

      const url = subs(ECompanyEndpoints.GET_COMPANY, { companyId });
      const { data } = await this.put(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public updateFarmer = async (params: UpdateFarmerParams): Promise<Farmer> => {
    try {
      const { farmerId, ...rest } = params;
      const url = subs(EUserEndpoints.UPDATE_FARMER, { farmerId });
      const { data } = await this.put<Farmer>(url, {
        ...rest,
        unserializable: ['updateUser'],
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCompanyEmployees = async (companyId: number): Promise<GetCompanyEmployeesResponse> => {
    try {
      const params = { company: companyId };
      const { data } = await this.get<GetCompanyEmployeesResponse>(
        EUserEndpoints.GET_COMPANY_EMPLOYEES,
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

  public getInvitedCompanyEmployees = async (
    companyId: number
  ): Promise<GetInvitedCompanyEmployeesResponse> => {
    try {
      const params = { company: companyId };
      const { data } = await this.get<GetInvitedCompanyEmployeesResponse>(
        EUserEndpoints.GET_INVITED_COMPANY_EMPLOYEES,
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

  public getCompanyEmployee = async (
    params: GetCompanyEmployeeParams
  ): Promise<GetCompanyEmployeesResponse[0]> => {
    try {
      const { registeredEmployeeId, companyId } = params;
      const url = subs(EUserEndpoints.GET_COMPANY_EMPLOYEE, { registeredEmployeeId });
      const { data } = await this.get<GetCompanyEmployeesResponse[0]>(url, {
        params: { company: companyId },
      });
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnitsByStatus = async (
    params: GetCoolingUnitsByStatusParams
  ): Promise<GetCoolingUnitsByStatusResponse> => {
    try {
      const shallow = { ...params };
      shallow.user = shallow.userId;
      delete shallow.userId;
      shallow.company = shallow.companyId;
      delete shallow.companyId;

      const { data } = await this.get<GetCoolingUnitsByStatusResponse>(
        EStorageEndpoints.GET_COOLING_UNITS,
        { params: shallow }
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public deleteUser = async (userId: number) => {
    try {
      const { data } = await this.delete(subs(EUserEndpoints.UPDATE_USER, { userId }));
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public removeCompany = async (params: RemoveCompanyParams) => {
    try {
      const _params = {
        companyId: params.companyId,
        deleteCompany: true,
      };
      const { data } = await this.patch(
        subs(EUserEndpoints.UPDATE_FARMER, { farmerId: params.farmerId }),
        _params
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addCoolingUnit = async (params: AddCoolingUnitParams) => {
    try {
      const { data } = await this.post(EStorageEndpoints.GET_COOLING_UNITS, params);
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
