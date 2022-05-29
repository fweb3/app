import { DOTS_MAP } from '../components/Chest/dots'
import { IGameTaskState } from '../types/game'
import { DEFAULT_GAME_STATE } from '../lib'

export const MOCK_GAME_CONTEXT = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: jest.fn().mockReturnValue('0'),
  isFetchingGameData: false,
  tokenContract: null,
  gameContract: null,
  completedTasks: DOTS_MAP,
  hasWonGame: false,
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  isJudge: false,
  gameAddress: 'foobarbaz',
  tokenAddress: 'bazbarfoo',
  trophyAddress: 'bangpowsplat',
  burnAddress: 'burnme',
  diamondNftAddress: 'brightlikeadiamon',
  pollAddress: 'poooooooll',
  resetGameState: jest.fn(),
  isDotComplete: jest.fn().mockReturnValue(false),
}

export const WIN_GAME_STATE: IGameTaskState = {
  tokenBalance: '300000000000000000000',
  hasEnoughTokens: true, // 1
  hasUsedFaucet: true, // 2
  hasSentTokens: true, // 3
  hasMintedNFT: true, // 4
  hasBurnedTokens: true, // 5
  hasSwappedTokens: true, // 6
  hasVotedInPoll: true, // 7
  hasDeployedContract: true, // 8
  hasWonGame: true,
  isConnected: true,
  trophyId: '',
  maticBalance: '100000000000000000',
}
