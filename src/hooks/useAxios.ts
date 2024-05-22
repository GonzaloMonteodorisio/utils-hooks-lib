import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import * as React from 'react';
import { ACTIONS } from '../actions/fetch';
import { fetchReducer, initialState, type initialStateprops } from '../reducers/fetch';
import { setCommonHeaders } from '../utils/headers';
import { useLiveRef } from './useLiveRef';

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
  error: string | null;
  loading: boolean;
  fetcher?: () => Promise<void>;
}

function newAbortSignal(timeout: number): AbortSignal {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
  }, timeout);
  return abortController.signal;
}

export const useAxios = <T extends string>(config: Config): UseAxios<T> => {
  const configRef = useLiveRef(config);
  const { instance = axios } = configRef.current;

  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    instance.defaults.timeout = 300;
    setCommonHeaders(instance);
  }, [instance]);

  const fetch = React.useCallback(async (config: Config): Promise<void> => {
    try {
      const enabled = config.enabled ?? true;
      if (!enabled) return;

      const res = await instance.request<T>({
        ...config,
        method: config.method.toLowerCase() ?? 'get',
        signal: newAbortSignal(300), // timeout para request
        headers: {
          ...config.headers,
          ...instance.defaults.headers.common,
        },
      });

      dispatch({ type: ACTIONS.SET_DATA, payload: { data: res.data, error: 'null' } });
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: { data: 'error', error: 'null' } });
      }
    }
  }, [instance]);

  const memoizedConfig = React.useMemo(() => config, [config]);

  React.useEffect(() => {
    fetch(memoizedConfig);
  }, [memoizedConfig]);

  return {
    data: state.data as T | null,
    error: state.error,
    loading: state.loading,
    fetcher: async () => {
      await fetch(configRef.current);
    },
  };
};
