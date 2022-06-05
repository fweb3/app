import { Footer } from './Footer'
import { render, screen } from '@testing-library/react'

// eslint-disable-next-line react/display-name
jest.mock('next/link', () => () => <div>fake</div>)

const renderComponent = () => render(<Footer />)

describe('<Footer />', () => {
  it('renders without crashing', () => {
    renderComponent()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
