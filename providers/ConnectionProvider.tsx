declare let window: any

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getMessageFromCode } from 'eth-rpc-errors'
import { useLoading } from './LoadingProvider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { providers } from 'ethers'
import { logger } from '../lib'
import {
  createEthersConnection,
  fetchEnsName,
  loadGameContract,
} from '../interfaces'
interface IConnectionContext {
  isConnected: boolean
  connect: (message: string) => void
  account: string
  provider: providers.Provider
  network: providers.Network
  ensName: string
  displayName: string
  isConnecting: boolean
  handleDisconnect: () => void
  isJudge: boolean
  queryDisplayName: string
}

const defaultConnectionContext: IConnectionContext = {
  isConnected: false,
  connect: () => {},
  account: '',
  provider: null,
  network: null,
  ensName: '',
  displayName: '',
  isConnecting: false,
  handleDisconnect: () => {},
  isJudge: false,
  queryDisplayName: '',
}

const ConnectionContext = createContext(defaultConnectionContext)

const ConnectionProvider = ({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [queryDisplayName, setQueryDisplayName] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isJudge, setIsJudge] = useState<boolean>(false)
  const { isLoading, fullscreenLoader } = useLoading()
  const [account, setAccount] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const [provider, setProvider] = useState(null)
  const [network, setNetwork] = useState(null)
  const { query } = useRouter()
  const toastId = useRef(null)

  const handleAccountLookup = async (newAccount: string) => {
    const ensName = await fetchEnsName('homestead', newAccount)
    setAccount(newAccount)
    setEnsName(ensName)
    const displayName = ensName ?? `${account.substring(0, 6)}...`
    setDisplayName(displayName)
  }

  const connect = async () => {
    if (!isLoading && window?.ethereum) {
      try {
        toastId.current = toast.loading('Connecting', {
          autoClose: 1000,
        })
        setIsConnecting(true)
        fullscreenLoader(true)
        const { provider, account, currentNetwork, ensName } =
          await createEthersConnection()
        setProvider(provider)
        setNetwork(currentNetwork)
        setAccount(account)
        setEnsName(ensName)

        // const isJudge = await checkIsJudge(account, provider)
        // setIsJudge(isJudge)
        setIsJudge(true)
        const displayName = ensName ?? formatAccountDisplay(account)
        setDisplayName(displayName)

        const isConnected = !!provider && !!account && !!currentNetwork?.chainId
        setIsConnected(isConnected)

        setInitialized(true)
        setIsConnecting(false)
        toast.update(toastId.current, {
          render: 'Connected!',
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 1000,
        })
        fullscreenLoader(false)
      } catch (err) {
        console.error(err)
        const errorMessage = getMessageFromCode(err.code, err.message)
        toast.update(toastId.current, {
          render: errorMessage,
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 6000,
        })
        resetState()
      }
    }
  }

  const handleAccountChange = async (accounts) => {
    logger.log(`ACCOUNT CHANGE EVENT: ${accounts}`)
    if (initialized && accounts?.[0] !== account) {
      handleAccountLookup(accounts[0])
    }
    if (accounts.length === 0) {
      handleDisconnect()
    }
  }

  const handleChainChange = (chainId) => {
    logger.log(`CHAIN CHANGE EVENT: ${chainId}`)
    if (initialized && chainId !== network?.chainId) {
      window.location.reload()
    }
  }

  const resetState = () => {
    setIsConnected(false)
    setIsConnecting(false)
    setEnsName('')
    setNetwork(null)
    setAccount(null)
    setDisplayName('')
    setProvider(null)
    fullscreenLoader(false)
    setInitialized(false)
  }

  const handleDisconnect = () => {
    logger.log('DISCONNECT_EVENT')
    resetState()
    toast.success('Disconnected', { autoClose: 1000 })
  }

  const handleMessageChange = (type) => {
    console.log(`MESSAGE_CHANGE_EVENT: ${JSON.stringify(type)}`)
  }

  const checkIsJudge = async (account: string, provider) => {
    const gameContract = loadGameContract(provider)
    const isJudge = await gameContract.isJudge(account)
    logger.log(`IS_JUDGE: ${isJudge}`)
    return isJudge
  }

  const formatAccountDisplay = (account: string) => {
    return `${account.substring(0, 6)}...`
  }

  useEffect(() => {
    if (query?.account) {
      setQueryDisplayName(formatAccountDisplay(query.account.toString()))
    }
  }, [query])

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange)
      window.ethereum.on('chainChanged', handleChainChange)
      window.ethereum.on('disconnect', handleDisconnect)
      window.ethereum.on('message', handleMessageChange)
    }
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange)
      window.ethereum.removeListener('chainChanged', handleChainChange)
      window.ethereum.removeListener('disconnect', handleDisconnect)
      window.ethereum.removeListener('message', handleMessageChange)
    }
  }, []) // eslint-disable-line

  return (
    <ConnectionContext.Provider
      value={{
        isConnected,
        connect,
        account,
        provider,
        network,
        ensName,
        displayName,
        isConnecting,
        handleDisconnect,
        isJudge,
        queryDisplayName,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

const useConnection = () => useContext(ConnectionContext)

export { useConnection, ConnectionProvider }
