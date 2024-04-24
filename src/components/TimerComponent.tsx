import * as React from 'react'

import { useInterval } from '../hooks'

export const TimerComponent: React.FC = (): JSX.Element => {
  const [count, setCount] = React.useState(0)

  useInterval(() => {
    setCount((currentCount) => currentCount + 1)
  }, 1000)

  return <div>Timer: {count}</div>
}
