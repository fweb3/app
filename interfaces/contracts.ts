import fweb3TokenInterface from '../interfaces/abi/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/abi/Fweb3Game.json'
import type { IFweb3Contracts } from './../types/interfaces.d'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { loadAddress } from './addresses'
import { logger } from '../lib'

export const loadGameContract = async (
  chainId: number,
  provider: Provider
): Promise<Contract | null> => {
  const gameAddress = loadAddress(chainId, 'fweb3_game')[0]
  const gameContract = new Contract(
    gameAddress,
    fweb3GameInterface.abi,
    provider
  )
  return gameContract
}

export const loadTokenContract = async (
  chainId: number,
  provider: Provider
): Promise<Contract> => {
  const tokenAddress = loadAddress(chainId, 'fweb3_game')[0]
  const tokenContract: Contract = new Contract(
    tokenAddress,
    fweb3TokenInterface.abi,
    provider
  )
  return tokenContract
}

export const loadFweb3Contracts = async (
  provider: Provider | null
): Promise<IFweb3Contracts> => {
  if (!provider) {
    throw new Error('No provider to load contracts')
  }
  const network = await provider.getNetwork()
  logger.log('[+] loaded game contracts')
  return {
    gameContract: await loadGameContract(network.chainId, provider),
    tokenContract: await loadTokenContract(network.chainId, provider),
  }
}
