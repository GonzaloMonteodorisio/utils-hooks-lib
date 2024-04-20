/* eslint-disable react/react-in-jsx-scope */
import { useCounter } from '../hooks/useCounter'

export const Counter = (): JSX.Element => {
  const { increment, decrement, counter } = useCounter({ initialValue: 0 })
  return (
    <>
    <h2>Contador: {counter}</h2>
    <button onClick={() => { increment(1) }}>+1</button>
    <button onClick={() => { decrement(1) }}>-1</button>
    </>
  )
}
