declare let window: any

import { Context, createContext, useContext, useEffect, useState } from 'react'
import { createEthersConnection, fetchEnsName } from '../interfaces'
import type { IComponentProps } from '../components/component'
import { Provider } from '@ethersproject/providers'
import { getMessageFromCode } from 'eth-rpc-errors'
import type { GameError } from '../interfaces/game'
import { useLoading } from './LoadingProvider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { logger } from '../lib'

interface IConnectionContext {
  isConnected: boolean
  connect: () => void
  account: string
  provider: Provider | null
  ensName: string
  displayName: string
  isConnecting: boolean
  handleDisconnect: () => void
  queryDisplayName: string
  isQueryLoad: boolean
  queryAccount: string
}

const defaultConnectionContext: IConnectionContext = {
  isConnected: false,
  connect: () => {},
  account: '',
  provider: null,
  ensName: '',
  displayName: '',
  isConnecting: false,
  handleDisconnect: () => {},
  queryDisplayName: '',
  isQueryLoad: false,
  queryAccount: '',
}

const ConnectionContext: Context<IConnectionContext> = createContext(
  defaultConnectionContext
)

const ConnectionProvider = ({ children }: IComponentProps) => {
  const { isLoading, fullscreenLoader, startToast, updateToast } = useLoading()
  const [queryDisplayName, setQueryDisplayName] = useState<string>('')
  const [provider, setProvider] = useState<Provider | null>(null)
  const [isQueryLoad, setIsQueryLoad] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [queryAccount, setQueryAccount] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const { query } = useRouter()

  const handleAccountLookup = async (newAccount: string): Promise<void> => {
    if (provider) {
      const ensName: string = await fetchEnsName(newAccount)
      setAccount(newAccount)
      setEnsName(ensName)
      const displayName: string = ensName ?? `${account.substring(0, 6)}...`
      setDisplayName(displayName)
    }
  }

  const connect = async () => {
    if (!isLoading && window?.ethereum) {
      const toaster = startToast('Connecting')
      try {
        setIsConnecting(true)
        fullscreenLoader(true)

        const { provider, account } = await createEthersConnection()
        setProvider(provider)
        setAccount(account)

        const ensName: string = await fetchEnsName(account)
        const displayName = ensName ?? formatAccountDisplay(account)
        setEnsName(ensName)
        setDisplayName(displayName)

        const isConnected: boolean = !!provider && !!account
        setIsConnected(isConnected)

        updateToast('Connected', toaster, {
          type: toast.TYPE.SUCCESS,
        })

        setInitialized(true)
        setIsConnecting(false)
        fullscreenLoader(false)
        logger.log('[+] Account connected!')
      } catch (err: GameError) {
        console.error(err)
        const errorMessage = getMessageFromCode(err.code, err.message)
        updateToast(errorMessage, toaster, {
          type: toast.TYPE.ERROR,
        })
        resetState()
      }
    }
  }

  const handleAccountChange = async (accounts: string) => {
    logger.log(`ACCOUNT CHANGE EVENT: ${accounts}`)
    if (initialized && accounts?.[0] !== account) {
      handleAccountLookup(accounts[0])
    }
    if (accounts.length === 0) {
      handleDisconnect()
    }
  }

  const handleChainChange = (chainId: number) => {
    logger.log(`CHAIN CHANGE EVENT: ${chainId}`)
    if (initialized) {
      window.location.reload()
    }
  }

  const resetState = () => {
    setIsConnected(false)
    setIsConnecting(false)
    setEnsName('')
    setAccount('')
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

  const handleMessageChange = (type: string) => {
    console.log(`MESSAGE_CHANGE_EVENT: ${JSON.stringify(type)}`)
  }

  const formatAccountDisplay = (account: string) => {
    return `${account?.substring(0, 6) || 'UNKNOWN'}...`
  }

  useEffect(() => {
    const queryAccount = query?.account?.toString()
    if (queryAccount) {
      setIsQueryLoad(!!queryAccount)
      setQueryAccount(queryAccount)
      setQueryDisplayName(formatAccountDisplay(queryAccount))
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
        ensName,
        displayName,
        isConnecting,
        handleDisconnect,
        queryDisplayName,
        isQueryLoad,
        queryAccount,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

const useConnection = () => useContext(ConnectionContext)

export { useConnection, ConnectionProvider }
