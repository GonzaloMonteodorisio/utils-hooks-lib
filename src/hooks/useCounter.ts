// Un contador que tenga un increment, decrement, counter
import * as React from 'react'

interface UseCounterProps {
  initialValue?: number
}

interface UseCounter {
  increment: (num: number) => void
  decrement: (num: number) => void
  counter: number
}

export const useCounter = ({ initialValue = 0 }: UseCounterProps): UseCounter => {
  const [counter, setCounter] = React.useState(initialValue)

  const increment = (num: number = 1): void => {
    setCounter((prev) => prev + num)
  }
  const decrement = (num: number): void => {
    setCounter((prev) => prev - num)
  }

  return {
    increment,
    decrement,
    counter
  }
}
