declare let window: any

import { createContext, useContext, useEffect, useState } from 'react'
import { createEthersConnection } from '../interfaces'
import { useLoading } from './LoadingProvider'
import { providers } from 'ethers'

interface IConnectionContext {
  isConnected: boolean
  connect: () => void
  account: string
  provider: providers.Provider
  network: providers.Network
  isConnecting: boolean
  ensName: string
}

const defaultConnectionContext: IConnectionContext = {
  isConnected: false,
  connect: () => {},
  account: '',
  provider: null,
  network: null,
  isConnecting: false,
  ensName: '',
}

const ConnectionContext = createContext(defaultConnectionContext)

const ConnectionProvider = ({ children }) => {
  const {
    isLoading,
    fullscreenLoader,
    loadingToast,
    successToast,
    errorToast,
  } = useLoading()
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [account, setAccount] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const [provider, setProvider] = useState(null)
  const [network, setNetwork] = useState(null)

  const connect = async () => {
    if (!isLoading && window?.ethereum) {
      fullscreenLoader(true)
      const toaster = loadingToast(0, 'Connecting...')
      try {
        setIsConnecting(true)
        const { provider, account, currentNetwork, ensName } =
          await createEthersConnection()
        setNetwork(currentNetwork)
        setAccount(account)
        setProvider(provider)
        setEnsName(ensName)
        setIsConnecting(false)
        const isConnected = !!provider && !!account && !!currentNetwork?.chainId
        setIsConnected(isConnected)
        successToast(toaster)
        fullscreenLoader(false)
      } catch (err) {
        console.error(err)
        errorToast(toaster)
        fullscreenLoader(false)
      }
    }
  }

  const handleAccountChange = async (accounts) => {
    console.log('ACCOUNT CHANGE EVENT')
    if (!account && accounts?.[0] !== account) {
      setAccount(account[0])
      successToast('Account changed!')
    }
    if (accounts.length === 0) {
      handleDisconnect()
    }
  }

  const handleChainChange = () => {
    console.log('CHAIN CHANGE EVENT')
    if (window?.location) {
      window.location.reload()
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setEnsName('')
    setNetwork(null)
    setAccount(null)
    setProvider(null)
    successToast('Disconnected')
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
        isConnecting,
        connect,
        account,
        provider,
        network,
        ensName,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

const useConnection = () => useContext(ConnectionContext)

export { useConnection, ConnectionProvider }
