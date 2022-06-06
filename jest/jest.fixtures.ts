import { DOTS_MAP } from '../components/Chest/dots'
import { DEFAULT_GAME_STATE } from '../lib'
import { IGameTaskState } from '../types'

export const MOCK_ROUTER_STATE = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
}

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

export const MOCK_ETHERS_CONTEXT = {
  isConnected: true,
  account: '',
  web3Provider: null,
  network: null,
  isConnecting: false,
  isLocal: false,
  isAllowedNetwork: true,
  isInitialized: true,
  chainId: 137,
  needsWallet: false,
  setAccount: jest.fn,
  connectAccount: jest.fn(),
}

export const MOCK_ACCOUNT_CONTEXT = {
  ensName: '',
  displayName: '',
  queryDisplayName: '',
  queryAccount: '',
  isQueryLoad: false,
  account: '',
}
