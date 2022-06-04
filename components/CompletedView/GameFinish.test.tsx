import { MOCK_GAME_CONTEXT } from '../../jest/jest.fixtures'
import { __setRouterState } from '../../jest/jest.setup'
import { render, screen } from '@testing-library/react'
import { GameFinish } from './GameFinish'
import { useGame } from '../../hooks'

describe('<GameFinish />', () => {
  afterEach(() => {
    __setRouterState()
  })
  it('shouldnt allow verification if not a query account', () => {
    __setRouterState({ query: { account: 'foo' } })
    render(<GameFinish />)
    expect(screen.getByTestId('query-account-section')).toBeTruthy()
  })

  it('doesnt load verification if already has trophy', () => {
    jest.mocked(useGame).mockImplementationOnce(() => ({
      ...MOCK_GAME_CONTEXT,
      hasWonGame: true,
      trophyId: '1',
    }))
    render(<GameFinish />)
    expect(screen.getByTestId('verified-winner')).toBeTruthy()
  })

  // trophy will be '0' when ready to be verified
  it('loads verification if haswon and trophy is 0', () => {
    jest.mocked(useGame).mockImplementationOnce(() => ({
      ...MOCK_GAME_CONTEXT,
      trophyId: '0',
    }))
    render(<GameFinish />)
    expect(screen.getByTestId('seek-verification')).toBeTruthy()
  })
})
