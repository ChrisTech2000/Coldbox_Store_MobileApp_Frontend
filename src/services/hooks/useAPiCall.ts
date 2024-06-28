import useSWR from 'swr';
import { AxiosError } from 'axios';

import ErrorUtil from '../utils/ErrorUtil';
import { useCallback, useMemo, useRef } from 'react';

//type ApiResponse<IData> = AxiosResponse<IData>;

interface IApiQueryOptions<IData> {
  skip?: boolean;
  defaultData?: IData;
  refreshInterval?: number;
}

const useApiCall = <IData, IParams>(
  name: string,
  method: (params: IParams) => Promise<IData>,
  params: IParams,
  options?: IApiQueryOptions<IData>
) => {
  const defaultData = useRef(options?.defaultData || ({} as IData));
  const previousData = useRef<IData | undefined>(undefined);
  const key = useMemo(() => `${name}:${JSON.stringify(params || {})}`, [method, params]);

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
  });

  if (data) {
    previousData.current = data;
  }

  const refetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    data: data || defaultData.current,
    isLoading: !data && isValidating,
    hasError: !!error,
    isValidating,
    refetch,
  };
};

export default useApiCall;
