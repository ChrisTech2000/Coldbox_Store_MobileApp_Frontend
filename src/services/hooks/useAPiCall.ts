import useSWR, { useSWRConfig } from 'swr';
import { AxiosError } from 'axios';

import ErrorUtil from '../utils/ErrorUtil';
import { useCallback, useMemo, useRef } from 'react';

interface IApiQueryOptions<IData> {
  skip?: boolean;
  defaultData?: IData;
  refreshInterval?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  dedupingInterval?: number;
  errorRetryCount?: number;
  errorRetryInterval?: number;
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
    dedupingInterval: options?.dedupingInterval,
    errorRetryCount: options?.errorRetryCount ?? 0,
    errorRetryInterval: options?.errorRetryInterval,
  });

  const refetch = useCallback(async () => await mutate(), [mutate]);

  return {
    data: data || defaultData.current,
    isLoading: !data && isValidating,
    hasError: !!error,
    error,
    isValidating,
    refetch,
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
    if (typeof queryCache.data === 'object') return { ...queryCache.data };
    if (Array.isArray(queryCache.data)) return [...queryCache.data];
    return queryCache.data; // null, string, number, etc
  }, [queryCache?.data]);
}
