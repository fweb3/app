declare let window: any // eslint-disable-line

import { createContext, useContext, useEffect, useState } from 'react'
import { Network, Web3Provider } from '@ethersproject/providers'
import type { IComponentProps } from '../components/component'
import detectEthereumProvider from '@metamask/detect-provider'
// eslint-disable-next-line
import type { GameError } from '../interfaces/game.d'
import { AllowedChains } from '../types/providers.d'
import { logger, NETWORKS } from '../lib'
import { useError } from './ErrorProvider'

interface IEthersContext {
  isLocal?: boolean
  isAllowedNetwork: boolean
  isInitialized: boolean
  isCypress?: boolean
  network: Network | null
  account: string
  chainId: number
  isConnected: boolean
  isConnecting: boolean
  connectAccount: () => void
  provider: Web3Provider | null
}

const defaultContext = {
  isLocal: false,
  isAllowedNetwork: false,
  isInitialized: false,
  isCypress: false,
  network: null,
  account: '',
  chainId: 0,
  provider: null,
  isConnected: false,
  isConnecting: false,
  connectAccount: async () => null,
}

const EthersContext = createContext<IEthersContext>(defaultContext)

const EthersProvider = ({ children }: IComponentProps) => {
  const [provider, setProvider] = useState<Web3Provider | null>(null)
  const [isAllowedNetwork, setIsAllowedNetwork] = useState<boolean>(true)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [network, setNetwork] = useState<Network | null>(null)
  const [isCypress, setIsCypress] = useState<boolean>(false)
  const [isLocal, setIsLocal] = useState<boolean>(false)
  const [account, setAccount] = useState('')
  const [chainId, setChainId] = useState(0)
  const { setErrorMessage } = useError()

  const connectAccount = async () => {
    try {
      if (provider && !isCypress) {
        setIsConnecting(true)
        const account = await provider.send('eth_requestAccounts', [])
        const network = await provider.getNetwork()
        setAccount(account[0])
        setNetwork(network)
        setChainId(network.chainId)
        setIsConnected(true)
        setIsConnecting(false)
      }
    } catch (err: GameError) {
      console.error(err.message)
    }
  }

  const initialize = async (provider: Web3Provider | null | unknown) => {
    if (window?.Cypress) {
      logger.log('[+] Cypress detected')
      setIsCypress(true)
      return
    } else if (provider !== window?.ethereum) {
      logger.log('[-] Provider is not metamask')
      return
    } else {
      const hexChainId = await window.ethereum.request({
        method: 'eth_chainId',
      })
      const chainId = parseInt(hexChainId, 16)
      const isLocalhost = chainId === AllowedChains.LOCAL
      const isAllowed = Object.values(AllowedChains).includes(chainId)
      if (!isAllowed) {
        setErrorMessage(`${NETWORKS[chainId]} is not an allowed network`)
      }
      setProvider(provider as Web3Provider)
      setChainId(chainId)
      setIsLocal(isLocalhost)
      setIsAllowedNetwork(isAllowed)
      setIsInitialized(true)
      return
    }
  }

  const handleAccountChange = (accounts: string[]) => {
    setAccount(accounts[0])
  }

  const handleChainChange = async (newChainId: number) => {
    console.log('changeChain', chainId)
    if (newChainId !== chainId) {
      window.location.reload()
    }
  }

  useEffect(() => {
    ;(async () => {
      const provider = (await detectEthereumProvider()) as Web3Provider
      if (provider) {
        initialize(provider)
      } else {
        console.error('[-] No provider avail')
      }
    })()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange)
      window.ethereum.on('chainChanged', handleChainChange)
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountChange)
        window.ethereum.removeListener('chainChanged', handleChainChange)
      }
    }
  }, []) // eslint-disable-line

  return (
    <EthersContext.Provider
      value={{
        isLocal,
        isAllowedNetwork,
        isInitialized,
        isCypress,
        network,
        account,
        chainId,
        provider,
        isConnected,
        isConnecting,
        connectAccount,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}

const useEthers = () => useContext(EthersContext)

export { EthersProvider, useEthers }
