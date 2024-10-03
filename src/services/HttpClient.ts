import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestHeaders,
} from 'axios';

import { API_BASE_URL } from '#constants/environment';
import { useAuthStore, type Tokens } from '#stores/auth';

import { deserialize, Json, serialize, type JsonArray, type JsonObject } from './utils';

type Options = {
  baseURL: string;
  getTokens: () => Tokens;
  onUnauthorized?: () => Promise<void>;
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
      // baseURL: 'https://cd97-188-250-221-28.ngrok-free.app',
      getTokens: () => {
        const storedTokens = useAuthStore.getState().tokens;
        return {
          accessToken: storedTokens?.accessToken ?? '',
          refreshToken: storedTokens?.refreshToken ?? '',
        };
      },
      onUnauthorized: async () => {
        await useAuthStore.getState().renewSession();
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
        if (exception.response?.status === 401) {
          if (typeof this.options.onUnauthorized !== 'function') {
            throw exception;
          }

          await this.options.onUnauthorized();
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
