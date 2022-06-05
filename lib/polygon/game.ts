import { checkHasWonGame, currentWalletGameState } from './validators'
import { NETWORKS, IGameTaskState } from './../../types'
import { DEV_GAME_STATE } from '../constants'
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
