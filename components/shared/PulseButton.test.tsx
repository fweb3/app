import { fireEvent, render, screen } from '@testing-library/react'
import type { IButtonProps } from './PulseButton'
import { PulseButton } from './PulseButton'

const renderComponent = (props: IButtonProps) =>
  render(
    <PulseButton {...props}>
      <div>{props.children}</div>
    </PulseButton>
  )

const mockClickHandler = jest.fn()

describe('<PulseButton />', () => {
  it('renders without crashing', () => {
    renderComponent({ onClick: mockClickHandler, children: <>foo</> })
    const btn = screen.getByTestId('pulse-btn')
    fireEvent.click(btn)
    expect(btn).toBeInTheDocument()
    expect(mockClickHandler).toHaveBeenCalled()
  })
})
