import { IDotsMap, DOTS_MAP, DotKey, IDot } from '../../components/Chest/dots'
import { IGameTaskState } from '../../interfaces/game'
import { DEV_GAME_STATE, USE_LIVE_DATA } from './dev'
import { ethers } from 'ethers'

interface ICurrentTaskState extends IDotsCompleted {
  taskState: IGameTaskState
}

interface IDotsCompleted {
  currentCompletedDots: IDotsMap
  activeDot: string
}

export const getCurrentGame = async (player: string): Promise<ICurrentTaskState> => {
  const taskState = await fetchTaskState(player)
  const { currentCompletedDots, activeDot } = mapDotsCompleted(taskState)
  return { taskState, currentCompletedDots, activeDot }
}

export const fetchTaskState = async (player: string): Promise<IGameTaskState> => {
  if (USE_LIVE_DATA) {
    const url = `/api/polygon?account=${player}`
    const apiResponse = await fetch(url)
    const taskState: IGameTaskState = await apiResponse.json()
    return taskState
  }
  return DEV_GAME_STATE
}

const mapDotsCompleted = (newGameTaskState: IGameTaskState): IDotsCompleted => {
  let activeDot = 0
  const currentCompletedDots: IDotsMap = {}
  const tokenBalance = ethers.utils.formatEther(newGameTaskState?.tokenBalance?.toString() || '0')
  const maticBalance = ethers.utils.formatEther(newGameTaskState?.maticBalance?.toString() || '0')

  Object.entries(DOTS_MAP).map(([key, value]: [string, IDot]) => {
    // @ts-ignore
    const isCompleted = newGameTaskState[value?.task] || false
    if (isCompleted && parseInt(key) > activeDot) {
      activeDot = parseInt(key)
    }
    // if they have matic already mark faucet as used.
    if (value?.task === DotKey.hasUsedFaucet && parseFloat(maticBalance) >= 0.1) {
      currentCompletedDots[key] = { ...value, isCompleted: true }
      activeDot = parseInt(key)
    } else {
      currentCompletedDots[key] = { ...value, isCompleted }
    }
  })

  return { currentCompletedDots, activeDot: activeDot.toString() }
}