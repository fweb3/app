declare let window: any

import { Context, createContext, useContext, useEffect, useState } from 'react'
import { Provider, Network } from '@ethersproject/providers'
import { getMessageFromCode } from 'eth-rpc-errors'
import type { GameError } from '../interfaces/game'
import { useLoading } from './LoadingProvider'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { logger } from '../lib'
import { createEthersConnection, fetchEnsName } from '../interfaces'
import { ethers } from 'ethers'
import { IComponentProps } from '../components/component'

interface IConnectionContext {
  isConnected: boolean
  connect: () => void
  account: string
  provider: Provider
  network: Network
  ensName: string
  displayName: string
  isConnecting: boolean
  handleDisconnect: () => void
  queryDisplayName: string
  isQueryLoad: boolean
  queryAccount: string
}

const defaultProvider: Provider = ethers.providers.getDefaultProvider()
const defaultNetwork: Network = ethers.providers.getNetwork(0)

const defaultConnectionContext: IConnectionContext = {
  isConnected: false,
  connect: () => {},
  account: '',
  provider: defaultProvider,
  network: defaultNetwork,
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
  const [provider, setProvider] = useState<Provider>(defaultProvider)
  const [network, setNetwork] = useState<Network>(defaultNetwork)
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
      const ensName: string = await fetchEnsName(provider, newAccount)
      setAccount(newAccount)
      setEnsName(ensName)
      const displayName: string = ensName ?? `${account.substring(0, 6)}...`
      setDisplayName(displayName)
    }
  }

  const connect = async () => {
    if (!isLoading && window?.ethereum) {
      const toaster = startToast('Connecting...')
      try {
        logger.log(`[+] connect [start]`)
        setIsConnecting(true)
        fullscreenLoader(true)

        const { provider, account, currentNetwork } =
          await createEthersConnection()
        setProvider(provider)
        setAccount(account)
        setNetwork(currentNetwork)

        const ensName: string = await fetchEnsName(provider, account)
        logger.log(`ens: ${ensName}`)
        setEnsName(ensName)

        const displayName: string = ensName ?? formatAccountDisplay(account)
        setDisplayName(displayName)

        const isConnected: boolean =
          !!provider && !!account && !!currentNetwork?.chainId
        setIsConnected(isConnected)

        updateToast('Connected!', toaster, {
          type: toast.TYPE.SUCCESS,
        })
        setInitialized(true)
        setIsConnecting(false)
        fullscreenLoader(false)
        console.log('[-] connect [end]')
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
    if (initialized && chainId !== network?.chainId) {
      window.location.reload()
    }
  }

  const resetState = () => {
    setIsConnected(false)
    setIsConnecting(false)
    setEnsName('')
    setNetwork(defaultNetwork)
    setAccount('')
    setDisplayName('')
    setProvider(defaultProvider)
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
    return `${account.substring(0, 6)}...`
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
        network,
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
