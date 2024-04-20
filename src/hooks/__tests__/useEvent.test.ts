import { act, renderHook } from '@testing-library/react-hooks'
import { describe, expect, it, vi } from 'vitest'

import { useEvent } from '../useEvent'
describe('useEvent', () => {
  it('should execute the callback', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useEvent(fn))

    act(() => {
      result.current()
    })

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should memoize the handler', () => {
    const fn = vi.fn()
    const { result, rerender } = renderHook(() => useEvent(fn))
    // result es return de nuestro hook
    const eventHandler1 = result.current
    rerender() // rerender()
    const eventHandler2 = result.current
    expect(eventHandler1).toBe(eventHandler2)
    eventHandler1()
    expect(fn).toHaveBeenCalledOnce()
  })
})
