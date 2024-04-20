// @ts-expect-error .d.ts
import { type AnyFunction, throttle } from 'lvl-js-utils'
import * as React from 'react'

import { useEvent } from './useEvent'

export function useThrottle<T extends AnyFunction> (fn: T, delay: number): T {
  const event = useEvent(fn)
  return React.useMemo(() => throttle(event, delay), [event, delay])
}
