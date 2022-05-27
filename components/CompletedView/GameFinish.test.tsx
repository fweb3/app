import { MOCK_GAME_CONTEXT } from '../../jest/jest.fixtures'
import { render, screen } from '@testing-library/react'
import { useGame } from '../../providers/GameProvider'
import { GameFinish } from './GameFinish'

const renderComponent = (props: any) => render(<GameFinish {...props} />)

const mockUseGame = useGame as jest.MockedFunction<typeof useGame>
const mockUseRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('<GameFinish />', () => {
  it('shouldnt allow verification if not a query account', () => {
    mockUseRouter.mockImplementationOnce(() => ({ query: { account: 'foo' } }))
    renderComponent(<GameFinish />)
    expect(screen.getByTestId('query-account-section')).toBeTruthy()
  })

  it('doesnt load verification if already has trophy', () => {
    mockUseGame.mockImplementationOnce(() => ({
      ...MOCK_GAME_CONTEXT,
      hasWonGame: true,
      trophyId: '1',
    }))
    renderComponent(<GameFinish />)
    expect(screen.getByTestId('verified-winner')).toBeTruthy()
  })

  // trophy will be '0' when reaady to be verified
  it('loads verification if haswon and trophy is 0', () => {
    mockUseGame.mockImplementationOnce(() => ({
      ...MOCK_GAME_CONTEXT,
      trophyId: '0',
    }))
    renderComponent(<GameFinish />)
    expect(screen.getByTestId('seek-verification'))
  })
})
