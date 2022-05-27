import fweb3TokenInterface from '../interfaces/abi/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/abi/Fweb3Game.json'
import { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { loadAddress } from './addresses'

export const loadGameContract = (provider: Provider): Contract => {
  if (provider) {
    const gameAddress: string = loadAddress('fweb3_game')[0]
    const gameContract: Contract = new Contract(gameAddress, fweb3GameInterface.abi, provider)
    return gameContract
  }
  return new Contract('default', '', provider)
}

export const loadTokenContract = (provider: Provider): Contract => {
  const tokenAddress: string = loadAddress('fweb3_game')[0]
  const tokenContract: Contract = new Contract(tokenAddress, fweb3TokenInterface.abi, provider)
  return tokenContract
}

export interface IFweb3Contracts {
  gameContract?: Contract | null
  tokenContract?: Contract | null
}

export const loadFweb3Contracts = (provider: Provider | null): IFweb3Contracts => {
  return {
    gameContract: provider ? loadGameContract(provider) : null,
    tokenContract: provider ? loadTokenContract(provider) : null,
  }
}
