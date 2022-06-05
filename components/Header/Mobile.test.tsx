import { render, screen } from '@testing-library/react'
import { MobileHeader } from './Mobile'

describe('<MobileHeader />', () => {
  it('renders without crashing', () => {
    render(<MobileHeader />)
    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
  })
})
