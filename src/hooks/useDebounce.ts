// @ts-expect-error .d.ts
import { type AnyFunction, debounce } from 'lvl-js-utils'
import * as React from 'react'

import { useEvent } from './useEvent'

export function useDebounce<T extends AnyFunction> (fn: T, delay: number): T {
  const event = useEvent(fn)
  return React.useMemo(() => debounce(event, delay), [event, delay])
}
