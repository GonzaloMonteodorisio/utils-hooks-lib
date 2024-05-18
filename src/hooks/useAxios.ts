import axios from 'axios'
import { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { config } from 'process'
import * as React from 'react'

import { ACTIONS } from '../actions/fetch'
import { fetchReducer, initialState, type initialStateprops } from '../reducers/fetch';
import { setCommonHeaders } from '../utils/headers'
import { useLiveRef } from './useLiveRef'

interface dispach {
  type: string;
  payload: unknown;
}
export interface reducer {
  dispach: dispach;
  state: initialStateprops;
}
interface Config extends AxiosRequestConfig {
  instance?: AxiosInstance;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  enabled?: boolean;
}
interface UseAxios<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetcher?: () => Promise<void>;
}
function newAbortSignal(to: number): AbortSignal {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
  }, to);
  return abortController.signal;
}

export const useAxios = <T extends string>(Config: Config): UseAxios<T> => {
  const configRef = useLiveRef(Config);
  const { instance = axios } = configRef.current;

  instance.defaults.timeout = 300;
  setCommonHeaders(instance);
  const [state, dispatch] = React.useReducer<typeof fetchReducer>(fetchReducer, initialState);

  const fetch = React.useCallback(
    async (config: Config): Promise<void> => {
      try {
        const enabled = config.enabled ?? true;
        if (!enabled) return;

        const res = await instance.request<T>({
          ...config,
          method: config.method.toLowerCase() ?? 'get',
          signal: newAbortSignal(300), // timeout para request,
          headers: {
            ...config.headers,
            ...instance.defaults.headers.common,
          },
        });
        dispatch({ type: ACTIONS.SET_DATA, payload: { data: res.data, error: 'nuul' } });
      } catch (err) {
        if (err instanceof AxiosError) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: { data: 'error', error: 'nuul' } });
        }
      }
    },
    [instance, config],
  );
  return {
    data: state.data as T | null,
    error: state.error,
    loading: state.loading,
    fetcher: async () => {
      await fetch(configRef.current);
    },
  };
};
