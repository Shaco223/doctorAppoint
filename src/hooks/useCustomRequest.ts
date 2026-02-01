/*
 * @Author: liuxiang
 * @Date: 2026-01-30 15:53:27
 * @LastEditors: liuxiang
 * @LastEditTime: 2026-01-31 23:54:59
 * @Description: file content
 */
import { useRequest } from '@td-design/rn-hooks';
import type { Options, Service } from '@td-design/rn-hooks/lib/typescript/useRequest/types';

import useLogout from './useLogout';
import { useNotify } from './useNotify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCustomRequest<R, P extends any[] = []>(
  service: Service<R, P>,
  options?: Options<R, P> & { permission?: string }
) {

  const { failNotify } = useNotify();
  const logout = useLogout();

  const { ready, onBefore, onError, ...restOptions } = options || {};

  const result = useRequest(service, {
    ready: ready,
    onBefore: (params: P) => {
      onBefore?.(params);
    },
    onError: (error: Error, params: P) => {
      try {
        const { code, message } = JSON.parse(error.message);
        if (code === 401) {
          failNotify(message);
          logout();
        } else if (code === 1008103002 || code === 1008103003) {
          return;
        } else {
          failNotify(message);
        }
      } catch (err) {
        failNotify((err as { message: string })?.message);
      } finally {
        onError?.(error, params);
      }
      result.cancel();
    },
    ...restOptions,
  });
  return result;
}
