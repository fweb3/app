declare let window: any // eslint-disable-line

import { createContext, useContext, useEffect, useState } from 'react'
import { IComponentProps } from '../components/component'
import { useConnection } from './ConnectionProvider'
import { Provider } from '@ethersproject/providers'
import { Network } from '@ethersproject/networks'
import { AllowedChains } from './providers.d'
import { logger } from '../lib'

interface INetworkContext {
  chainId: number
  name: string
  isAllowed: boolean
}

const defaultNetworkContext: INetworkContext = {
  chainId: 0,
  name: '',
  isAllowed: true,
}

const NetworkContext = createContext(defaultNetworkContext)

const NetworkProvider = ({ children }: IComponentProps) => {
  const [network, setNetwork] = useState<INetworkContext>(defaultNetworkContext)
  const { isConnected, provider } = useConnection()

  const handleNetwork = async (provider: Provider) => {
    const network: Network = await provider.getNetwork()
    const isAllowed = Object.values(AllowedChains).includes(network.chainId)
    return {
      chainId: network.chainId,
      name: network.name,
      isAllowed,
    }
  }

  const handleChainChange = async (chainId: string) => {
    const newChainId = parseInt(chainId, 16)
    if (newChainId !== network.chainId && isConnected && provider) {
      window.location.reload()
    }
  }

  useEffect(() => {
    if (window?.ethereum && isConnected && provider) {
      ;(async () => {
        try {
          const network = await handleNetwork(provider)
          setNetwork(network)
          logger.log(`[+] Set network: [${network.name}]`)
        } catch (err) {
          console.error(err)
        }
        window.ethereum.on('chainChanged', handleChainChange)
        return () => {
          window.ethereum.removeListener('chainChanged', handleChainChange)
        }
      })()
    }
  }, [isConnected, provider]) // eslint-disable-line

  return (
    <NetworkContext.Provider value={network}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
