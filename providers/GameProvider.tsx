import { useState, useEffect, createContext, useContext } from 'react'
import { DEFAULT_TOAST_OPTS } from './NotificationProvider'
import { useConnection, useLoading } from '../providers'
import type { IGameTaskState } from '../types'
import { DEFAULT_GAME_STATE } from '../lib'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

interface IGameProviderState {
  gameTaskState: IGameTaskState
  activeDot: number
  handleSetActiveDot: (dot: number) => void
  trophyId: string
  hasWonGame: boolean
  isFetchingGameData: boolean
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  activeDot: 0,
  handleSetActiveDot: () => {},
  trophyId: '',
  hasWonGame: false,
  isFetchingGameData: false,
}

const GameContext = createContext(defaultGameState)

const GameProvider = ({ children }) => {
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [gameTaskState, setGameTaskState] = useState<IGameTaskState>(null)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [activeDot, setActiveDot] = useState<number>(-1)
  const [trophyId, setTrophyId] = useState<string>('')
  const { account, isConnected } = useConnection()
  const { isLoading } = useLoading()
  const {
    query: { wallet },
  } = useRouter()

  const handleSetActiveDot = (dot: number) => {
    setActiveDot(dot)
  }

  useEffect(() => {
    ;(async () => {
      const isConnectedWithAccount =
        (isConnected && account) || (isConnected && wallet)
      if (!isLoading && isConnectedWithAccount) {
        const toaster = toast.loading('Checking progress', {
          toastId: 1,
          ...DEFAULT_TOAST_OPTS,
        })

        try {
          setIsFetchingGameData(true)
          // if the wallet is coming from URL use that. else use connected
          const url = `/api/polygon?wallet_address=${wallet ?? account}`
          const apiResponse = await fetch(url)
          const taskState: IGameTaskState = await apiResponse.json()
          setGameTaskState(taskState)
          setTrophyId(gameTaskState?.['trophyId'] || '')
          setHasWonGame(gameTaskState?.['hasWonGame'] || false)
          toast.update(toaster, {
            render: 'Success',
            type: toast.TYPE.SUCCESS,
            autoClose: 500,
            isLoading: false,
            ...DEFAULT_TOAST_OPTS,
          })
          setIsFetchingGameData(false)
        } catch (err) {
          console.error(err)
          toast.update(toaster, {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
            autoClose: 2000,
            ...DEFAULT_TOAST_OPTS,
          })
          setIsFetchingGameData(false)
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
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)
export { GameProvider, useGame }
