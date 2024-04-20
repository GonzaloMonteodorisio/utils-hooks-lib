import { type AxiosInstance } from 'axios'

export const setCommonHeaders = (instance: AxiosInstance): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('authorization') ?? null}`
  // Cache-Control: no-cache
  // Pragma = 'no-cache'
  instance.defaults.headers.common.Accept = 'application/json'
}
