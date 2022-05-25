import fweb3TokenInterface from '../interfaces/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/Fweb3Game.json'
import { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { loadAddress } from './addresses'

export const loadGameContract = (provider: Provider): Contract => {
  if (provider) {
    const gameAddress: string = loadAddress('fweb3_game')[0]
    const gameContract: Contract = new Contract(
      gameAddress,
      fweb3GameInterface.abi,
      provider
    )
    return gameContract
  }
  return new Contract('default', '', provider)
}

export const loadTokenContract = (provider: Provider): Contract => {
  const tokenAddress: string = loadAddress('fweb3_game')[0]
  const tokenContract: Contract = new Contract(
    tokenAddress,
    fweb3TokenInterface.abi,
    provider
  )
  return tokenContract
}

export interface IFweb3Contracts {
  gameContract?: Contract
  tokenContract?: Contract
}

export const loadFweb3Contracts = (provider: Provider): IFweb3Contracts => {
  return {
    gameContract: loadGameContract(provider),
    tokenContract: loadTokenContract(provider),
  }
}
