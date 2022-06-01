declare let window: any // eslint-disable-line

import type { IComponentProps } from '../components/component'
import { createContext, useEffect, useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { AllowedChains } from '../types/networks.d'
import { getMessageFromCode } from 'eth-rpc-errors'
import { Network } from '@ethersproject/networks'
// eslint-disable-next-line
import type { GameError } from '../types/game.d'
import { logger, NETWORKS } from '../lib'
import { toast } from 'react-toastify'
import { useError } from '../hooks'

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
  setAccount: (account: string) => void
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
  setAccount: () => null,
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

  const initialize = async (web3Provider: Web3Provider) => {
    if (!web3Provider?.provider?.isMetaMask) {
      logger.log('[-] Provider is not metamask')
      return
    } else if (web3Provider.provider) {
      const network = await web3Provider.getNetwork()
      setNetwork(network)
      const isLocalhost = network.chainId === AllowedChains.LOCAL
      const isAllowed = Object.values(AllowedChains).includes(network.chainId)
      if (!isAllowed) {
        setErrorMessage(
          `${
            NETWORKS[network.chainId]
          } is not a supported network at this time.`
        )
      }
      setWeb3Provider(web3Provider)
      setChainId(network.chainId)
      setIsLocal(isLocalhost)
      setIsAllowedNetwork(isAllowed)
      setIsInitialized(true)
      logger.log(
        `[+] Initialized web3 on [${NETWORKS[network.chainId]}:${
          network.chainId ?? 'unknown'
        }]`
      )
      return
    }
  }

  const handleChainChange = async (newChainId: number) => {
    logger.log('[+] Chain change event')
    toast.success('Changing chains')
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
        setIsCypress(true)
      } else {
        setNeedsWallet(true)
        return
      }
    })()
  }, [account]) // eslint-disable-line

  useEffect(() => {
    if (window?.ethereum && !window?.Cypress) {
      window.ethereum.on('chainChanged', handleChainChange)
      return () => {
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
        setAccount,
      }}
    >
      {children}
    </EthersContext.Provider>
  )
}

export { EthersProvider, EthersContext }
