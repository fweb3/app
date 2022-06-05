import { LoadingDots, ILoadingProps } from './LoadingDots'
import { render, screen } from '@testing-library/react'

const renderComponent = (props: ILoadingProps) =>
  render(<LoadingDots {...props} />)

describe('<LoadingDots />', () => {
  it('renders without crashing', () => {
    renderComponent({ isLoading: true })
    expect(screen.getByTestId('loading-dots')).toBeInTheDocument()
  })
})
