import React from 'react'

import { Button } from './components/Button'
import { Counter } from './components/Counter'
import { TrackeableComponent } from './components/TrackeableComponent'
import { useDebounce } from './hooks/useDebounce'
import { useEvent } from './hooks/useEvent'
import { useThrottle } from './hooks/useThrottle'
import { useWindowsResize } from './hooks/useWindowsResize'

function App (): JSX.Element {
  const [text, setText] = React.useState('')
  const onChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('entro en el onChange')
    setText(e.target.value)
  }, 300)

  const onClick = useEvent((): void => {
    console.log('send text', text)
  })

  const onButtonClick = (): void => {
    console.log('press on throttled click')
  }
  const { width, height } = useWindowsResize()
  console.log('width, height', width, height)
  const throttledButtonClick = useThrottle(onButtonClick, 1000)

  return (
    <>
      {text}
      <Counter />
      <input type="text" onChange={onChange} />
      <Button onClick={onClick}/>
      <button onClick={throttledButtonClick}>Throttled click</button>
      <br />
      <div style={{ height: '800px' }} />
      <TrackeableComponent />
    </>
  )
}

export default App
