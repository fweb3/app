import { IGameTaskState } from '../../types/game'

export const USE_LIVE_DATA = false

export const DEV_GAME_STATE: IGameTaskState = {
  tokenBalance: '300000000000000000000',
  hasEnoughTokens: false, // 1
  hasUsedFaucet: false, // 2
  hasSentTokens: false, // 3
  hasMintedNFT: false, // 4
  hasBurnedTokens: false, // 5
  hasSwappedTokens: false, // 6
  hasVotedInPoll: false, // 7
  hasDeployedContract: false, // 8
  hasWonGame: false,
  isConnected: false,
  trophyId: '',
  maticBalance: '100000000000000000',
}
