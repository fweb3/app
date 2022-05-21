import { useState, useEffect, createContext, useContext } from 'react'
import { DOTS_MAP, IDotsMap } from '../components/Chest/dots'
import { useConnection, useLoading } from '../providers'
import type { IGameTaskState } from '../interfaces/game'
import { loadGameContracts } from '../interfaces'
import { DEFAULT_GAME_STATE } from '../lib'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Contract } from 'ethers'

interface IGameProviderState {
  handleSetActiveDot: (dot: string) => void
  gameTaskState: IGameTaskState
  loadGameGameState: () => void
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
}

interface ISocialShare {
  imageUrl?: string
  tweetText?: string
  tweetUrl?: string
}

const initShareInfo = {
  imageUrl: 'https://fweb3.xyz/fweb3.png',
  tweetText: '',
  tweetUrl: '',
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
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  shareInfo: initShareInfo,
}

const GameContext = createContext(defaultGameState)

const DEV_GAME_STATE: IGameTaskState = {
  tokenBalance: '300000000000000000000',
  hasEnoughTokens: true, // 1
  hasUsedFaucet: false, // 2
  hasSentTokens: false, // 3
  hasMintedNFT: false, // 4
  hasBurnedTokens: false, // 5
  hasSwappedTokens: false, // 6
  hasVotedInPoll: false, // 7
  hasDeployedContract: false, // 8
  hasWonGame: false,
  isConnected: false,
  trophyId: '',
}

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

const LIVE = false

const GameProvider = ({ children }) => {
  const { account, isConnected, provider, network, handleDisconnect } =
    useConnection()
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [completedTasks, setCompletedTasks] = useState<IDotsMap>(DOTS_MAP)
  const [shareInfo, setShareInfo] = useState<ISocialShare>(initShareInfo)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [trophyColor, setTrophyColor] = useState<string>('')
  const [tokenContract, setTokenContract] = useState(null)
  const [gameContract, setGameContract] = useState(null)
  const [activeDot, setActiveDot] = useState<string>('0')
  const [trophyId, setTrophyId] = useState<string>('')
  const { fullscreenLoader } = useLoading()
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(DEFAULT_GAME_STATE)
  const {
    query: { wallet },
  } = useRouter()

  const handleSetActiveDot = (idx: string) => {
    setActiveDot(idx)
  }

  const loadDevGameState = async () => {
    if (isConnected && network.chainId !== 137) {
      toast.error('Please connect to polygon network', {
        autoClose: 6000,
      })
      handleDisconnect()
      return
    }
    setGameTaskState(DEV_GAME_STATE)
    setHasWonGame(DEV_GAME_STATE?.hasWonGame || false)
    setTrophyId(DEV_GAME_STATE?.trophyId || '')

    const trophyColor = calcTrophyColor(DEV_GAME_STATE?.trophyId)
    setTrophyColor(trophyColor)

    const completedTasks = mapCompletedTasks({
      ...DEV_GAME_STATE,
      isConnected: true,
    })
    setCompletedTasks(completedTasks)
  }

  const loadGameGameState = async () => {
    if (isConnected && network.chainId !== 137) {
      toast.error('Please connect to polygon network', {
        autoClose: 6000,
      })
      handleDisconnect()
      return
    }

    if (isConnected) {
      const toaster = toast.loading('Loading game state', {
        autoClose: 1000,
        pauseOnFocusLoss: false,
        toastId: 'GAME_LOAD',
      })
      try {
        fullscreenLoader(true)
        // if the wallet is coming from URL use that. else use connected
        const url = `/api/polygon?wallet_address=${wallet ?? account}`
        const apiResponse = await fetch(url)
        const taskState: IGameTaskState = await apiResponse.json()
        setGameTaskState(taskState)

        setHasWonGame(taskState?.hasWonGame || false)
        setTrophyId(taskState?.trophyId || '')

        const trophyColor: string = calcTrophyColor(taskState?.trophyId)
        setTrophyColor(trophyColor)

        const mappedDots: IDotsMap = mapCompletedTasks({
          ...taskState,
          isConnected: true,
        })

        setCompletedTasks(mappedDots)

        const shareInfo: ISocialShare = createShareInfo(
          trophyId,
          trophyColor,
          mappedDots
        )
        setShareInfo(shareInfo)

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

  const mapCompletedTasks = (newGameTaskState: IGameTaskState): IDotsMap => {
    let currentDot = 0
    const obj = {}
    Object.entries(DOTS_MAP).map(([key, value]) => {
      const isCompleted = newGameTaskState[value.task] || false
      if (isCompleted && parseInt(key) > currentDot) {
        currentDot = parseInt(key)
      }
      obj[key] = { ...value, isCompleted }
    })
    console.log('current set dot', currentDot.toString())
    setActiveDot(currentDot.toString())
    return obj
  }

  const createShareInfo = (
    trophyId: string,
    trophyColor: string,
    mappedDots: IDotsMap
  ): ISocialShare => {
    const TWEET = 'https://twitter.com/intent/tweet?text='
    const imageUrl = createSocialShareImageUrl(trophyId, trophyColor)
    const tweetText = createTweetText(trophyId, trophyColor, mappedDots)
    return {
      tweetUrl: `${TWEET}${encodeURIComponent(tweetText)}`,
      imageUrl,
      tweetText,
    }
  }

  const createTweetText = (
    trophyId: string,
    trophyColor: string,
    mappedDots: IDotsMap
  ) => {
    if (parseInt(trophyId) >= 1 && trophyColor) {
      return `🏆 I won a ${trophyColor} trophy in #fWeb3`
    }
    const numComplete = Object.entries(mappedDots).filter(([k, v]) => v).length
    if (numComplete >= 1) {
      let text = ''
      Object.entries(mappedDots).forEach(([k, v], i) => {
        text += v.isCompleted ? '🟣' : '⚫️'
        if (i % 3 === 2 && i !== Object.keys(mappedDots).length - 1) {
          text += '\n'
        }
      })
      return `${text}\n♥️ #fweb3`
    }
    return 'I ♥️ #fweb3'
  }

  const createSocialShareImageUrl = (trophyId, trophyColor) => {
    if (parseInt(trophyId) >= 1) {
      return `https://fweb3.xyz/fweb_yearone_${trophyColor}.png`
    }
    return 'https://fweb3.xyz/fweb3.png'
  }

  useEffect(() => {
    ;(async () => {
      if (LIVE) {
        await loadGameGameState()
      } else {
        await loadDevGameState()
      }
    })()
  }, [isConnected, account, wallet]) // eslint-disable-line

  useEffect(() => {
    if (provider) {
      const { tokenContract, gameContract } = loadGameContracts(provider)
      setTokenContract(tokenContract)
      setGameContract(gameContract)
    }
  }, [provider])

  useEffect(() => {
    if (
      LIVE &&
      provider &&
      account &&
      gameContract &&
      hasWonGame &&
      trophyId === '0'
    ) {
      ;(async () => {
        fullscreenLoader(true)
        const toaster = toast.loading('Checking verification', {
          autoClose: 1000,
          pauseOnFocusLoss: false,
          toastId: 'VERIFY_CHECK',
        })
        try {
          const isVerified = await gameContract.hasBeenVerifiedToWin(account)
          setIsVerified(isVerified)
          fullscreenLoader(false)
        } catch (err) {
          console.error(err)
          toast.update(toaster, {
            toastId: 'VERIFY_CHECK',
            render: 'Error checking verification',
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 1000,
            pauseOnFocusLoss: false,
          })
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
        handleSetActiveDot,
        gameTaskState,
        trophyId,
        hasWonGame,
        isFetchingGameData,
        gameContract,
        tokenContract,
        loadGameGameState,
        completedTasks,
        trophyColor,
        isVerified,
        shareInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)

export { GameProvider, useGame }
