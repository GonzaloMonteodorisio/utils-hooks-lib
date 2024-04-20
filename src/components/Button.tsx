import * as React from 'react'

interface ButtonProps {
  onClick: () => void
}

const Component: React.FC<ButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Send</button>
}

export const Button = React.memo(Component)
