import { act, renderHook } from '@testing-library/react-hooks'
import { describe, expect, it, vi } from 'vitest'

import { useInterval } from '../useInterval'

describe('useInterval', () => {
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

  it('should stop interval when delay is changed to null', () => {
    // Definición de tipo para las props del hook

    const callback = vi.fn()
    const { rerender } = renderHook(
      ({ delay }) => { useInterval(callback, delay) },
      {
        initialProps: {
          delay: 1_000 as number | null
        }
      }
    )

    // Avanza el tiempo en 1000ms y verifica que el callback haya sido llamado una vez
    act(() => {
      vi.advanceTimersByTime(1_000)
    })
    expect(callback).toHaveBeenCalledTimes(1)

    // Cambia el delay a null y avanza el tiempo
    rerender({ delay: null })
    act(() => {
      vi.advanceTimersByTime(2_000)
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should use the updated callback if it changes during the interval', () => {
    const initialCallback = vi.fn()
    const updateCallback = vi.fn()
    const { rerender } = renderHook(
      ({ callback }) => { useInterval(callback, 1_000) }, {
        initialProps: { callback: initialCallback }
      }
    )

    act(() => {
      vi.advanceTimersByTime(1_000)
    })
    expect(initialCallback).toHaveBeenCalledTimes(1)

    // Actualiza el callback y avanza el tiempo
    rerender({ callback: updateCallback })
    act(() => {
      vi.advanceTimersByTime(1_000)
    })
    expect(updateCallback).toHaveBeenCalledTimes(1)
  })
})
