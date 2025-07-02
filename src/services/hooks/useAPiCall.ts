import { useCallback, useMemo, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation, { type MutationFetcher } from 'swr/mutation';
import type { AxiosError } from 'axios';
import ms from 'ms';

import ErrorUtil, { type CustomError } from '../utils/ErrorUtil';

export interface IApiQueryOptions<IData> {
  skip?: boolean;
  defaultData?: IData;
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  dedupingInterval?: number;
  errorRetryCount?: number;
  errorRetryInterval?: number;
  loadingTimeout?: number;
}

export const useApiCall = <IData, IParams>(
  name: string,
  method: (params: IParams) => Promise<IData>,
  params: IParams,
  options?: IApiQueryOptions<IData>
) => {
  const defaultData = useRef(options?.defaultData || ({} as IData));
  const key = useMemo(() => getQueryKey<IParams>(name, params), [method, params]);

  const fetcher = useCallback(async () => {
    try {
      const data = await method(params);
      return data;
    } catch (error) {
      const customError = ErrorUtil.handleAxiosError(error as AxiosError);
      throw customError;
    }
  }, [method, params]);

  const { data, isValidating, error, mutate } = useSWR(options?.skip ? null : key, fetcher, {
    refreshInterval: options?.refreshInterval,
    revalidateOnFocus: options?.revalidateOnFocus,
    revalidateOnReconnect: options?.revalidateOnReconnect,
    dedupingInterval: options?.dedupingInterval ?? ms('3 seconds'),
    errorRetryCount: options?.errorRetryCount ?? 1,
    errorRetryInterval: options?.errorRetryInterval,
    loadingTimeout: options?.loadingTimeout,
  });

  const refetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    data: data || defaultData.current,
    isLoading: !data && isValidating,
    hasError: !!error,
    error,
    isValidating,
    refetch,
  };
};

export const useLazyApiCall = <IData, IParams>(
  name: string,
  method: (params: IParams) => Promise<IData>
) => {
  const fetcher: MutationFetcher<IData, string, IParams> = useCallback(
    async (_, extra) => {
      return await method(extra.arg);
    },
    [method]
  );

  const { data, trigger, error, isMutating } = useSWRMutation<IData, CustomError, string, IParams>(
    name,
    fetcher
  );

  return {
    execute: useCallback(
      // eslint-disable-next-line
      // @ts-ignore
      async (params: IParams): Promise<IData> => await trigger(params),
      [trigger]
    ),
    data,
    isLoading: isMutating,
    hasError: !!error,
    error,
  };
};

export function getQueryKey<T>(name: string, params?: T): string {
  return `${name}:${JSON.stringify(params || {})}`;
}

export function useApiCache<P, T>(name: string, params?: P): T | undefined {
  const { cache } = useSWRConfig();
  const queryCache = cache.get(getQueryKey(name, params));

  return useMemo(() => {
    if (typeof queryCache?.data === 'undefined') return undefined;
    if (Array.isArray(queryCache.data)) return [...queryCache.data];
    if (typeof queryCache.data === 'object') return { ...queryCache.data };
    return queryCache.data; // null, string, number, etc
  }, [queryCache?.data]);
}
