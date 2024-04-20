/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest'

import { useWindowsResize } from '../useWindowsResize'

describe('useWindowsResize', () => {
  let addEventListenerMock: MockInstance
  let removeEventListenerMock: MockInstance

  beforeEach(() => {
    global.innerHeight = 1024
    global.innerWidth = 600
    addEventListenerMock = vi.fn(window.addEventListener)
    removeEventListenerMock = vi.fn(window.removeEventListener)
  })

  it('should update windows size on resize', () => {
    const { result } = renderHook(() => useWindowsResize())
    expect(result.current).toEqual({ width: window.innerWidth, height: window.innerHeight })

    global.innerWidth = 1024
    global.innerHeight = 610
    fireEvent(window, new Event('resize'))

    expect(result.current).toEqual({ width: 1024, height: 610 })
  })
  // probar que se debe remover el event listener cuando el componente se desmonta
  it('should add and remove event listener on mount and unmount', () => {
    const { unmount } = renderHook(() => useWindowsResize())
    // expect(addEventListenerMock).toHaveBeenCalledWith('resize', expect.any(Function))
    // una vez desmontado el componente
    // se llame removeEventListenerMock con la función de callback
  })
})
