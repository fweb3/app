import { checkHasWonGame, currentWalletGameState } from './validators'
import { IGameTaskState } from '../../types/game'

export const fetchCurrentGameState = async (
  chainId: number,
  walletAddress: string
): Promise<IGameTaskState> => {
  const wonGameState = await checkHasWonGame(chainId, walletAddress)
  if (wonGameState?.trophyId) {
    return wonGameState
  }
  return currentWalletGameState(chainId, walletAddress)
}
