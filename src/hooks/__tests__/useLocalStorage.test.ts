import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useLocalstorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

  afterEach(() => {
    getItemSpy.mockClear()
    setItemSpy.mockClear()
    localStorage.clear()
  })
  it('should save item in localStorage if initial value !== undefined', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useLocalstorage('key', fn, 'hola'))
    const [value] = result.current
    expect(setItemSpy).toHaveBeenCalledWith('key', JSON.stringify('hola'))
    expect(value).toBe('hola')
  })

  it('should call error handler on localstorage undefined', () => {
    const originalLocalStorage = global.localStorage
    // @ts-expect-error localstorage undefined
    global.localStorage = undefined
    const errorFn = vi.fn()
    renderHook(() => useLocalstorage('key', errorFn, 'hola'))
    expect(errorFn).toHaveBeenCalledOnce()
    global.localStorage = originalLocalStorage
  })

  it('should get item from localStorage when initial value is undefined', () => {
    // este falla
    const fn = vi.fn()
    renderHook(() => useLocalstorage('key', fn, 'value'))
    renderHook(() => useLocalstorage('key', fn))
    expect(getItemSpy).toHaveBeenCalledWith('key')
  })

  it('should get new value on update', () => {
    const fn = vi.fn()
    const { result, rerender } = renderHook(() => useLocalstorage('key', fn, 'value1'))
    const [_, updateValue] = result.current // eslint-disable-line @typescript-eslint/no-unused-vars
    act(() => {
      updateValue('value2')
    })
    rerender()
    expect(result.current[0]).toBe('value2')
  })
})
