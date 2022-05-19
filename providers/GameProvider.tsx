import { useState, useEffect, createContext, useContext } from 'react'
import { DOTS_MAP, IDotsMap } from '../components/Chest/dots'
import { useConnection, useLoading } from '../providers'
import { loadGameContracts } from '../interfaces'
import type { IGameTaskState } from '../types'
import { DEFAULT_GAME_STATE } from '../lib'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Contract } from 'ethers'

interface IGameProviderState {
  handleSetActiveDot: (dot: number) => void
  gameTaskState: IGameTaskState
  loadGameGameState: () => void
  isFetchingGameData: boolean
  completedTasks: IDotsMap
  tokenContract: Contract
  gameContract: Contract
  hasWonGame: boolean
  activeDot: number
  trophyId: string
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  handleSetActiveDot: () => {},
  loadGameGameState: () => {},
  isFetchingGameData: false,
  tokenContract: null,
  gameContract: null,
  completedTasks: {},
  hasWonGame: false,
  activeDot: 0,
  trophyId: '',
}

const GameContext = createContext(defaultGameState)

const INIT_GAME_STATE: IGameTaskState = {
  tokenBalance: '3000',
  hasEnoughTokens: true,
  hasDeployedContract: true,
  hasMintedNFT: true,
  hasSentTokens: true,
  hasBurnedTokens: true,
  hasUsedFaucet: true,
  hasSwappedTokens: true,
  hasVotedInPoll: true,
  hasWonGame: false,
  trophyId: '0',
}

const GameProvider = ({ children }) => {
  const { account, isConnected, provider, network, handleDisconnect } =
    useConnection()
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [completedTasks, setCompletedTasks] = useState<IDotsMap>(DOTS_MAP)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [tokenContract, setTokenContract] = useState(null)
  const [gameContract, setGameContract] = useState(null)
  const [activeDot, setActiveDot] = useState<number>(-1)
  const [trophyId, setTrophyId] = useState<string>('')
  const { fullscreenLoader } = useLoading()
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(INIT_GAME_STATE)
  const {
    query: { wallet },
  } = useRouter()

  const handleSetActiveDot = (dot: number) => {
    setActiveDot(dot)
  }

  const loadGameGameState = async () => {
    if (isConnected && network.chainId !== 137) {
      toast.error('Please connect to polygon network', {
        autoClose: 6000,
      })
      handleDisconnect()
      return
    }

    if (true) {
      const toaster = toast.loading('Loading game state', {
        autoClose: 1000,
        pauseOnFocusLoss: false,
        toastId: 'GAME_LOAD',
      })
      try {
        fullscreenLoader(true)
        // if the wallet is coming from URL use that. else use connected
        // const url = `/api/polygon?wallet_address=${wallet ?? account}`
        // const apiResponse = await fetch(url)
        // const taskState: IGameTaskState = await apiResponse.json()
        // const completionStates: number[] = calcCompletionStates(taskState)
        // const completionStates: number[] = calcCompletionStates(INIT_GAME_STATE)
        // setCompletionStates(completionStates)
        setGameTaskState(INIT_GAME_STATE)
        setTrophyId(gameTaskState?.trophyId || '')
        setHasWonGame(gameTaskState?.hasWonGame || false)
        const completedTasks = mapCompletedTasks(isConnected, INIT_GAME_STATE)
        console.log({ completedTasks })
        setCompletedTasks(completedTasks)
        handleSetActiveDot(0)
        setIsFetchingGameData(false)
        fullscreenLoader(false)

        // Temp fix until toastify library gets fixed
        setTimeout(() => {
          toast.update(toaster, {
            toastId: 'GAME_LOAD',
            render: 'Loaded!',
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 1000,
            pauseOnFocusLoss: false,
            hideProgressBar: undefined,
          })
        }, 1000)
      } catch (err) {
        console.error(err)
        toast.update(toaster, {
          toastId: 'GAME_LOAD',
          render: 'Error loading game state',
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 1000,
          pauseOnFocusLoss: false,
        })
        fullscreenLoader(false)
      }
    }
  }

  const mapCompletedTasks = (isConnected, newGameTaskState): IDotsMap => {
    const obj = {}
    Object.entries(DOTS_MAP).map(([key, value]) => {
      const isCompleted = newGameTaskState[value.task] || false
      obj[key] = { ...value, isCompleted }
    })
    obj[0] = { ...obj[0], complete: isConnected }
    return obj
  }

  useEffect(() => {
    ;(async () => {
      await loadGameGameState()
    })()
  }, [isConnected, account, wallet]) // eslint-disable-line

  useEffect(() => {
    if (provider) {
      const { tokenContract, gameContract } = loadGameContracts(provider)
      setTokenContract(tokenContract)
      setGameContract(gameContract)
    }
  }, [provider])

  return (
    <GameContext.Provider
      value={{
        activeDot,
        handleSetActiveDot,
        gameTaskState,
        trophyId,
        hasWonGame,
        isFetchingGameData,
        gameContract,
        tokenContract,
        loadGameGameState,
        completedTasks,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
