import { act, renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'

import { useCounter } from '../useCounter'

// renderHook -> inicializa el hook que quiero testear
// act -> disparar una acción de ese hook
// renderHook(() => useCounter())

describe('useCounter', () => {
  it('Should increment and decrement counter properly', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }))
    expect(result.current.counter).toBe(0)
    /*
     result: {
        current: {
            increment: fn,
            decrement: fn,
            counter: number
        }
     }
    */
    act(() => {
      result.current.increment(1)
    })

    expect(result.current.counter).toBe(1)

    act(() => {
      result.current.decrement(1)
    })

    expect(result.current.counter).toBe(0)
  })
  // Boolean Mutations
  // [] -> ["Stryker was here"]
  // > >= , <

  it('Should increment and decrement counter by given value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }))
    expect(result.current.counter).toBe(5)

    act(() => {
      result.current.increment(5)
    })

    expect(result.current.counter).toBe(10)

    act(() => {
      result.current.decrement(20)
    })

    expect(result.current.counter).toBe(-10)
  })
})
