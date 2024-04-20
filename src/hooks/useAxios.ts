// ¿Por qué Axios?
/*
1. abort controller
2. timeout
3. axios.create({ baseUrl: '....' })
4. interceptors
 */

import { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import * as React from 'react'

import { setCommonHeaders } from '../utils/headers'
import { useLiveRef } from './useLiveRef'

interface Config extends AxiosRequestConfig {
  instance: AxiosInstance
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  enabled?: boolean // controlar en que momento (ciclo de vida) debe ejecutarse el hook
}

interface UseAxios<T> {
  data: T | null
  error: string | null | AxiosError
  loading: boolean
  // fetcher?: (config) => Promise<void>
}

function newAbortSignal (to: number): AbortSignal {
  const abortController = new AbortController()
  setTimeout(() => { abortController.abort() }, to)
  return abortController.signal
}

export const useAxios = <T>(config: Config): UseAxios<T> => {
  const configRef = useLiveRef(config)
  const { instance } = configRef.current
  // Percentil -> P95: 200ms -> 95% de los usuarios el servicio le respondió en 200ms O MENOS
  // P99 -> Mayor P99 es de 300ms -> al 99% de los usuarios el servicio le respondió en 300ms o menos
  instance.defaults.timeout = 300 // P95 de latencia de la aplicación
  setCommonHeaders(instance)
  const [response, setResponse] = React.useState<T | null>(null)
  const [, setError] = React.useState<typeof AxiosError | string | null>('')
  const [loading, setLoading] = React.useState(false)

  const fetch = React.useCallback(async (config: Config): Promise<void> => {
    try {
      const enabled = config.enabled ?? true
      if (!enabled) return
      setLoading(true)

      const res = await instance.request<T>({
        ...config,
        method: config.method.toLowerCase() ?? 'get',
        signal: newAbortSignal(300), // timeout para request,
        headers: {
          ...config.headers,
          ...instance.defaults.headers.common
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setResponse(res.data)
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message)
      } else {
        setError('unknown error at fetch')
      }
    } finally {
      setLoading(false)
    }
  }, [instance, config])

  React.useEffect(() => {
    void fetch(configRef.current)
  }, [])
  return {
    data: response,
    error: '',
    loading
  }
}
