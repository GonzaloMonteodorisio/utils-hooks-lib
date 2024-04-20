/*
Wrapper: Un componente que recibe como parámetro un
componente, modifica y devuelve un componente

Concepto trasladado de las funciones de orden superior
*/

import * as React from 'react'

import { useEvent } from './hooks/useEvent'
import { useIsInView } from './hooks/useIsInView'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

// Cuando el componente esté en el viewport quiero ejecutar isInView SOLO UNA VEZ

export const withTracking = <P extends Props>(BaseComponent: React.ComponentType<P>) => {
  return function Component (props: P) {
    const ref = React.useRef<HTMLDivElement>(null)
    const isInView = useIsInView(ref)

    const seen = React.useRef(false)

    const event = useEvent(() => {
      console.log('element has been seen')
    })

    React.useEffect(() => {
      if (isInView && !seen.current) {
        event()
        seen.current = true
      }
    }, [isInView, event])
    return (
      <div ref={ref}>
        <BaseComponent {...props} />
      </div>
    )
  }
}
