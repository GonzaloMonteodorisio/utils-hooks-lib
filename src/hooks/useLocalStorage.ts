// @ts-expect-error .d.ts
import { type AnyFunction } from 'lvl-js-utils'
import { useState } from 'react'

export const useLocalstorage = (key: string, errorHandler: AnyFunction, initialValue?: unknown): [unknown, AnyFunction] => {
  const [value, setValue] = useState(initialValue)

  try {
    if (typeof localStorage === 'undefined') {
      throw new Error('Localstorage not available')
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

  return [value, setValue]
}
