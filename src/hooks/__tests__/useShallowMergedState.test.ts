import { act, renderHook } from '@testing-library/react-hooks'
import { describe, expect, it } from 'vitest'

import { useShallowMergedState } from '../useShallowMergedState'

describe('useShallowMergedState', () => {
  it('should return initial state', () => {
    const initialState = { name: '', email: '' }
    const { result } = renderHook(() => useShallowMergedState(initialState))
    expect(result.current[0]).toStrictEqual(initialState)
  })
  it('should merge the object shallowly', () => {
    const initialState = { name: '', email: '' }
    const { result, rerender } = renderHook(() => useShallowMergedState(initialState))
    const [, setter] = result.current
    act(() => {
      setter({ email: 'franco@gmail.com' })
    })
    rerender()
    expect(result.current[0]).toEqual({ name: '', email: 'franco@gmail.com' })

    act(() => {
      setter({ name: 'franco' })
    })
    expect(result.current[0]).toEqual({ name: 'franco', email: 'franco@gmail.com' })
  })
})
