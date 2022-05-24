import { IGameTaskState } from '../../interfaces/game'

export const USE_LIVE_DATA = true

export const DEV_GAME_STATE: IGameTaskState = {
  tokenBalance: '300000000000000000000',
  hasEnoughTokens: true, // 1
  hasUsedFaucet: false, // 2
  hasSentTokens: true, // 3
  hasMintedNFT: true, // 4
  hasBurnedTokens: true, // 5
  hasSwappedTokens: true, // 6
  hasVotedInPoll: true, // 7
  hasDeployedContract: true, // 8
  hasWonGame: false,
  isConnected: false,
  trophyId: '',
  maticBalance: '100000000000000000',
}
