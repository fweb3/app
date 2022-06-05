import { DOTS_MAP, DotKey } from '../../components/Chest/dots'
import { renderHook } from '@testing-library/react-hooks'
import type { GameError, IComponentProps } from '../../types'
import { DEFAULT_GAME_STATE } from '../../lib'
import { GameProvider } from './GameProvider'
import { getCurrentGame } from './tasks'
import { useGame } from './useGame'

jest.unmock('./useGame')
jest.mock('./tasks')

const wrapper = ({ children }: IComponentProps) => (
  <GameProvider>{children}</GameProvider>
)

describe('useGame', () => {
  beforeAll(() => {
    jest.mocked(getCurrentGame).mockResolvedValue({
      taskState: DEFAULT_GAME_STATE,
      currentCompletedDots: DOTS_MAP,
      activeDot: '0',
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('loads the game contracts', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGame(), {
      wrapper,
    })
    await waitForNextUpdate()
    expect(result.current.pollAddress).toBe('137_mock_fweb3_poll_address')
    expect(result.current.diamondNftAddress).toBe(
      '137_mock_fweb3_diamond_nft_address'
    )
    expect(result.current.burnAddress).toBe('137_mock_burn_address')
    expect(result.current.trophyAddress).toBe('137_mock_fweb3_trophy_address')
    expect(result.current.gameAddress).toBe('mock_contract_address')
    expect(result.current.tokenAddress).toBe('mock_contract_address')
    expect(result.current.gameContract).toBeTruthy()
    expect(result.current.tokenContract).toBeTruthy()
  })

  it('loads the current game', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGame(), {
      wrapper,
    })
    await waitForNextUpdate()
    Object.entries(result.current.completedTasks).map(([, v]) => {
      expect(Object.keys(DotKey).includes(v.task)).toBeTruthy()
    })
    expect(Object.keys(result.current.completedTasks)).toHaveLength(9)
    Object.entries(result.current.gameTaskState).map(([, v]) => {
      expect(v && v !== '0').toBeFalsy()
    })
    expect(result.current.activeDot).toBe('0')
    expect(result.current.hasWonGame).toBeFalsy()
    expect(result.current.trophyColor).toBeFalsy()
    expect(result.current.isFetchingGameData).toBeFalsy()
  })

  it('sets trophy color', async () => {
    jest.mocked(getCurrentGame).mockResolvedValueOnce({
      taskState: { ...DEFAULT_GAME_STATE, trophyId: '1' },
      currentCompletedDots: DOTS_MAP,
      activeDot: '0',
    })
    const { result, waitForNextUpdate } = renderHook(() => useGame(), {
      wrapper,
    })
    await waitForNextUpdate()
    expect(result.current.trophyColor).toBe('gold')
  })

  it('sets an error message when loading fails', async () => {
    jest.spyOn(console, 'error').mockReturnValueOnce()
    try {
      jest.mocked(getCurrentGame).mockRejectedValue('rejected')
      const { waitForNextUpdate } = renderHook(() => useGame(), {
        wrapper,
      })
      await waitForNextUpdate()
    } catch (err: GameError) {
      expect(err.message).toBe('rejected')
    }
  })

  it('checks that a dot is complete', async () => {
    jest.mocked(getCurrentGame).mockResolvedValueOnce({
      taskState: { ...DEFAULT_GAME_STATE, hasBurnedTokens: true },
      currentCompletedDots: DOTS_MAP,
      activeDot: '0',
    })
    const { result, waitForNextUpdate, waitFor } = renderHook(() => useGame(), {
      wrapper,
    })
    await waitForNextUpdate()
    waitFor(() => {
      const isComplete = result.current.isDotComplete(DotKey.hasBurnedTokens)
      expect(isComplete).toBe(true)
    })
  })
})
