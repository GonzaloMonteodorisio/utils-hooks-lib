import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import * as React from 'react';
import { ACTIONS } from '../actions/fetch';
import { fetchReducer, initialState, type initialStateprops } from '../reducers/fetch';
import { setCommonHeaders } from '../utils/headers';
import { useLiveRef } from './useLiveRef';
import useDeepCompareEffect from 'use-deep-compare-effect';
interface Dispatch {
  type: string;
  payload: unknown;
}

export interface Reducer {
  dispatch: Dispatch;
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
  error: unknown;
  loading: boolean;
  fetcher?: (_config: Config) => Promise<void>;
}

function newAbortSignal(timeout: number): AbortSignal {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
  }, timeout);
  return abortController.signal;
}

export const useAxios = <T>(config: Config): UseAxios<T> => {
  const configRef = useLiveRef(config);
  const { instance = axios } = configRef.current;

  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    instance.defaults.timeout = 1000;
    setCommonHeaders(instance);
  }, [instance]);

  const fetch = React.useCallback(
    async (config: Config): Promise<void> => {
      const enabled = config.enabled ?? true;
      console.log('enable', enabled);
      if (!enabled) return;

      try {
        const { data } = await instance.request<T>({
          ...config,
          method: config.method.toLowerCase() ?? 'get',
          signal: newAbortSignal(1000), // timeout para request
          headers: {
            ...config.headers,
            ...instance.defaults.headers.common,
          },
        });

        dispatch({ type: ACTIONS.SET_DATA, payload: { data: data, error: 'null' } });
      } catch (err) {
        if (err instanceof AxiosError) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: { data: 'error', error: err } });
        }
      }
    },
    [config, instance],
  );

  const fetcher = React.useCallback(
    async (_config: Config) => {
      try {
        const { data } = await instance.request<T>({
          ...configRef.current,
          ..._config,
          params: {
            ...configRef.current.params,
            ..._config.params,
          },
        });
        dispatch({ type: ACTIONS.SET_DATA, payload: { data: data, error: 'null' } });
      } catch (err) {
        if (err instanceof AxiosError) {
          dispatch({ type: ACTIONS.SET_ERROR, payload: { data: 'error', error: err } });
        }
      }
    },
    [configRef],
  );

  useDeepCompareEffect(() => {
    void fetch(configRef.current);
  }, [configRef.current]);
  return {
    data: state.data as T | null,
    error: state.error,
    loading: state.loading,
    fetcher
  };
};
