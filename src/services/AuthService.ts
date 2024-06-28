import { EAuthenticationEndpoints } from '#constants/api.routes';
import {
  RequestPasswordResetParams,
  SignInParams,
  SignUpAsCompanyParams,
  SignUpAsCoolingUserParams,
} from '#types/api.params';
import {
  SignInResponse,
  SignUpAsCompanyResponse,
  SignUpAsCoolingUserResponse,
} from '#types/api.responses';
import { AxiosError } from 'axios';

import HttpClient, { HttpClientOptions } from './HttpClient';
import ErrorUtil, { CustomError } from './utils/ErrorUtil';

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
      createUser: true,
      parentName: '',
      unserializable: ['createUser'],
    };

    try {
      const { data } = await this.post<SignUpAsCoolingUserResponse>(
        EAuthenticationEndpoints.SIGN_UP_AS_COOLING_USER,
        _params
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

  public requestResetPassword = async (
    params: RequestPasswordResetParams
  ): Promise<SignInResponse | undefined> => {
    const _params = {
      phoneNumber: params.phoneNumber,
      partOne: params.link.partOne,
      partTwo: params.link.partTwo,
    };

    try {
      // No need to map the keys in this request (BE is expecting camel case...)
      const { data } = await this.axios.post<SignInResponse>(
        EAuthenticationEndpoints.REQUEST_PASSWORD_RESET_ENDPOINT,
        _params
      );

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new AuthService();
