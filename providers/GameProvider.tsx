import { useState, useEffect, createContext, useContext, Context } from 'react'
import { DotKey, DOTS_MAP, IDotsMap } from '../components/Chest/dots'
import { IFweb3Contracts, loadFweb3Contracts } from '../interfaces'
import type { GameError, IGameTaskState } from '../interfaces/game'
import { createShareInfo, ISocialShare } from './Game/social'
import { IComponentProps } from '../components/component'
import { useConnection, useLoading } from '../providers'
import { Contract } from '@ethersproject/contracts'
import { getCurrentGame } from './Game/tasks'
import { DEFAULT_GAME_STATE } from '../lib'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { logger } from '../lib'

interface IGameProviderState {
  setActiveDot: (dot: string) => void
  gameTaskState: IGameTaskState
  isFetchingGameData: boolean
  completedTasks: IDotsMap
  tokenContract: Contract | null
  gameContract: Contract | null
  hasWonGame: boolean
  activeDot: string
  trophyId: string
  trophyColor: string
  isVerified: boolean
  shareInfo: ISocialShare
  isJudge: boolean
  resetGameState: () => void
  isDotComplete: (dot: DotKey) => boolean
}

const initShareInfo = {
  imageUrl: 'https://fweb3.xyz/fweb3.png',
  tweetText: '',
  tweetUrl: '',
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: () => null,
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
  isJudge: false,
  resetGameState: () => null,
  isDotComplete: () => false,
}

const GameContext: Context<IGameProviderState> = createContext(defaultGameState)

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

const GameProvider = ({ children }: IComponentProps): JSX.Element => {
  const { fullscreenLoader, startToast, updateToast, errorToast } = useLoading()
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [tokenContract, setTokenContract] = useState<Contract | null>(null)
  const [gameContract, setGameContract] = useState<Contract | null>(null)
  const [completedTasks, setCompletedTasks] = useState<IDotsMap>(DOTS_MAP)
  const [shareInfo, setShareInfo] = useState<ISocialShare>(initShareInfo)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const { account, isConnected, provider } = useConnection()
  const [trophyColor, setTrophyColor] = useState<string>('')
  const [activeDot, setActiveDot] = useState<string>('0')
  const [isJudge, setIsJudge] = useState<boolean>(false)
  const [trophyId, setTrophyId] = useState<string>('')
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(DEFAULT_GAME_STATE)
  const { query } = useRouter()

  const loadGameGameState = async (player: string): Promise<void> => {
    if (isConnected || query?.account) {
      const toaster = startToast('Loading Game')
      try {
        fullscreenLoader(true)

        const { tokenContract, gameContract }: IFweb3Contracts =
          loadFweb3Contracts(provider)
        setTokenContract(tokenContract || null)
        setGameContract(gameContract || null)

        const { taskState, currentCompletedDots, activeDot } =
          await getCurrentGame(player)

        setCompletedTasks(currentCompletedDots)
        setGameTaskState(taskState)
        setActiveDot(activeDot)

        setHasWonGame(!!taskState?.hasWonGame)
        setTrophyId(taskState?.trophyId?.toString() || '')

        const trophyColor = calcTrophyColor(
          taskState?.trophyId?.toString() || ''
        )
        setTrophyColor(trophyColor)

        const shareInfo = createShareInfo(
          trophyId,
          trophyColor,
          currentCompletedDots
        )
        setShareInfo(shareInfo)

        setIsFetchingGameData(false)
        fullscreenLoader(false)
        updateToast('Loaded!', toaster, { type: toast.TYPE.SUCCESS })
        logger.log('[+] game loaded')
      } catch (err: GameError) {
        console.error(err)
        errorToast(err.message, toaster)
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
    logger.log('[+] game reset')
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
    if (gameContract) {
      const isJudge = await gameContract?.isJudge(player)
      isJudge && logger.log(`[+] is judge]`)
      return isJudge
    }
    return false
  }

  const checkVerification = async (player: string) => {
    if (gameContract) {
      const isVerified = await gameContract?.hasBeenVerifiedToWin(player)
      return isVerified
    }
    return false
  }

  useEffect(() => {
    if (isConnected) {
      (async () => {
        const toaster = startToast('Checking state...')
        try {
          // only check connected account for judge
          const isJudge = await checkIsJudge(account)
          setIsJudge(isJudge)
          updateToast('State checked!', toaster, { type: toast.TYPE.SUCCESS })
        } catch (err: GameError) {
          console.error(err)
          errorToast(err.message, toaster)
        }
      })()
    }
  }, [isConnected]) // eslint-disable-line

  useEffect(() => {
    (async () => {
      if (isConnected || query?.account) {
        await loadGameGameState(query?.account?.toString() ?? account)
      }
    })()
  }, [isConnected, query]) // eslint-disable-line

  useEffect(() => {
    const shouldVerifyWin =
      isConnected &&
      !!gameContract &&
      hasWonGame &&
      parseInt(trophyId || '0') < 1

    if (shouldVerifyWin) {
      (async () => {
        const toaster = toast.loading('Checking verification')
        fullscreenLoader(true)
        try {
          const isVerified = await checkVerification(account)
          setIsVerified(isVerified)
        } catch (err: GameError) {
          console.error(err)
          errorToast(err.message, toaster)
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
