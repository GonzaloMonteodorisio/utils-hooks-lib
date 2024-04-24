// useDynamicRating() -> useWindowsResize + useLayoutEffect
import * as React from 'react'

import { useDebounce } from '.'
import { canUseDOM } from './useSafeLayoutEffect'
import { useThrottle } from './useThrottle'

interface UseWindowsResize {
  width: number
  height: number
}

export function useWindowsResize (): UseWindowsResize {
  if (!canUseDOM) throw new Error('cannot use useWindowsResize in a server environment')
  const [windowsSize, setWindowsSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = (): void => {
    setWindowsSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  React.useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowsSize
}
