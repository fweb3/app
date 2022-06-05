import { DOTS_MAP, DotKey } from '../../components/Chest/dots'
import { renderHook } from '@testing-library/react-hooks'
import type { IComponentProps } from '../../types'
import { DEFAULT_GAME_STATE } from '../../lib'
import { GameProvider } from './GameProvider'
import { getCurrentGame } from './tasks'
import { useGame } from './useGame'

const mockTokenContract = { address: 'mock_token_contract_address' }
const mockGameContract = {
  isJudge: jest.fn(),
  address: 'mock_game_contract_address',
  hasBeenVerifiedToWin: jest.fn(),
}

jest.unmock('./useGame')
jest.mock('@ethersproject/contracts')
jest.mock('./tasks')
jest.mock('../../interfaces', () => ({
  loadAddress: jest.fn(() => ['mock_address']),
  loadFweb3Contracts: jest.fn(async () => ({
    tokenContract: mockTokenContract,
    gameContract: mockGameContract,
  })),
}))

const wrapper = ({ children }: IComponentProps) => (
  <GameProvider>{children}</GameProvider>
)

describe('useGame', () => {
  beforeAll(() => {
    jest.mocked(getCurrentGame).mockResolvedValue({
      taskState: {},
      currentCompletedDots: {},
      activeDot: '',
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
    expect(result.current.pollAddress).toBe('mock_address')
    expect(result.current.diamondNftAddress).toBe('mock_address')
    expect(result.current.burnAddress).toBe('mock_address')
    expect(result.current.trophyAddress).toBe('mock_address')
    expect(result.current.gameAddress).toBe('mock_game_contract_address')
    expect(result.current.tokenAddress).toBe('mock_token_contract_address')
    expect(result.current.gameContract?.address).toBe(
      'mock_game_contract_address'
    )
    expect(result.current.tokenContract?.address).toBe(
      'mock_token_contract_address'
    )
  })

  it('loads the current game', async () => {
    jest.mocked(getCurrentGame).mockResolvedValueOnce({
      taskState: DEFAULT_GAME_STATE,
      currentCompletedDots: DOTS_MAP,
      activeDot: '0',
    })
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
})
