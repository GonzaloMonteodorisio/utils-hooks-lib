import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from '../useDebounce'


describe('useDebounce', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })
    const fn = vi.fn()
    it('should useDebounce the callback with the specified delay', () => {
      const delay = 1_000
      const { result } = renderHook(() => useDebounce(fn, delay))
  
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