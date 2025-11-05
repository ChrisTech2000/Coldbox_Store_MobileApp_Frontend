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

import HttpClient, { type HttpClientOptions, type ExtendedAxiosRequestConfig } from './HttpClient';
import RecaptchaService from './RecaptchaService';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

class AuthService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public signUpAsCompany = async (
    params: SignUpAsCompanyParams,
    recaptchaToken?: string | null
  ): Promise<SignUpAsCompanyResponse | undefined> => {
    try {
      // Add reCAPTCHA token to sign up request
      const requestData = recaptchaToken
        ? { ...params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(params);

      const { data } = await this.post<SignUpAsCompanyResponse>(
        EAuthenticationEndpoints.SIGN_UP_AS_COMPANY_ENDPOINT,
        requestData
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signUpAsCoolingUser = async (
    params: SignUpAsCoolingUserParams,
    recaptchaToken?: string | null
  ): Promise<SignUpAsCoolingUserResponse | undefined> => {
    const _params = {
      ...params,
      createUser: params?.createUser ?? true,
      parentName: params?.parentName ?? '',
    };

    try {
      // Add reCAPTCHA token to cooling user sign up request
      const requestData = recaptchaToken
        ? { ..._params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(_params);

      const { data } = await this.post<SignUpAsCoolingUserResponse>(
        EAuthenticationEndpoints.SIGN_UP_AS_COOLING_USER,
        requestData,
        undefined
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signIn = async (
    params: SignInParams,
    recaptchaToken?: string | null
  ): Promise<SignInResponse | undefined> => {
    try {
      // Add reCAPTCHA token to sign in request
      const requestData = recaptchaToken
        ? { ...params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(params);

      const { data } = await this.post<SignInResponse>(
        EAuthenticationEndpoints.SIGN_IN_ENDPOINT,
        requestData
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
        { refresh: refreshToken },
        { ignoreUnauthorized: true } as ExtendedAxiosRequestConfig // Don't trigger interceptor to prevent infinite loop
      );

      if (!data?.access) throw new Error('No valid access token provided');

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log('❌ Token refresh failed:', JSON.stringify(customError));
      throw customError;
    }
  };

  public requestResetPassword = async (
    params: RequestPasswordResetParams,
    recaptchaToken?: string | null
  ): Promise<string | undefined> => {
    const _params = {
      phoneNumber: params.phoneNumber,
    };

    try {
      // Add reCAPTCHA token to password reset request
      const requestData = recaptchaToken
        ? { ..._params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(_params);

      // No need to map the keys in this request (BE is expecting camel case...)
      const { data } = await this.axios.post<string>(
        EAuthenticationEndpoints.RESET_PASSWORD,
        requestData
      );

      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public resetPassword = async (
    params: ResetPasswordParams,
    recaptchaToken?: string | null
  ): Promise<void> => {
    try {
      const { phoneNumber, ...rest } = params;
      const _params = {
        ...rest,
        phone: phoneNumber,
      };

      // Add reCAPTCHA token to password reset confirmation request
      const requestData = recaptchaToken
        ? { ..._params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(_params);

      const { data } = await this.post<void>(EAuthenticationEndpoints.RESET_PASSWORD, requestData);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signUpEmployeeByInvite = async (
    params: SignupEmployeeByInviteParams,
    recaptchaToken?: string | null
  ) => {
    try {
      // Add reCAPTCHA token to employee invitation signup request
      const requestData = recaptchaToken
        ? { ...params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(params);

      const { data } = await this.post(
        EAuthenticationEndpoints.SIGN_UP_EMPLOYEE_BY_INVITE,
        requestData
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public signUpOperatorByInvite = async (
    params: SignupOperatorByInviteParams,
    recaptchaToken?: string | null
  ) => {
    try {
      // Add reCAPTCHA token to operator invitation signup request
      const requestData = recaptchaToken
        ? { ...params, recaptcha_response: recaptchaToken }
        : await RecaptchaService.prepareRequestWithRecaptcha(params);

      const { data } = await this.post(
        EAuthenticationEndpoints.SIGN_UP_OPERATOR_BY_INVITE,
        requestData
      );
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

  public logout = async (refreshToken: string): Promise<void> => {
    try {
      await this.post<void>(
        EAuthenticationEndpoints.LOGOUT_ENDPOINT,
        { refresh: refreshToken },
        { ignoreUnauthorized: true } as ExtendedAxiosRequestConfig // Don't trigger interceptor if already logged out
      );
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new AuthService();
