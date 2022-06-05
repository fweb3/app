import { checkHasWonGame, currentWalletGameState } from './validators'
import { DEFAULT_GAME_STATE, DEV_GAME_STATE } from '../constants'
import { fetchCurrentGameState } from './game'

jest.mock('./validators')

describe('the game', () => {
  it('fetches current game state', async () => {
    jest.mocked(checkHasWonGame).mockResolvedValue(null)
    jest.mocked(currentWalletGameState).mockResolvedValue(DEFAULT_GAME_STATE)
    const actual = await fetchCurrentGameState(137, 'foo')
    expect(actual).toBe(DEFAULT_GAME_STATE)
  })
  it('sends back a winner game state', async () => {
    jest
      .mocked(checkHasWonGame)
      .mockResolvedValue({ ...DEFAULT_GAME_STATE, trophyId: '100' })
    const actual = await fetchCurrentGameState(137, 'foo')
    expect(actual).toEqual({ ...DEFAULT_GAME_STATE, trophyId: '100' })
  })

  it('sends dev data when network is local', async () => {
    const actual = await fetchCurrentGameState(1337, 'foo')
    expect(actual).toBe(DEV_GAME_STATE)
  })
})
