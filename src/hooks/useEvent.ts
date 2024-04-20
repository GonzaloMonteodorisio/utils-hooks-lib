// @ts-expect-error .d.ts
import { type AnyFunction } from 'lvl-js-utils'
import * as React from 'react'

export function useEvent<T extends AnyFunction> (callback: T): T {
  /*
    ref -> acceder al dom
    ref -> singleton
  */

  const ref = React.useRef<AnyFunction | undefined>(() => {})
  React.useLayoutEffect(() => {
    ref.current = callback
  }, [])
  return React.useCallback<AnyFunction>((...args: AnyFunction) => ref.current(...args), []) as T
}
