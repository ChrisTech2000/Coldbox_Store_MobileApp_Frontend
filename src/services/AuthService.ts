import { EAuthenticationEndpoints } from '#constants/api.routes';
import {
  type RequestPasswordResetParams,
  type SignInParams,
  type SignUpAsCompanyParams,
  type SignUpAsCoolingUserParams,
} from '#types/api.params';
import {
  type SignInResponse,
  type SignUpAsCompanyResponse,
  type SignUpAsCoolingUserResponse,
} from '#types/api.responses';
import HttpClient, { HttpClientOptions } from './HttpClient';

class AuthService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public signUpAsCompany = async (params: SignUpAsCompanyParams) => {
    try {
      const { data } = await this.post<SignUpAsCompanyResponse>(
        EAuthenticationEndpoints.SIGN_UP_AS_COMPANY_ENDPOINT,
        params
      );

      return data;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  public signUpAsCoolingUser = async (params: SignUpAsCoolingUserParams) => {
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
      console.log(JSON.stringify(error));
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
      console.log(JSON.stringify(error));
    }
  };

  public requestResetPassword = async (params: RequestPasswordResetParams) => {
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
      console.log(JSON.stringify(error));
    }
  };
}

export default new AuthService();
