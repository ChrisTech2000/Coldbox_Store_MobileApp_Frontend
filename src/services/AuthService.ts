import { AxiosError } from 'axios';

import { EAuthenticationEndpoints } from '#constants/api.routes';
import type {
  RequestPasswordResetParams,
  ResetPasswordParams,
  SignInParams,
  SignUpAsCompanyParams,
  SignUpAsCoolingUserParams,
  SignupEmployeeByInviteParams,
  SignupOperatorByInviteParams,
} from '#types/api.params';
import type {
  RefreshSessionResponse,
  SignInResponse,
  SignUpAsCompanyResponse,
  SignUpAsCoolingUserResponse,
} from '#types/api.responses';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

class AuthService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public signUpAsCompany = async (
    params: SignUpAsCompanyParams
  ): Promise<SignUpAsCompanyResponse | undefined> => {
    try {
      const { data } = await this.post<SignUpAsCompanyResponse>(
        EAuthenticationEndpoints.SIGN_UP_AS_COMPANY_ENDPOINT,
        params
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signUpAsCoolingUser = async (
    params: SignUpAsCoolingUserParams
  ): Promise<SignUpAsCoolingUserResponse | undefined> => {
    const _params = {
      ...params,
      createUser: params?.createUser ?? true,
      parentName: params?.parentName ?? '',
    };

    try {
      const { data } = await this.post<SignUpAsCoolingUserResponse>(
        EAuthenticationEndpoints.SIGN_UP_AS_COOLING_USER,
        _params,
        undefined,
        ['createUser']
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signIn = async (params: SignInParams): Promise<SignInResponse | undefined> => {
    try {
      const { data } = await this.post<SignInResponse>(
        EAuthenticationEndpoints.SIGN_IN_ENDPOINT,
        params
      );

      if (!data.access || !data.refresh) throw new Error('No valid token pair provided');

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public refreshToken = async (refreshToken: string): Promise<RefreshSessionResponse> => {
    try {
      const { data } = await this.post<RefreshSessionResponse>(
        EAuthenticationEndpoints.REFRESH_TOKEN_ENDPOINT,
        { refresh: refreshToken }
      );

      if (!data?.access) throw new Error('No valid access token provided');

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public requestResetPassword = async (
    params: RequestPasswordResetParams
  ): Promise<string | undefined> => {
    const _params = {
      phoneNumber: params.phoneNumber,
      partOne: params.link.partOne,
      partTwo: params.link.partTwo,
    };

    try {
      // No need to map the keys in this request (BE is expecting camel case...)
      const { data } = await this.axios.post<string>(
        EAuthenticationEndpoints.RESET_PASSWORD,
        _params
      );

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public resetPassword = async (params: ResetPasswordParams): Promise<void> => {
    try {
      const { data } = await this.post<void>(EAuthenticationEndpoints.RESET_PASSWORD, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signUpEmployeeByInvite = async (params: SignupEmployeeByInviteParams) => {
    try {
      const { data } = await this.post(EAuthenticationEndpoints.SIGN_UP_EMPLOYEE_BY_INVITE, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signUpOperatorByInvite = async (params: SignupOperatorByInviteParams) => {
    try {
      const { data } = await this.post(EAuthenticationEndpoints.SIGN_UP_OPERATOR_BY_INVITE, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getBackendAndroidVersion = async (): Promise<number> => {
    try {
      const { data } = await this.get<number>(EAuthenticationEndpoints.BACKEND_ANDROID_VERSION);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getBackendIOSVersion = async (): Promise<number> => {
    try {
      const { data } = await this.get<number>(EAuthenticationEndpoints.BACKEND_IOS_VERSION);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new AuthService();
