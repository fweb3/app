import { useState, useEffect, createContext, useContext } from 'react'
import { useConnection, useLoading } from '../providers'
import { loadGameContracts } from '../interfaces'
import type { IGameTaskState } from '../types'
import { DEFAULT_GAME_STATE } from '../lib'
import { useRouter } from 'next/router'
import { Contract } from 'ethers'

interface IGameProviderState {
  gameTaskState: IGameTaskState
  activeDot: number
  handleSetActiveDot: (dot: number) => void
  trophyId: string
  hasWonGame: boolean
  gameContract: Contract
  tokenContract: Contract
  isFetchingGameData: boolean
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  activeDot: 0,
  handleSetActiveDot: () => {},
  trophyId: '',
  hasWonGame: false,
  isFetchingGameData: false,
  tokenContract: null,
  gameContract: null,
}

const GameContext = createContext(defaultGameState)

const GameProvider = ({ children }) => {
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [gameTaskState, setGameTaskState] = useState<IGameTaskState>(null)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const { account, isConnected, provider } = useConnection()
  const [tokenContract, setTokenContract] = useState(null)
  const [gameContract, setGameContract] = useState(null)
  const [activeDot, setActiveDot] = useState<number>(-1)
  const [trophyId, setTrophyId] = useState<string>('')
  const { fullscreenLoader, loadingToast, successToast, errorToast } =
    useLoading()
  const {
    query: { wallet },
  } = useRouter()

  const handleSetActiveDot = (dot: number) => {
    setActiveDot(dot)
  }

  useEffect(() => {
    ;(async () => {
      if (isConnected) {
        fullscreenLoader(true)
        const toaster = loadingToast(1, 'Loading game state')
        try {
          // if the wallet is coming from URL use that. else use connected
          const url = `/api/polygon?wallet_address=${wallet ?? account}`
          const apiResponse = await fetch(url)
          const taskState: IGameTaskState = await apiResponse.json()
          setGameTaskState(taskState)
          setTrophyId(gameTaskState?.['trophyId'] || '')
          setHasWonGame(gameTaskState?.['hasWonGame'] || false)
          const { tokenContract, gameContract } = loadGameContracts(provider)
          setTokenContract(tokenContract)
          setGameContract(gameContract)
          successToast(toaster)
          setIsFetchingGameData(false)
          fullscreenLoader(false)
        } catch (err) {
          console.error(err)
          errorToast(toaster)
          fullscreenLoader(false)
        }
      }
    })()
  }, [isConnected, account, wallet]) // eslint-disable-line

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
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
