declare let window: any

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createEthersConnection, fetchEnsName } from '../interfaces'
import { useLoading } from './LoadingProvider'
import { toast } from 'react-toastify'
import { providers } from 'ethers'

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
}

const ConnectionContext = createContext(defaultConnectionContext)

const ConnectionProvider = ({ children }) => {
  const [initialized, setInitialized] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [displayName, setDisplayName] = useState<string>('')
  const [isConnecting, setIsConnecting] = useState(false)
  const { isLoading, fullscreenLoader } = useLoading()
  const [account, setAccount] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const [provider, setProvider] = useState(null)
  const [network, setNetwork] = useState(null)
  const toastId = useRef(null)

  const handleAccountLookup = async (newAccount: string) => {
    const ensName = await fetchEnsName('homestead', newAccount)
    setAccount(newAccount)
    setEnsName(ensName)
    const displayName = ensName ?? `${account.substring(0, 6)}...`
    setDisplayName(displayName)
  }

  const connect = async (connectingMessage: string = 'Connecting') => {
    if (!isLoading && window?.ethereum) {
      toastId.current = toast.loading(connectingMessage, {
        autoClose: 1000,
      })
      try {
        setIsConnecting(true)
        fullscreenLoader(true)
        const { provider, account, currentNetwork, ensName } =
          await createEthersConnection()
        setProvider(provider)
        setNetwork(currentNetwork)
        setAccount(account)
        setEnsName(ensName)
        const displayName = ensName ?? `${account.substring(0, 6)}...`
        setDisplayName(displayName)
        const isConnected = !!provider && !!account && !!currentNetwork?.chainId
        setIsConnected(isConnected)
        fullscreenLoader(false)
        setInitialized(true)
        setIsConnecting(false)
        toast.update(toastId.current, {
          render: 'Connected!',
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 1000,
        })
      } catch (err) {
        console.error(err)
        toast.update(toastId.current, {
          render: err.message,
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 1000,
        })
        resetState()
      }
    }
  }

  const handleAccountChange = async (accounts) => {
    console.log('ACCOUNT CHANGE EVENT')
    if (initialized && accounts?.[0] !== account) {
      handleAccountLookup(accounts[0])
    }
    if (accounts.length === 0) {
      handleDisconnect()
    }
  }

  const handleChainChange = (chainId) => {
    console.log('CHAIN CHANGE EVENT')
    if (initialized && chainId !== network?.chainId) {
      window.location.reload()
    }
  }

  const resetState = () => {
    setIsConnected(false)
    setEnsName('')
    setNetwork(null)
    setAccount(null)
    setDisplayName('')
    setProvider(null)
    fullscreenLoader(false)
    setInitialized(false)
  }

  const handleDisconnect = () => {
    resetState()
    toast.success('Disconnected', { autoClose: 1000 })
  }

  useEffect(() => {
    if (!window?.Cypress && window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange)
      window.ethereum.on('chainChanged', handleChainChange)
      window.ethereum.on('disconnect', handleDisconnect)
    }
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange)
      window.ethereum.removeListener('chainChanged', handleChainChange)
      window.ethereum.removeListener('disconnect', handleDisconnect)
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
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

const useConnection = () => useContext(ConnectionContext)

export { useConnection, ConnectionProvider }
