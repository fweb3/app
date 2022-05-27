import { createContext, useContext, useEffect, useState } from 'react'
import { IComponentProps } from '../components/component'
import { useConnection } from './ConnectionProvider'
import { Provider } from '@ethersproject/providers'
import { Network } from '@ethersproject/networks'
import { AllowedChains } from './providers.d'
import { logger } from '../lib'

interface INetwork {
  chainId: number
  name: string
  isAllowed: boolean
}

const defaultNetworkContext: INetwork = {
  chainId: 0,
  name: '',
  isAllowed: false,
}

const NetworkContext = createContext(defaultNetworkContext)

const NetworkProvider = ({ children }: IComponentProps) => {
  const [network, setNetwork] = useState<INetwork>(defaultNetworkContext)
  const { account, provider } = useConnection()

  const handleNetwork = async (provider: Provider) => {
    const network: Network = await provider.getNetwork()
    return {
      chainId: network.chainId,
      name: network.name,
      isAllowed: Object.values(AllowedChains).includes(network.chainId),
    }
  }

  useEffect(() => {
    if (account && provider) {
      ;(async () => {
        try {
          const network = await handleNetwork(provider)
          setNetwork(network)
          logger.log(`[+] Set network: [${network}]`)
        } catch (err) {
          console.error(err)
        }
      })()
    }
  }, [account, provider])

  return (
    <NetworkContext.Provider value={network}>
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
