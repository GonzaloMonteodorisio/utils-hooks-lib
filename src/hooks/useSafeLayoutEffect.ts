import * as React from 'react'

export const canUseDOM = typeof window !== 'undefined'

export const useSafeLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect
