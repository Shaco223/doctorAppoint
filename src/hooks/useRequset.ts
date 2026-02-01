/*
 * @Author: liuxiang
 * @Date: 2026-02-01 00:41:11
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-02-02 00:20:15
 * @Description: file content
 */
import { useCallback, useState, useEffect } from 'react';
import { initRequest } from '../common';
import { Toast } from '@td-design/react-native';

const globalRequestInstance = initRequest();

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface RequestOptions<TData = any> {
  url: string;
  method?: HttpMethod;
  data?: TData;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  manual?: boolean; 
}

interface RequestResult<T = any> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  run: (options?: Partial<RequestOptions>) => Promise<void>; 
}


export const useRequest = <T = any>(options?: RequestOptions): RequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(
    async (runOptions?: Partial<RequestOptions>) => {
      try {
        setLoading(true);
        setError(null);

        const finalOptions: RequestOptions = {
          method: 'get',
          ...options,
          ...runOptions,
        };

        const { url, method, data: payload, params, headers } = finalOptions;

        const response = await globalRequestInstance({
          url,
          method,
          data: payload,
          params,
          headers,
        });
        setData(response.data);

      } catch (err: any) {
        setError(err);
        Toast.middle({
          content: err.message || 'request failed',
        });
        console.error('Request error:', err);
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  useEffect(() => {
    if (!options?.manual) {
      run();
    }
  }, []); 

  return { data, loading, error, run };
};

export const useGet = <T = any>(url: string, options?: Omit<RequestOptions, 'url' | 'method'>) => {
  return useRequest<T>({ ...options, url, method: 'get' });
};

export const usePost = <T = any>(url: string, options?: Omit<RequestOptions, 'url' | 'method'>) => {
  return useRequest<T>({ ...options, url, method: 'post' });
};

export const usePut = <T = any>(url: string, options?: Omit<RequestOptions, 'url' | 'method'>) => {
  return useRequest<T>({ ...options, url, method: 'put' });
};

export const useDelete = <T = any>(url: string, options?: Omit<RequestOptions, 'url' | 'method'>) => {
  return useRequest<T>({ ...options, url, method: 'delete' });
};