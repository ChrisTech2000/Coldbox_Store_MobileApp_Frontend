import { EAuthenticationEndpoints } from '#constants/api.routes';
import {
  type SignUpAsCompanyParams,
  type SignInParams,
  type SignUpAsCoolingUserParams,
} from '#types/api.params';
import {
  type SignUpAsCompanyResponse,
  type SignInResponse,
  type SignUpAsCoolingUserResponse,
} from '#types/api.responses';
import merge from 'lodash/merge';
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
    const _params = merge(params, { createUser: true, parentName: '' });

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

  public signOut = () => {
    // TODO: implement
  };

  public resetPassword = () => {
    // TODO: implement
  };
}

export default new AuthService();
