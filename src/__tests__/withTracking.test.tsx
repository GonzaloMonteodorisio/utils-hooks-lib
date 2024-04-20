import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import { withTracking } from '../withTracking'

// eslint-disable-next-line react/react-in-jsx-scope
const MockComponent = (): JSX.Element => <div>Mock component</div>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const intersectionObserverMock = () => ({
  observe: vi.fn(),
  unobserve: vi.fn()
})

window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock)

describe('withTracker', () => {
  it('renders the base component wrapped with a ref div', () => {
    const ComponentWithTracker = withTracking(MockComponent)
    render(<ComponentWithTracker />)
    screen.getByText(/mock component/i)
  })
})
