import { EAuthenticationEndpoints } from '#constants/api.routes';
import { type SignUpAsCompanyParams, type SignInParams } from '#types/api.params';
import { type SignUpAsCompanyResponse, type SignInResponse } from '#types/api.responses';
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

  public signUpAsCoolingUser = () => {};

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
}

export default new AuthService();
