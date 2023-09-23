import { AxiosRequestConfig, AxiosError } from 'axios';
import AxiosInstance from '@/hooks/useRequest/axiosInstance';

import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite';

interface Return<Data, Error>
  // 取SWRResponse中的'isValidating' | 'error' | 'mutate' | 'size' | 'setSize' 4个属性，并添加data和response属性
  extends Pick<
    SWRInfiniteResponse<Response<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined;
  response: Response<Data>[] | undefined;
}

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

export interface Config<Data = unknown, Error = unknown>
  // 删除SWRConfiguration对象中的fallbackData类型定义, 默认fallbackData 等于传入的 AxiosResponse<Data>类型
  extends Omit<SWRInfiniteConfiguration<Response<Data>, AxiosError<Error>>, 'fallbackData'> {
  // 重新定义fallbackData类型
  fallbackData?: Data[];
}

function getKey(pageIndex: number, url: string) {
  return `${url}&page=${pageIndex + 1}`;
}

function useRequestInfinite<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<Response<Data>, AxiosError<Error>>(
    (pageIndex: number) => getKey(pageIndex, request.url!),
    (url: string) => AxiosInstance.request({ url }),
    { ...config, revalidateFirstPage: false }
  );

  return {
    data: response?.map((item) => item.data),
    response,
    mutate,
    error,
    isValidating,
    size,
    setSize,
  };
}

export default useRequestInfinite;
