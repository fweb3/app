declare let window: any // eslint-disable-line

import { createContext, useContext, useEffect, useState } from 'react'
import { Network, Web3Provider } from '@ethersproject/providers'
import type { IComponentProps } from '../components/component'
// eslint-disable-next-line
import type { GameError } from '../interfaces/game.d'
import { AllowedChains } from '../types/providers.d'
import { getMessageFromCode } from 'eth-rpc-errors'
import { useError } from './ErrorProvider'
import { logger, NETWORKS } from '../lib'

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
  web3Provider: Web3Provider | null
  needsWallet: boolean
}

const defaultContext = {
  isLocal: false,
  isAllowedNetwork: false,
  isInitialized: false,
  isCypress: false,
  network: null,
  account: '',
  chainId: 0,
  web3Provider: null,
  isConnected: false,
  isConnecting: false,
  connectAccount: async () => null,
  needsWallet: false,
}

const EthersContext = createContext<IEthersContext>(defaultContext)

const EthersProvider = ({ children }: IComponentProps) => {
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null)
  const [isAllowedNetwork, setIsAllowedNetwork] = useState<boolean>(true)
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [needsWallet, setNeedsWallet] = useState<boolean>(false)
  const [network, setNetwork] = useState<Network | null>(null)
  const [isCypress, setIsCypress] = useState<boolean>(false)
  const [isLocal, setIsLocal] = useState<boolean>(false)
  const [account, setAccount] = useState('')
  const [chainId, setChainId] = useState(0)
  const { setErrorMessage } = useError()

  const connectAccount = async () => {
    try {
      if (web3Provider && !isCypress) {
        setIsConnecting(true)
        const account = await web3Provider.send('eth_requestAccounts', [])
        setAccount(account[0])
        setIsConnected(true)
        setIsConnecting(false)
      }
    } catch (err: GameError) {
      const errMessage = getMessageFromCode(err.code, err.message)
      console.error(errMessage)
    }
  }

  const handleCypress = () => {
    setIsCypress(true)
    setNetwork({ chainId: 137, name: 'polygon' })
    setIsLocal(true)
    setIsAllowedNetwork(true)
    setIsInitialized(true)
    logger.log('[+] Initialized cypress provider')
  }

  const initialize = async (web3Provider: Web3Provider | null) => {
    if (window?.Cypress) {
      return handleCypress()
    }

    if (!web3Provider?.provider?.isMetaMask) {
      logger.log('[-] Provider is not metamask')
      return
    } else if (web3Provider.provider) {
      const network = await web3Provider.getNetwork()
      setNetwork(network)
      const isLocalhost = network.chainId === AllowedChains.LOCAL
      const isAllowed = Object.values(AllowedChains).includes(network.chainId)
      if (!isAllowed) {
        setErrorMessage(`${NETWORKS[chainId]} is not an allowed network`)
      }
      setWeb3Provider(web3Provider)
      setChainId(network.chainId)
      setIsLocal(isLocalhost)
      setIsAllowedNetwork(isAllowed)
      setIsInitialized(true)
      logger.log(
        `[+] Initialized web3 on [${network.name}:${
          network.chainId ?? 'unknown'
        }]`
      )
      return
    }
  }

  const handleAccountChange = (accounts: string[]) => {
    logger.log('[+] Account change event')
    setAccount(accounts[0])
  }

  const handleChainChange = async (newChainId: number) => {
    logger.log('[+] Chain change event')
    if (newChainId !== chainId) {
      window.location.reload()
    }
  }

  useEffect(() => {
    ;(async () => {
      if (window?.ethereum) {
        const web3Provider = new Web3Provider(window.ethereum) as Web3Provider
        initialize(web3Provider)
        return
      } else if (window?.Cypress) {
        initialize(null)
      } else {
        setNeedsWallet(true)
        return
      }
    })()
  }, [account]) // eslint-disable-line

  useEffect(() => {
    if (window?.ethereum && !window?.Cypress) {
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
        isConnected,
        isConnecting,
        web3Provider,
        connectAccount,
        needsWallet,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}

const useEthers = () => useContext(EthersContext)

export { EthersProvider, useEthers }
