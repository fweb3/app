import { useState, useEffect, createContext, useContext, Context } from 'react'
import { DotKey, DOTS_MAP, IDotsMap } from '../components/Chest/dots'
import { IFweb3Contracts, loadFweb3Contracts } from '../interfaces'
import { createShareInfo, ISocialShare } from './Game/social'
import { useConnection, useLoading } from '../providers'
import type { GameError, IGameTaskState } from '../interfaces/game'
import { getDefaultProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { AllowedChainIds } from '../interfaces'
import { getCurrentGame } from './Game/tasks'
import { DEFAULT_GAME_STATE } from '../lib'
import { Id, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { logger } from '../lib'
import { providers } from 'ethers'
import { IComponentProps } from '../components/component'

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
  isDotComplete: (task: DotKey) => boolean
}

const initShareInfo = {
  imageUrl: 'https://fweb3.xyz/fweb3.png',
  tweetText: '',
  tweetUrl: '',
}

const defaultProvider = getDefaultProvider()
const defaultContract = new Contract('default', '', defaultProvider)

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: () => {},
  isFetchingGameData: false,
  tokenContract: defaultContract,
  gameContract: defaultContract,
  completedTasks: {},
  hasWonGame: false,
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  shareInfo: initShareInfo,
  isJudge: false,
  resetGameState: () => {},
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
  const [trophyColor, setTrophyColor] = useState<string>('')
  const [activeDot, setActiveDot] = useState<string>('0')
  const [isJudge, setIsJudge] = useState<boolean>(false)
  const [trophyId, setTrophyId] = useState<string>('')
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(DEFAULT_GAME_STATE)
  const { query } = useRouter()
  const {
    account,
    isConnected,
    isConnecting,
    provider,
    network,
    handleDisconnect,
  } = useConnection()

  const loadGameGameState = async (player: string): Promise<void> => {
    if (isConnected && network?.chainId !== AllowedChainIds.POLYGON) {
      handleDisconnect()
      throw new Error('Connected to wrong network')
    }

    if (isConnected || query?.account) {
      const toaster: Id = startToast('Loading Game')
      try {
        logger.log('[+] game load [start]')
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
        setTrophyId(taskState?.trophyId.toString() || '')

        const trophyColor: string = calcTrophyColor(
          taskState?.trophyId.toString() || ''
        )
        setTrophyColor(trophyColor)

        const shareInfo: ISocialShare = createShareInfo(
          trophyId,
          trophyColor,
          currentCompletedDots
        )
        setShareInfo(shareInfo)

        setIsFetchingGameData(false)
        fullscreenLoader(false)
        updateToast('Loaded!', toaster, { type: toast.TYPE.SUCCESS })
        logger.log('[+] game load [end]')
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
    logger.log('[+] game reset!')
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
      const isJudge: boolean = await gameContract?.isJudge(player)
      logger.log(`[+] is judge: [${isJudge}]`)
      return isJudge
    }
    return false
  }

  const checkVerification = async (player: string) => {
    if (gameContract) {
      const isVerified: boolean = await gameContract?.hasBeenVerifiedToWin(
        player
      )
      return isVerified
    }
    return false
  }

  useEffect(() => {
    if (isConnected && provider) {
      ;(async () => {
        const toaster: Id = startToast('Checking state...')
        try {
          logger.log('[+] check judge [start]')
          // only check connected account for judge
          const isJudge: boolean = await checkIsJudge(account)
          setIsJudge(isJudge)
          logger.log(`[+] check judge [end]`)
        } catch (err: GameError) {
          console.error(err)
          errorToast(err.message, toaster)
        }
      })()
    }
  }, [isConnected, provider]) // eslint-disable-line

  useEffect(() => {
    ;(async () => {
      if (isConnected || query?.account) {
        await loadGameGameState(query?.account?.toString() ?? account)
      }
    })()
  }, [isConnected, query]) // eslint-disable-line

  useEffect(() => {
    const shouldVerifyWin: boolean =
      isConnected && !!gameContract && hasWonGame && trophyId === '0'
    if (shouldVerifyWin) {
      ;(async () => {
        const toaster: Id = toast.loading('Checking verification')
        fullscreenLoader(true)
        try {
          const isVerified: boolean = await checkVerification(account)
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
