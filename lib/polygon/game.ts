import { checkHasWonGame, currentWalletGameState } from './validators'
import { IGameTaskState } from '../../interfaces/game'

export const fetchCurrentGameState = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const wonGameState = await checkHasWonGame(walletAddress)
  if (wonGameState && wonGameState.trophyId) {
    return wonGameState
  }
  return currentWalletGameState(walletAddress)
}
