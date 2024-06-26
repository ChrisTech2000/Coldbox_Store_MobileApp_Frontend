import axios, { type AxiosError, type AxiosRequestHeaders } from 'axios';

import { type Tokens, useAuthStore } from '#stores/auth';
import { API_BASE_URL } from '#constants/environment';

type Options = {
  baseURL: string;
  getAuthTokens: () => Tokens;
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

  constructor(options?: HttpClientOptions) {
    this.updateOptions({
      ...options,
      baseURL: API_BASE_URL,
      getAuthTokens: () => {
        const storedTokens = useAuthStore.getState().tokens;
        if (storedTokens) return storedTokens;
        return { accessToken: '', refreshToken: '' };
      },
    });

    this.axios.interceptors.request.use(async (config) => {
      config.headers = this._buildHeaders(config.headers);
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => response,
      async (exception: AxiosError) => {
        if (exception.response?.status === 401) {
          if (typeof this.options.onUnauthorized === 'function') {
            this.options.onUnauthorized();
          }

          if (typeof this.options.onSessionRenewal !== 'function') {
            throw exception;
          }

          await this.options.onSessionRenewal();
          const headers = this._buildHeaders();

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

          this.options.onForbidden();
        }

        return Promise.reject(exception);
      }
    );
  }

  public updateOptions = (options: Partial<Options>) => {
    this.options = { ...this.options, ...options };
    this.axios.defaults.baseURL = this.options.baseURL;
  };

  private _buildHeaders = (prevHeaders?: AxiosRequestHeaders) => {
    const headers = { ...prevHeaders } as AxiosRequestHeaders;
    const tokens = this.options.getAuthTokens();
    if (tokens.accessToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return headers;
  };
}
