import axios, { type AxiosError, type AxiosRequestHeaders } from 'axios';

type Options = {
  baseURL: string;
  getAuthTokens: () => Promise<{ accessToken: string; refreshToken: string }>;
  onSessionRenewal: () => Promise<void>;
  onUnauthorized?: () => void;
  onForbidden?: () => void;
};

export type HttpClientOptions = Pick<
  Options,
  'onSessionRenewal' | 'onUnauthorized' | 'onForbidden'
>;

export default class HttpClient {
  public axios = axios.create();
  public options = {} as Options;

  constructor(options: HttpClientOptions) {
    this.updateOptions({
      ...options,
      baseURL: '', // TODO: load api endpoint from env vars
      getAuthTokens: async () => {
        // TODO: consume it from 'local' storage
        return {
          accessToken: '',
          refreshToken: '',
        };
      },
    });

    this.axios.interceptors.request.use(async (config) => {
      config.headers = await this._buildHeaders(config.headers);
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      async (exception: AxiosError) => {
        if (exception.response?.status === 401) {
          if (typeof this.options.onUnauthorized === 'function') {
            await this.options.onUnauthorized();
          }

          if (typeof this.options.onSessionRenewal !== 'function') {
            throw exception;
          }

          await this.options.onSessionRenewal();
          const headers = await this._buildHeaders();

          return this.axios.request({
            ...exception.config,
            headers: {
              ...exception.config?.headers,
              ...headers,
            },
          });
        }

        if (exception.response?.status === 403) {
          if (typeof this.options.onForbidden !== 'function') {
            throw exception;
          }

          await this.options.onForbidden();
        }

        return Promise.reject(exception);
      }
    );
  }

  public updateOptions = (options: Partial<Options>) => {
    this.options = { ...this.options, ...options };
    this.axios.defaults.baseURL = this.options.baseURL;
  };

  private _buildHeaders = async (prevHeaders?: AxiosRequestHeaders) => {
    const headers = { ...prevHeaders } as AxiosRequestHeaders;
    const tokens = await this.options.getAuthTokens();
    if (tokens.accessToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return headers;
  };
}
