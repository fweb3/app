import { IDotsMap, DOTS_MAP, DotKey, IDot } from '../../components/Chest/dots'
import { IGameTaskState } from '../../interfaces/game'
import { DEV_GAME_STATE, USE_LIVE_DATA } from './dev'
import { logger } from '../../lib'
import { ethers } from 'ethers'

interface ICurrentTaskState extends IDotsCompleted {
  taskState: IGameTaskState
}

interface IDotsCompleted {
  currentCompletedDots: IDotsMap
  activeDot: string
}

export const getCurrentGame = async (
  player: string,
  cypress = false
): Promise<ICurrentTaskState> => {
  const taskState = await fetchTaskState(player, cypress)
  const { currentCompletedDots, activeDot } = mapDotsCompleted(taskState)
  return { taskState, currentCompletedDots, activeDot }
}

export const fetchTaskState = async (
  player: string,
  isCypress: boolean
): Promise<IGameTaskState> => {
  if (USE_LIVE_DATA || isCypress) {
    const url = `/api/polygon?account=${player}`
    const apiResponse = await fetch(url)
    const taskState = await apiResponse.json()
    logger.log(`[+] fetched live game data`)
    console.log({ taskState })
    return taskState
  }
  logger.log('[+] using dev game data')

  return DEV_GAME_STATE
}

const mapDotsCompleted = (newGameTaskState: IGameTaskState): IDotsCompleted => {
  let activeDot = 0
  const currentCompletedDots: IDotsMap = {}
  const maticBalance = ethers.utils.formatEther(
    newGameTaskState?.maticBalance?.toString() || '0'
  )
  const connectedTaskState = { ...newGameTaskState, isConnected: true }
  Object.entries(DOTS_MAP).map(([key, value]: [string, IDot]) => {
    // eslint-disable-next-line
    // @ts-ignore
    const isCompleted = connectedTaskState[value?.task] || false
    if (isCompleted && parseInt(key) > activeDot) {
      activeDot = parseInt(key)
    }
    // if they have matic already mark faucet as used.
    if (
      value?.task === DotKey.hasUsedFaucet &&
      parseFloat(maticBalance) >= 0.1
    ) {
      currentCompletedDots[key] = { ...value, isCompleted: true }
      activeDot = parseInt(key)
    } else {
      currentCompletedDots[key] = { ...value, isCompleted }
    }
  })

  return { currentCompletedDots, activeDot: activeDot.toString() }
}

export const numTasksCompleted = (completedTasks: IDotsMap) => {
  return Object.entries(completedTasks).filter(([, v]) => v.isCompleted).length
}
