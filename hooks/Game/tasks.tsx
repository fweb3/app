import { IDotsMap, DOTS_MAP, DotKey, IDot } from '../../components/Chest/dots'
import { IGameTaskState } from '../../types/game'
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
  chainId: number,
  player: string
): Promise<ICurrentTaskState> => {
  const taskState = await fetchTaskState(chainId, player)
  const { currentCompletedDots, activeDot } = mapDotsCompleted(taskState)
  return { taskState, currentCompletedDots, activeDot }
}

export const fetchTaskState = async (
  chainId: number,
  player: string
): Promise<IGameTaskState> => {
  const url = `/api/polygon?account=${player}&chainId=${chainId}`
  const apiResponse = await fetch(url)
  const taskState = await apiResponse.json()
  if (taskState.status === 'error') {
    throw new Error(taskState.error)
  }
  logger.log(JSON.stringify(taskState, null, 2))
  return taskState
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
