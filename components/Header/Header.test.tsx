import { render, screen } from '@testing-library/react'
import { Header } from './Header'
import { useDevice } from '../../hooks/Device'

jest.mock('../../hooks/Device')

jest.mock('./Desktop', () => ({
  DesktopHeader: () => <div data-testid="desktop-header">desktop</div>,
}))
jest.mock('./Mobile', () => ({
  MobileHeader: () => <div data-testid="mobile-header">mobile</div>,
}))

describe('<Header />', () => {
  it('renders without crashing', () => {
    jest.mocked(useDevice).mockReturnValueOnce({ device: 'mobile' })
    render(<Header />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-header')).toBeInTheDocument()
  })
  it('renders mobile header', () => {
    jest.mocked(useDevice).mockReturnValueOnce({ device: 'desktop' })
    render(<Header />)
    expect(screen.getByTestId('desktop-header')).toBeInTheDocument()
  })
})
