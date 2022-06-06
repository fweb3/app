import { __setRouterState } from '../../../jest/jest.setup'
import { render, screen } from '@testing-library/react'
import { DisconnectedHeader } from '../Disconnected'

describe('<DisconnectedHeader />', () => {
  it('renders without crashing', () => {
    render(<DisconnectedHeader />)
    expect(screen.getByTestId('disconnected-header')).toBeInTheDocument()
    expect(screen.getByTestId('header-get-started')).toBeInTheDocument()
  })
  it('renders query connect when account is in query', () => {
    __setRouterState({ query: { account: 'foo' } })
    render(<DisconnectedHeader />)
    expect(screen.getByTestId('query-connect')).toBeInTheDocument()
  })
})
