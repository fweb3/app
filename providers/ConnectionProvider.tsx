declare let window: any // eslint-disable-line

import { Context, createContext, useContext, useEffect, useState } from 'react'
import { createEthersConnection, fetchEnsName } from '../interfaces'
import type { IComponentProps } from '../components/component'
import { Provider } from '@ethersproject/providers'
import { getMessageFromCode } from 'eth-rpc-errors'
// eslint-disable-next-line
import type { GameError } from '../interfaces/game'
import { useLoading } from './LoadingProvider'
import { useError } from './ErrorProvider'
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
  connect: () => null,
  account: '',
  provider: null,
  ensName: '',
  displayName: '',
  isConnecting: false,
  handleDisconnect: () => null,
  queryDisplayName: '',
  isQueryLoad: false,
  queryAccount: '',
}

const ConnectionContext: Context<IConnectionContext> = createContext(
  defaultConnectionContext
)

const ConnectionProvider = ({ children }: IComponentProps) => {
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
  const { isLoading, setIsLoading } = useLoading()
  const { errorToast } = useError()
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
      try {
        setIsConnecting(true)

        const { provider, account } = await createEthersConnection()
        setIsLoading(true)
        setProvider(provider)
        setAccount(account)

        const ensName = await fetchEnsName(account)
        const displayName = ensName ? ensName : formatAccountDisplay(account)
        setEnsName(ensName)
        setDisplayName(displayName)

        const isConnected = !!provider && !!account
        setIsConnected(isConnected)

        setInitialized(true)
        setIsConnecting(false)
        logger.log('[+] Account connected!')
      } catch (err: GameError) {
        setIsLoading(false)
        console.error(err)
        const errorMessage = getMessageFromCode(err.code, err.message)
        errorToast(errorMessage)
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

  const resetState = () => {
    setIsConnected(false)
    setIsConnecting(false)
    setEnsName('')
    setAccount('')
    setDisplayName('')
    setProvider(null)
    setInitialized(false)
  }
  setIsLoading(false)

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
      window.ethereum.on('disconnect', handleDisconnect)
      window.ethereum.on('message', handleMessageChange)
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountChange)
        window.ethereum.removeListener('disconnect', handleDisconnect)
        window.ethereum.removeListener('message', handleMessageChange)
      }
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
