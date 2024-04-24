// @ts-expect-error .d.ts
import { type AnyFunction } from 'lvl-js-utils'
import { useEffect, useState } from 'react'

export const useLocalstorage = (key: string, errorHandler: AnyFunction, initialValue?: unknown): [unknown, AnyFunction] => {
  const [value, setValue] = useState(initialValue)
  const [savedKey] = useState(key)

  useEffect(() => {
    try {
      if (typeof localStorage === 'undefined') {
        throw new Error('LocalStorage not available')
      }
      if (initialValue !== undefined) {
        localStorage.setItem(key, JSON.stringify(initialValue))
      } else {
        const storedValue = localStorage.getItem(key)
        storedValue === null ? setValue(storedValue) : setValue(JSON.parse(storedValue))
      }
    } catch (error) {
      errorHandler(error)
    }
  }, [key])

  const updateValue = (newValue: unknown): void => {
    setValue(newValue)
    localStorage.setItem(savedKey, JSON.stringify(newValue))
  }

  return [value, updateValue]
}
