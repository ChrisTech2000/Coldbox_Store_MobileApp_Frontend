import HttpClient, { HttpClientOptions } from './HttpClient';

export default class AuthService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super(options);
  }

  public signUpAsCompany = () => {};

  public signUpAsCoolingUser = () => {};

  public signIn = () => {};
}
