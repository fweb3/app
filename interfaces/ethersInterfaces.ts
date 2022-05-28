declare let window: any // eslint-disable-line

import { logger } from '../lib'
import { ethers } from 'ethers'
import {
  Web3Provider,
  Network,
  AlchemyProvider,
  Provider,
} from '@ethersproject/providers'

interface IEthersConnection {
  provider: Provider
  account: string
  currentNetwork: Network
}

export const createEthersConnection = async (): Promise<IEthersConnection> => {
  const provider: Web3Provider = await _createProvider()
  const accounts: string[] = await _getAccounts(provider)
  const network: Network = await provider.getNetwork()
  return {
    provider,
    account: accounts?.[0] || '',
    currentNetwork: network,
  }
}

const _createProvider = async (): Promise<Web3Provider> => {
  logger.log(`[+] creating web3 provider`)
  return new Web3Provider(window.ethereum)
}

const _getAccounts = async (provider: Web3Provider): Promise<string[]> => {
  logger.log('[+] requesting metamask connection')
  return provider.send('eth_requestAccounts', [])
}

export const createAlchemyProvider = async (
  network: string
): Promise<AlchemyProvider> => {
  logger.log(`[+] creating alchemy provider for: [${network}]`)
  const provider: AlchemyProvider = new AlchemyProvider(
    network,
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  )
  logger.log(`[+] created alchemy provider!`)
  return provider
}

const USE_LIVE_ENS = false
export const fetchEnsName = async (account: string): Promise<string> => {
  if (USE_LIVE_ENS) {
    logger.log('[+] fetching ens name')
    const provider = await createAlchemyProvider('homestead')
    const ensName: string = (await provider.lookupAddress(account)) || ''
    ensName && logger.log(`[+] found ens: ${ensName}`)
    return ensName
  }
  logger.log('[+] skipping ens')
  return ''
}

export const formatBalance = (amt: string | number | null | undefined) => {
  return amt ? ethers.utils.commify(ethers.utils.formatEther(amt)) : '0'
}
