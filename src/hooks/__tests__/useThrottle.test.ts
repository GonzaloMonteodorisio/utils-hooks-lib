import { act, renderHook } from '@testing-library/react-hooks'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useThrottle } from '../useThrottle'

describe('useThrottle', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  const fn = vi.fn()
  it('should throttle the callback with the specified delay', () => {
    const delay = 1_000
    const { result } = renderHook(() => useThrottle(fn, delay))

    act(() => {
      result.current()
      result.current()
      result.current()
    })
    expect(fn).toHaveBeenCalledOnce()

    // avanzar en el tiempo de ejecución
    vi.advanceTimersByTime(1_200)
    act(() => {
      result.current()
    })

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
