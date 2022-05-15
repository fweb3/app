declare let window: any

import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'

interface IEthersConnection {
  ensName: string
  provider: any
  account: string
  currentNetwork: any
}

export const createEthersConnection = async (): Promise<IEthersConnection> => {
  const provider = await _createProvider()
  const accounts = await _getAccounts(provider)
  const network = await provider.getNetwork()
  const ensName = await fetchEnsName('homestead', accounts[0])
  return {
    ensName,
    provider,
    account: accounts[0],
    currentNetwork: network,
  }
}

const _createProvider = async () => {
  return new ethers.providers.Web3Provider(window.ethereum)
}

const _getAccounts = async (provider: JsonRpcProvider | Web3Provider) => {
  return provider.send('eth_requestAccounts', [])
}

export const createAlchemyProvider = async (network) => {
  const provider = new ethers.providers.AlchemyProvider(
    network,
    process.env.NEXT_PUBLIC_ALCHEMY_KEY
  )
  return provider
}

export const fetchEnsName = async (network, account) => {
  const provider = await createAlchemyProvider(network)
  const ensName = await provider.lookupAddress(account)
  return ensName
}
