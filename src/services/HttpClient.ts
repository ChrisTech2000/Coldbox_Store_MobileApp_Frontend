import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestHeaders,
} from 'axios';

import { API_BASE_URL } from '#constants/environment';
import { useAuthStore, type Tokens } from '#stores/auth';

import { deserialize, Json, serialize, type JsonArray, type JsonObject } from './utils';

// Extend AxiosRequestConfig to include custom properties
export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  ignoreUnauthorized?: boolean;
  _retry?: boolean;
}

type Options = {
  baseURL: string;
  getTokens: () => Tokens;
  onUnauthorized?: () => void;
  onForbidden?: () => void;
};

type RequestBody = JsonObject | JsonArray | FormData;

export type HttpClientOptions = Pick<Options, 'onUnauthorized' | 'onForbidden' | 'baseURL'>;

export default class HttpClient {
  public axios = axios.create();
  public options = {} as Options;

  constructor(options?: HttpClientOptions) {
    this.updateOptions({
      baseURL: API_BASE_URL,
      getTokens: () => {
        const storedTokens = useAuthStore.getState().tokens;
        return {
          accessToken: storedTokens?.accessToken ?? '',
          refreshToken: storedTokens?.refreshToken ?? '',
        };
      },
      onUnauthorized: () => {
        useAuthStore.getState().revokeSession();
      },
      ...options,
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
        const config = exception.config as ExtendedAxiosRequestConfig | undefined;

        const ignoreUnauthorized = config?.ignoreUnauthorized;
        const isRetry = config?._retry;

        if (exception.response?.status === 401 && !ignoreUnauthorized && !isRetry && config) {
          // Mark this request as a retry to prevent infinite loops
          config._retry = true;

          try {
            // Try to refresh the token
            console.log('🔄 Token expired, attempting to refresh...');
            const renewSession = useAuthStore.getState().renewSession;
            await renewSession();

            console.log('✅ Token refreshed, retrying original request');
            // Retry the original request with the new token
            return this.axios(config);
          } catch (refreshError) {
            // Token refresh failed, logout
            console.log('❌ Token refresh failed, logging out');
            if (typeof this.options.onUnauthorized === 'function') {
              this.options.onUnauthorized();
            }
            return Promise.reject(exception);
          }
        }

        if (exception.response?.status === 422) {
          console.log('############################################');
          console.log('Validation error:', exception.response.data);
          console.log('Request config:', config);
          console.log('############################################');

          return Promise.reject(exception);
        }

        if (exception.response?.status === 403) {
          if (typeof this.options.onForbidden === 'function') {
            this.options.onForbidden();
          }
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
    data: RequestBody,
    config?: AxiosRequestConfig,
    unserializable?: string[]
  ): Promise<AxiosResponse<T>> {
    return this.axios.post<T>(url, this._requestBodySerialization(data, unserializable), config);
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
    data: RequestBody,
    config?: AxiosRequestConfig,
    unserializable?: string[]
  ): Promise<AxiosResponse<T>> {
    return this.axios.put<T>(url, this._requestBodySerialization(data, unserializable), config);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.delete<T>(url, config);
  }

  protected patch<T>(
    url: string,
    data: RequestBody,
    config?: AxiosRequestConfig,
    unserializable?: string[]
  ): Promise<AxiosResponse<T>> {
    return this.axios.patch<T>(url, this._requestBodySerialization(data, unserializable), config);
  }

  private _buildHeaders = (prevHeaders?: AxiosRequestHeaders) => {
    const headers = { ...prevHeaders } as AxiosRequestHeaders;
    const tokens = this.options.getTokens();
    if (tokens.accessToken && !headers.Authorization) {
      headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return headers;
  };

  private _requestBodySerialization(
    data: RequestBody,
    unserializable?: Array<string>
  ): FormData | Json {
    return data instanceof FormData ? data : serialize(data, unserializable);
  }
}
