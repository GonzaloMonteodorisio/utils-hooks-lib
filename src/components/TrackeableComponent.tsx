import { withTracking } from '../withTracking'

const Component = (): JSX.Element => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>TrackeableComponent</div>
  )
}

export const TrackeableComponent = withTracking(Component)
