import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosError } from 'axios';
import AxiosInstance from '@/hooks/useRequest/axiosInstance';

interface Return<Data, Error>
  // 取SWRResponse中的'isValidating' | 'error' | 'mutate' 三个属性，并添加data和response属性
  extends Pick<SWRResponse<Response<Data>, AxiosError<Error>>, 'isValidating' | 'error' | 'mutate'> {
  data: Data | undefined;
  response: Response<Data> | undefined;
}

interface Config<Data = unknown, Error = unknown>
  // 删除SWRConfiguration对象中的fallbackData类型定义, 默认fallbackData 等于传入的 AxiosResponse<Data>类型
  extends Omit<SWRConfiguration<Response<Data>, AxiosError<Error>>, 'fallbackData'> {
  // 重新定义fallbackData类型
  fallbackData?: Data;
}

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

function useRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<Response<Data>, AxiosError<Error>>(request.url, () => AxiosInstance.request(request), {
    ...config,
  });

  return {
    data: response?.data,
    response,
    error,
    isValidating,
    mutate,
  };
}

export default useRequest;
