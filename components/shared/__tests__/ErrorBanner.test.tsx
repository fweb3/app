import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBanner } from '../ErrorBanner'

const mockHandleClick = jest.fn()
jest.mock('../../../hooks/Device', () => ({
  useDevice: () => ({
    device: 'desktop',
  }),
}))

jest.mock('../../../hooks/Error', () => ({
  useError: () => ({
    errorMessage: 'foo',
    setErrorMessage: mockHandleClick,
  }),
}))

const renderComponent = () => render(<ErrorBanner />)

describe('<ErrorBanner />', () => {
  it('renders without crashing', () => {
    renderComponent()
    expect(screen.getByTestId('error-banner')).toBeInTheDocument()
  })
  it('closes the banner on click', () => {
    renderComponent()
    fireEvent.click(screen.getByTestId('close-btn'))
    expect(mockHandleClick).toHaveBeenCalled()
  })
})
