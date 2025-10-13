import type { AxiosError } from 'axios';
import snakeCase from 'lodash/snakeCase';

import {
  ECompanyEndpoints,
  EOperationEndpoints,
  EPredictionEndpoints,
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
  AddMarketSurveyParams,
  AddCoolingUnitParams,
  GetCoolingUnitParams,
  EditCoolingUnitParams,
  GetRevenueAnalysisParams,
  AddCoolingUnitTemperatureParams,
  GetPredictionParams,
  GetPredictionTableParams,
  GetCoolingUnitSensorDataParams,
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
  GetCoolingUnitResponse,
  AddMarketSurveyResponse,
  GetCoolingUnitCapacityResponse,
  GetCoolingUnitTemperaturesResponse,
  GetCoolingUnitSensorDataResponse,
} from '#types/api.responses';
import type {
  Company,
  CoolingUnit,
  Crate,
  DashboardProduce,
  Farmer,
  PredictionData,
  PredictionParams,
  PredictionTableData,
  User,
} from '#types/global';
import type { WithRequired } from '#types/miscellaneous';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { serialize, subs, query } from './utils';
import { format } from 'date-fns';

class ColdtivateService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  /* ============================================================
   *                  DASHBOARD
   * ============================================================ */
  public getCompanies = async (params?: {
    isMarketplace: boolean;
  }): Promise<Array<Company> | undefined> => {
    try {
      const { data } = await this.get<Array<Company>>(
        query(ECompanyEndpoints.GET_COMPANIES, {
          marketplaceFilterScoped: params?.isMarketplace,
        })
      );
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

  public getDashboardProduces = async (
    params: GetDashboardProducesParams
  ): Promise<Array<DashboardProduce> | undefined> => {
    try {
      const url = subs(EStorageEndpoints.GET_COOLING_UNIT_PRODUCES, {
        coolingUnitId: params.coolingUnit,
      });
      const { data } = await this.get<Array<DashboardProduce>>(url);
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
      const url = subs(EStorageEndpoints.GET_FARMER_COOLING_UNIT_PRODUCES, {
        coolingUnitId: params.coolingUnit,
        farmerId: params.farmerId,
      });
      const { data } = await this.get<Array<DashboardProduce>>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  FARMER METHODS
   * ============================================================ */
  public getFarmerByUserId = async (userId: number): Promise<GetFarmerResponse | undefined> => {
    try {
      const { data } = await this.get<GetFarmerResponse>(EUserEndpoints.GET_FARMER, {
        params: { userId },
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmerById = async (farmerId: number) => {
    try {
      const { data } = await this.get<Omit<Farmer, 'coolingUnits' | 'companies'> | undefined>(
        subs(EUserEndpoints.UPDATE_FARMER, { farmerId })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmers = async (): Promise<GetFarmerResponse | undefined> => {
    try {
      const { data } = await this.get<GetFarmerResponse>(EUserEndpoints.GET_FARMER);
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

  public getFarmerByUserCode = async (userCode: string): Promise<Farmer> => {
    try {
      const params = { user_code: userCode };
      const { data } = await this.get<Farmer>(EUserEndpoints.GET_FARMER_BY_CODE, { params });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public updateFarmerCompany = async (params: UpdateFarmerCompany) => {
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
  };

  public addMarketSurvey = async (
    params: AddMarketSurveyParams
  ): Promise<AddMarketSurveyResponse | undefined> => {
    try {
      const { data } = await this.post<AddMarketSurveyResponse>(
        EOperationEndpoints.ADD_MARKET_SURVEY,
        params
      );
      return data;
    } catch (error) {
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
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  CRATE MANAGEMENT METHODS
   * ============================================================ */
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

  public checkOut = async (params: CheckOutParams): Promise<CheckOutResponse> => {
    try {
      const { data } = await this.post<CheckOutResponse>(EOperationEndpoints.CHECK_OUT, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public sendCheckOutSmsReport = async (movement_id: number): Promise<void> => {
    try {
      const url = subs(EOperationEndpoints.SEND_CHECK_OUT_SMS_REPORT, { movement_id });
      await this.post(url, {});
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public checkIn = async (params: CheckInParams): Promise<CheckInResponse> => {
    const _params = {
      ...params,
      produces: JSON.stringify(serialize(params.produces)),
    };

    try {
      const { data } = await this.post<CheckInResponse>(EOperationEndpoints.CHECK_IN, _params);
      return data;
    } catch (error) {
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
        undefined
      );
      return data;
    } catch (error) {
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
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  MOVEMENTS METHODS
   * ============================================================ */
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
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  LOCATIONS METHODS
   * ============================================================ */
  public getLocation = async (params: GetLocationParams): Promise<GetLocationResponse> => {
    try {
      const url = subs(EStorageEndpoints.GET_LOCATION, { locationId: params.locationId });
      const { data } = await this.get<GetLocationResponse>(url, {
        params: { company: params.companyId },
      });
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

  public addLocation = async (params: AddLocationParams): Promise<AddLocationResponse> => {
    try {
      const { data } = await this.post<AddLocationResponse>(
        EStorageEndpoints.GET_MANAGEMENT_LOCATIONS,
        params
      );
      return data;
    } catch (error) {
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
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getPublicAndVisitedLocations = async (farmerId: number) => {
    try {
      const { data } = await this.get<Array<GetLocationResponse>>(
        EStorageEndpoints.GET_MANAGEMENT_LOCATIONS,
        {
          params: { farmerId },
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  OPERATORS METHODS
   * ============================================================ */
  public getOperators = async (companyId: number): Promise<Array<GetOperatorsResponse>> => {
    try {
      const params = { company: companyId };
      const { data } = await this.get<Array<GetOperatorsResponse>>(EUserEndpoints.GET_OPERATORS, {
        params,
      });
      return data;
    } catch (error) {
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
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public sendOperatorInvitation = async (params: SendOperatorInvitationParams) => {
    try {
      const { phone, coolingUnits, userId, recaptchaToken } = params;
      const { data } = await this.post<Array<GetOperatorsResponse>>(
        EUserEndpoints.INVITE_OPERATOR,
        {
          coolingUnits,
          userId,
          phone,
          recaptcha_response: recaptchaToken,
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  EMPLOYEE & COMPANY METHODS
   * ============================================================ */
  public sendEmployeeInvitation = async (params: SendOperatorInvitationParams) => {
    try {
      const { phone, coolingUnits, userId, recaptchaToken } = params;
      const { data } = await this.post<Array<GetOperatorsResponse>>(
        EUserEndpoints.INVITE_EMPLOYEE,
        {
          coolingUnits,
          userId,
          phone,
          recaptcha_response: recaptchaToken,
        }
      );
      return data;
    } catch (error) {
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
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  USER METHODS
   * ============================================================ */
  public updateUser = async (params: WithRequired<UpdateUserParams, 'userId'>): Promise<User> => {
    try {
      const { userId, ...rest } = params;
      rest.lastLogin = new Date().toISOString();
      rest.coolingUnits = params.coolingUnits ?? null;

      const url = subs(EUserEndpoints.UPDATE_USER, { userId });
      const { data } = await this.put<User>(url, rest);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public deleteUser = async (userId: number): Promise<Record<string, string>> => {
    try {
      const url = subs(EUserEndpoints.UPDATE_USER, { userId });
      const { data } = await this.delete<Record<string, string>>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public operatorProxyUserDelete = async (userId: number): Promise<Record<string, string>> => {
    try {
      const url = subs(EUserEndpoints.OPERATOR_PROXY_USER_DELETE, { userId });
      const { data } = await this.delete<Record<string, string>>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getUser = async (userId: number): Promise<User> => {
    try {
      const { data } = await this.get<User>(subs(EUserEndpoints.UPDATE_USER, { userId }));
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getUsers = async (): Promise<Array<User>> => {
    try {
      const { data } = await this.get<Array<User>>(subs(EUserEndpoints.GET_USERS, {}));
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  COOLING UNIT METHODS
   * ============================================================ */
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
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addCoolingUnit = async (params: AddCoolingUnitParams): Promise<GetCoolingUnitResponse> => {
    try {
      const { data } = await this.post<GetCoolingUnitResponse>(
        EStorageEndpoints.GET_COOLING_UNITS,
        params,
        undefined,
        ['deviceRtcTime', 'deviceSettings', 'deviceTimeStamp']
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnit = async (params: GetCoolingUnitParams): Promise<GetCoolingUnitResponse> => {
    try {
      const url = subs(EStorageEndpoints.GET_COOLING_UNIT, { coolingUnitId: params.coolingUnitId });
      const { data } = await this.get<GetCoolingUnitResponse>(url, {
        params:
          'companyId' in params ? { company: params.companyId } : { operator: params.operatorId },
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnitSensorData = async (
    params: GetCoolingUnitSensorDataParams
  ): Promise<GetCoolingUnitSensorDataResponse> => {
    try {
      const url = subs(EStorageEndpoints.GET_COOLING_UNIT_SENSOR_DATA, {
        coolingUnitId: params.coolingUnitId,
      });
      const { data } = await this.get<GetCoolingUnitSensorDataResponse>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public editCoolingUnit = async (
    params: EditCoolingUnitParams,
    coolingUnitId: number
  ): Promise<GetCoolingUnitResponse> => {
    try {
      const { data } = await this.put<GetCoolingUnitResponse>(
        subs(EStorageEndpoints.GET_COOLING_UNIT, { coolingUnitId }),
        params,
        undefined,
        ['deviceRtcTime', 'deviceSettings', 'deviceTimeStamp']
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public deleteCoolingUnit = async (coolingUnitId: number) => {
    try {
      const { data } = await this.delete(
        subs(EStorageEndpoints.GET_COOLING_UNIT, { coolingUnitId })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnitCapacity = async (
    coolingUnitId: number
  ): Promise<GetCoolingUnitCapacityResponse> => {
    try {
      const { data } = await this.get<GetCoolingUnitCapacityResponse>(
        EStorageEndpoints.GET_CAPACITY,
        {
          params: { coolingUnit: coolingUnitId },
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnitTemperatures = async (coolingUnitId: number) => {
    try {
      const { data } = await this.get<GetCoolingUnitTemperaturesResponse>(
        EStorageEndpoints.GET_TEMPERATURES,
        {
          params: { coolingUnit: coolingUnitId },
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addCoolingUnitTemperature = async (params: AddCoolingUnitTemperatureParams) => {
    try {
      const { data } = await this.post(EStorageEndpoints.ADD_COOLING_UNIT_TEMPERATURE, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getPublicAndVisitedCoolingUnits = async (farmerId: number) => {
    try {
      const { data } = await this.get<Array<GetCoolingUnitResponse>>(
        EStorageEndpoints.GET_COOLING_UNITS,
        {
          params: { farmerId },
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                  ANALYSIS METHODS
   * ============================================================ */
  public getUsageAnalysis = async (
    coolingUnits: number | number[]
  ): Promise<GetMovementsHistoryResponse> => {
    try {
      const { data } = await this.get<GetMovementsHistoryResponse>(
        query(EOperationEndpoints.GET_COOLING_UNIT_USAGE, { coolingUnits })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getRevenueAnalysis = async (
    params: GetRevenueAnalysisParams
  ): Promise<GetMovementsHistoryResponse> => {
    try {
      const { coolingUnits, paymentMethods } = params;
      const _params = {
        coolingUnits: typeof coolingUnits === 'number' ? coolingUnits : coolingUnits.join(','),
        paymentMethods: paymentMethods.join(','),
      };

      const { data } = await this.get<GetMovementsHistoryResponse>(
        EOperationEndpoints.GET_COOLING_UNIT_REVENUE,
        { params: _params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  /* ============================================================
   *                 MARKET PREDICTION METHODS
   * ============================================================ */
  public getPredictionParams = async (country: 'IN' | 'NG'): Promise<PredictionParams> => {
    try {
      const { data } = await this.get<PredictionParams>(
        country === 'IN'
          ? EPredictionEndpoints.GET_PREDICTION_PARAMS_IN
          : EPredictionEndpoints.GET_PREDICTION_PARAMS_NG
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getPrediction = async (params: GetPredictionParams): Promise<PredictionData> => {
    try {
      const { country, cropId, stateId, marketId } = params;
      const endpoint =
        country === 'IN'
          ? EPredictionEndpoints.GET_PREDICTION_IN
          : EPredictionEndpoints.GET_PREDICTION_NG;
      const { data } = await this.post<PredictionData>(
        endpoint,
        { stateId, cropId, marketId },
        undefined,
        ['stateId', 'cropId', 'marketId']
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getPredictionTable = async (
    params: GetPredictionTableParams
  ): Promise<PredictionTableData> => {
    try {
      const { country, cropId, statesIds, days, marketsIds } = params;
      const formattedDates = days.map((date) => format(new Date(date), 'yyyy-MM-dd'));

      const { data } = await this.post<PredictionTableData>(
        country === 'IN'
          ? EPredictionEndpoints.GET_PREDICTION_TABLE_IN
          : EPredictionEndpoints.GET_PREDICTION_TABLE_NG,
        {
          cropId,
          statesIds: statesIds?.map((id) => id.toString()),
          marketsIds: marketsIds?.map((id) => id.toString()),
          days: formattedDates,
        },
        undefined,
        ['statesIds', 'cropId', 'marketsIds']
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
