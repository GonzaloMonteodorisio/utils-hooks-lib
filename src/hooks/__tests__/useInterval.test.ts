import { act, renderHook } from '@testing-library/react-hooks'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { useInterval } from '../useInterval'

describe.only('useInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  it('should repeatedly call the provided callback at the interval specified by delay', () => {
    const callback = vi.fn()
    const delay = 1_000

    // Renderiza el hook con un delay de 1000ms
    renderHook(() => { useInterval(callback, delay) })

    expect(callback).toHaveBeenCalledTimes(0)

    // Avanza el tiempo en 1000ms y verifica que el callback haya sido llamado una vez
    act(() => {
      vi.advanceTimersByTime(1_000)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    // Avanza el tiempo en otro 2000ms y verifica que el callback haya sido llamado un total de 3 veces
    act(() => {
      vi.advanceTimersByTime(2_000)
    })
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('should not set an interval if delay is null', () => {
    const callback = vi.fn()
    const delay = null

    renderHook(() => { useInterval(callback, delay) })

    act(() => {
      vi.advanceTimersByTime(5_000)
    })

    expect(callback).not.toHaveBeenCalled()
  })
})
