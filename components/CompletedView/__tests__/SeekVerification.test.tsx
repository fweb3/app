import { render, screen } from '@testing-library/react'
import { SeekVerification } from '../SeekVerification'

const renderComponent = () => render(<SeekVerification />)

describe('<SeekVerification />', () => {
  it('renders without crashing', () => {
    renderComponent()
    expect(screen.getByTestId('seek-verification')).toBeInTheDocument()
  })
})
