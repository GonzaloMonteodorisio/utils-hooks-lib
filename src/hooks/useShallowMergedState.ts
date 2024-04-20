/*
 ...state,
 [e.target.name]: e.target.value
*/
// @ts-expect-error d.ts
import type { AnyFunction } from 'lvl-js-utils'
import * as React from 'react'

import { useEvent } from '.'

export function useShallowMergedState<S> (initialState: S): [S, AnyFunction] {
  const [state, setState] = React.useState(initialState)

  const setter = useEvent((newState: S): void => {
    setState(prevState => ({
      ...prevState,
      ...newState
    }))
  })

  return [state, setter] as const
}
