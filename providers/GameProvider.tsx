import { useState, useEffect, createContext, useContext } from 'react'
import { DotKey, DOTS_MAP, IDotsMap } from '../components/Chest/dots'
import { createShareInfo, ISocialShare } from './Game/social'
import { useConnection, useLoading } from '../providers'
import type { IGameTaskState } from '../interfaces/game'
import { loadFweb3Contracts } from '../interfaces'
import { AllowedChainIds } from '../interfaces'
import { getCurrentGame } from './Game/tasks'
import { DEFAULT_GAME_STATE } from '../lib'
import { Id, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Contract } from 'ethers'
import { logger } from '../lib'
interface IGameProviderState {
  setActiveDot: (dot: string) => void
  gameTaskState: IGameTaskState
  isFetchingGameData: boolean
  completedTasks: IDotsMap
  tokenContract: Contract
  gameContract: Contract
  hasWonGame: boolean
  activeDot: string
  trophyId: string
  trophyColor: string
  isVerified: boolean
  shareInfo?: ISocialShare
  isQueryLoad: boolean
  isJudge: boolean
  resetGameState: () => void
  isDotComplete: (task: DotKey) => boolean
}

const initShareInfo = {
  imageUrl: 'https://fweb3.xyz/fweb3.png',
  tweetText: '',
  tweetUrl: '',
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: () => {},
  isFetchingGameData: false,
  tokenContract: null,
  gameContract: null,
  completedTasks: {},
  hasWonGame: false,
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  shareInfo: initShareInfo,
  isQueryLoad: false,
  isJudge: false,
  resetGameState: () => {},
  isDotComplete: () => false,
}

const GameContext = createContext(defaultGameState)

const calcTrophyColor = (trophyId: string): string => {
  if (!trophyId) return ''
  const trophyInt = parseInt(trophyId)
  if (trophyInt <= 333) {
    return 'gold'
  } else if (trophyInt <= 3333) {
    return 'silver'
  }
  return 'copper'
}

const GameProvider = ({ children }) => {
  const { account, isConnected, provider, network, handleDisconnect } =
    useConnection()
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [completedTasks, setCompletedTasks] = useState<IDotsMap>(DOTS_MAP)
  const [shareInfo, setShareInfo] = useState<ISocialShare>(initShareInfo)
  const { fullscreenLoader, startToast, updateToast } = useLoading()
  const [isQueryLoad, setIsQueryLoad] = useState<boolean>(false)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [trophyColor, setTrophyColor] = useState<string>('')
  const [tokenContract, setTokenContract] = useState(null)
  const [activeDot, setActiveDot] = useState<string>('0')
  const [gameContract, setGameContract] = useState(null)
  const [isJudge, setIsJudge] = useState<boolean>(false)
  const [trophyId, setTrophyId] = useState<string>('')
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(DEFAULT_GAME_STATE)
  const { query } = useRouter()

  const loadGameGameState = async (player: string) => {
    if (isConnected && network.chainId !== AllowedChainIds.POLYGON) {
      handleDisconnect()
      throw new Error('Connected to wrong network')
    }

    if (isConnected || query?.account) {
      const toaster = startToast('Loading Game')
      try {
        fullscreenLoader(true)
        setIsQueryLoad(!!query?.account)

        const { tokenContract, gameContract } = loadFweb3Contracts(provider)
        setTokenContract(tokenContract)
        setGameContract(gameContract)

        // if the wallet is coming from URL use that. else use connected
        const { taskState, currentCompletedDots, activeDot } =
          await getCurrentGame(query?.account.toString() ?? player)

        setCompletedTasks(currentCompletedDots)
        setGameTaskState(taskState)
        setActiveDot(activeDot)

        setHasWonGame(taskState?.hasWonGame || false)
        setTrophyId(taskState?.trophyId || '')

        const trophyColor: string = calcTrophyColor(taskState?.trophyId)
        setTrophyColor(trophyColor)

        const isJudge = await checkIsJudge(account)
        setIsJudge(isJudge)

        const shareInfo: ISocialShare = createShareInfo(
          trophyId,
          trophyColor,
          currentCompletedDots
        )
        setShareInfo(shareInfo)
        handleSuccess()
        updateToast(toaster, null, { type: toast.TYPE.SUCCESS })
      } catch (err) {
        console.error(err)
        handleError(toaster, err.message)
        resetGameState()
        fullscreenLoader(false)
      }
    }
  }

  const resetGameState = () => {
    setCompletedTasks(DOTS_MAP)
    setShareInfo(initShareInfo)
    setHasWonGame(false)
    setIsVerified(false)
    setTrophyColor('')
    setActiveDot('0')
    setIsJudge(false)
    setTrophyId('')
    setGameTaskState(DEFAULT_GAME_STATE)
    logger.log('GAME_RESET')
  }

  const isDotComplete = (task: DotKey): boolean => {
    return (
      Object.entries(completedTasks).filter(([k, v]) => {
        if (v.task === task && v.isCompleted) {
          return v
        }
      }).length !== 0
    )
  }

  const checkIsJudge = async (player: string): Promise<boolean> => {
    const { gameContract } = loadFweb3Contracts(provider)
    const isJudge = await gameContract.isJudge(player)
    logger.log(`IS_JUDGE: [${isJudge}]`)
    return isJudge
  }

  const handleSuccess = (data: any = {}, cb: any = () => {}) => {
    cb(data)
    fullscreenLoader(false)
    setIsFetchingGameData(false)
  }

  const handleError = (toaster: Id, message: string) => {
    fullscreenLoader(false)
    setIsFetchingGameData(false)
    toaster &&
      updateToast(toaster, message, {
        type: toast.TYPE.ERROR,
      })
  }

  const checkVerification = async (player: string) => {
    const isVerified = await gameContract.hasBeenVerifiedToWin(player)
    return isVerified
  }

  useEffect(() => {
    ;(async () => {
      if (isConnected || query?.account) {
        await loadGameGameState(query?.account.toString() ?? account)
      }
    })()
  }, [isConnected, query]) // eslint-disable-line

  useEffect(() => {
    const shouldVerifyWin =
      isConnected && gameContract && hasWonGame && trophyId === '0'
    if (shouldVerifyWin) {
      ;(async () => {
        const toaster = toast.loading('Checking verification')
        fullscreenLoader(true)
        try {
          const isVerified = await checkVerification(account)
          setIsVerified(isVerified)
        } catch (err) {
          console.error(err)
          handleError(toaster, err.message)
          fullscreenLoader(false)
        }
      })()
    }
    // eslint-disable-next-line
  }, [provider, gameContract, hasWonGame, trophyId, account])

  return (
    <GameContext.Provider
      value={{
        activeDot,
        setActiveDot,
        gameTaskState,
        trophyId,
        hasWonGame,
        isFetchingGameData,
        gameContract,
        tokenContract,
        completedTasks,
        trophyColor,
        isVerified,
        shareInfo,
        isQueryLoad,
        isJudge,
        resetGameState,
        isDotComplete,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)

export { GameProvider, useGame }
