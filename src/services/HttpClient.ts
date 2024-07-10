import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  type AxiosError,
  type AxiosRequestHeaders,
} from 'axios';

import { API_BASE_URL } from '#constants/environment';
import { useAuthStore, type Tokens } from '#stores/auth';

import { deserialize, serialize, type JsonArray, type JsonObject } from './utils';

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
      (response) => {
        response.data = deserialize(response.data);
        return response;
      },
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

  protected post<T>(
    url: string,
    data: JsonObject | JsonArray,
    config?: AxiosRequestConfig,
    unserializable?: string[]
  ): Promise<AxiosResponse<T>> {
    return this.axios.post<T>(url, serialize(data, unserializable), config);
  }

  protected get<T>(
    url: string,
    config?: AxiosRequestConfig,
    unserializable?: string[]
  ): Promise<AxiosResponse<T>> {
    return this.axios.get<T>(
      url,
      config ? { ...config, params: serialize(config?.params, unserializable) } : {}
    );
  }

  protected put<T>(
    url: string,
    data: JsonObject,
    config?: AxiosRequestConfig,
    unserializable?: string[]
  ): Promise<AxiosResponse<T>> {
    return this.axios.put<T>(url, serialize(data, unserializable), config);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.delete<T>(url, config);
  }

  protected patch<T>(
    url: string,
    data: JsonObject,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axios.patch<T>(url, serialize(data), config);
  }

  private _buildHeaders = (prevHeaders?: AxiosRequestHeaders) => {
    const headers = { ...prevHeaders } as AxiosRequestHeaders;
    const tokens = this.options.getAuthTokens();
    if (tokens.accessToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return headers;
  };
}
