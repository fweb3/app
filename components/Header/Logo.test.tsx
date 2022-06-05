import { render, screen } from '@testing-library/react'
import { HeaderLogo } from './Logo'

describe('<HeaderLogo />', () => {
  it('renders without crashing', () => {
    render(<HeaderLogo />)
    expect(screen.getByTestId('header-logo')).toBeInTheDocument()
  })
})
