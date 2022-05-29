import { NETWORKS } from './../../types/networks.d'
import { checkHasWonGame, currentWalletGameState } from './validators'

import { IGameTaskState } from '../../types/game'

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

export const fetchCurrentGameState = async (
  chainId: number,
  walletAddress: string
): Promise<IGameTaskState> => {
  const isLocal = NETWORKS[chainId].toLowerCase() === 'local'
  if (isLocal) {
    return DEV_GAME_STATE
  }
  const wonGameState = await checkHasWonGame(chainId, walletAddress)
  if (wonGameState?.trophyId) {
    return wonGameState
  }
  return currentWalletGameState(chainId, walletAddress)
}
