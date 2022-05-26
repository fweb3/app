declare let window: any

import { logger } from '../lib'
import {
  Web3Provider,
  Network,
  AlchemyProvider,
  Provider,
} from '@ethersproject/providers'
import { ethers } from 'ethers'

interface IEthersConnection {
  provider: Provider
  account: string
  currentNetwork: Network
}

export const createEthersConnection = async (): Promise<IEthersConnection> => {
  const provider: Web3Provider =
    (await _createProvider()) || ethers.providers.getDefaultProvider()
  const accounts: any = await _getAccounts(provider)
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

const _getAccounts = async (provider: Web3Provider): Promise<any> => {
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
  return provider
}

export const fetchEnsName = async (account: string): Promise<string> => {
  const provider = await createAlchemyProvider('homestead')
  console.log({ account })
  logger.log(`[+] fetching ens name for: [${account.substring(0, 5)}...]`)
  const ensName: string = (await provider.lookupAddress(account)) || ''
  return ensName
}
