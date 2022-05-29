import { useState, useEffect, createContext, useContext, Context } from 'react'
import { DotKey, DOTS_MAP, IDotsMap } from '../components/Chest/dots'
// eslint-disable-next-line
import type { GameError, IGameTaskState } from '../types/game'
import { IComponentProps } from '../components/component'
import { useEthers, useLoading } from '../providers'
import { Contract } from '@ethersproject/contracts'
import { loadAddress, loadFweb3Contracts } from '../interfaces'
import { useAccount } from './AccountProvider'
import { getCurrentGame } from './Game/tasks'
import { DEFAULT_GAME_STATE } from '../lib'
import { logger } from '../lib'

interface IGameProviderState {
  setActiveDot: (dot: string) => void
  gameTaskState: IGameTaskState
  isFetchingGameData: boolean
  completedTasks: IDotsMap
  hasWonGame: boolean
  activeDot: string
  trophyId: string
  trophyColor: string
  isVerified: boolean
  isJudge: boolean
  tokenContract: Contract | null
  gameContract: Contract | null
  pollAddress: string
  gameAddress: string
  tokenAddress: string
  trophyAddress: string
  burnAddress: string
  diamondNftAddress: string
  resetGameState: () => void
  isDotComplete: (dot: DotKey) => boolean
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: () => null,
  isFetchingGameData: false,
  completedTasks: {},
  hasWonGame: false,
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  isJudge: false,
  tokenContract: null,
  gameContract: null,
  tokenAddress: '',
  gameAddress: '',
  trophyAddress: '',
  burnAddress: '',
  diamondNftAddress: '',
  pollAddress: '',
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
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [completedTasks, setCompletedTasks] = useState<IDotsMap>(DOTS_MAP)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const [pollAddress, setPollAddress] = useState<string>('')
  const [gameContract, setGameContract] = useState<Contract | null>(null)
  const [tokenContract, setTokenContract] = useState<Contract | null>(null)
  const [trophyAddress, setTrophyAddress] = useState<string>('')
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [diamondNftAddress, setDiamondNftAddress] = useState<string>('')
  const [trophyColor, setTrophyColor] = useState<string>('')
  const [gameAddress, setGameAddress] = useState<string>('')
  const [burnAddress, setBurnAddress] = useState<string>('')

  const [activeDot, setActiveDot] = useState<string>('0')
  const [isJudge, setIsJudge] = useState<boolean>(false)
  const [trophyId, setTrophyId] = useState<string>('')
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(DEFAULT_GAME_STATE)
  const { setIsLoading } = useLoading()
  const { queryAccount } = useAccount()
  const {
    account,
    isConnected,
    web3Provider,
    isAllowedNetwork,
    isCypress,
    chainId,
  } = useEthers()

  const loadGameGameState = async (player: string): Promise<void> => {
    try {
      setIsLoading(true)
      const { tokenContract, gameContract } = await loadFweb3Contracts(
        web3Provider
      )
      const trophyAddress = loadAddress(chainId, 'fweb3_trophy')[0]
      const burnAddress = loadAddress(chainId, 'burn')[0]
      const diamondNftAddress = loadAddress(chainId, 'fweb3_diamond_nft')[0]
      const pollAddress = loadAddress(chainId, 'fweb3_poll')[0]

      setPollAddress(pollAddress)
      setDiamondNftAddress(diamondNftAddress)
      setBurnAddress(burnAddress)
      setTrophyAddress(trophyAddress || '')
      setTokenContract(tokenContract)
      setGameContract(gameContract)
      setGameAddress(gameContract?.address || '')
      setTokenAddress(tokenContract?.address || '')

      const { taskState, currentCompletedDots, activeDot } =
        await getCurrentGame(player, !!isCypress)

      setCompletedTasks(currentCompletedDots)
      setGameTaskState(taskState)
      setActiveDot(activeDot)

      setHasWonGame(!!taskState?.hasWonGame)
      setTrophyId(taskState?.trophyId?.toString() || '')

      const trophyColor = calcTrophyColor(taskState?.trophyId?.toString() || '')
      setTrophyColor(trophyColor)

      setIsFetchingGameData(false)
      setIsLoading(false)
      logger.log('[+] Game state loaded')
    } catch (err: GameError) {
      console.error(err)
      resetGameState()
      setIsLoading(false)
    }
  }

  const resetGameState = () => {
    setCompletedTasks(DOTS_MAP)
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
      Object.entries(completedTasks).filter(([, v]) => {
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
    if (isConnected && isAllowedNetwork) {
      ;(async () => {
        try {
          // only check connected account for judge
          const isJudge = await checkIsJudge(account)
          setIsJudge(isJudge)
        } catch (err: GameError) {
          console.error(err)
        }
      })()
    }
  }, [isConnected, isAllowedNetwork]) // eslint-disable-line

  useEffect(() => {
    ;(async () => {
      if ((isConnected || !!queryAccount) && isAllowedNetwork) {
        await loadGameGameState(queryAccount?.toString() ?? account)
      }
    })()
  }, [isConnected, queryAccount]) // eslint-disable-line

  useEffect(() => {
    const shouldVerifyWin =
      isConnected &&
      !!gameContract &&
      hasWonGame &&
      parseInt(trophyId || '0') < 1

    if (shouldVerifyWin) {
      ;(async () => {
        setIsLoading(true)
        try {
          const isVerified = await checkVerification(account)
          setIsVerified(isVerified)
        } catch (err: GameError) {
          console.error(err)
          setIsLoading(false)
        }
      })()
    }
    // eslint-disable-next-line
  }, [web3Provider, gameContract, hasWonGame, trophyId, account])

  return (
    <GameContext.Provider
      value={{
        activeDot,
        setActiveDot,
        gameTaskState,
        trophyId,
        hasWonGame,
        isFetchingGameData,
        completedTasks,
        trophyColor,
        isVerified,
        isJudge,
        gameContract,
        tokenContract,
        gameAddress,
        tokenAddress,
        trophyAddress,
        burnAddress,
        diamondNftAddress,
        pollAddress,
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
