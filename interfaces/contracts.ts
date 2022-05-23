import fweb3TokenInterface from '../interfaces/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/Fweb3Game.json'
import type { EthersProvider } from './game.d'
import { loadAddress } from './addresses'
import { ethers } from 'ethers'

export const loadGameContract = (provider: EthersProvider) => {
  const gameAddress = loadAddress('fweb3_game')[0]
  const gameContract = new ethers.Contract(
    gameAddress,
    fweb3GameInterface.abi,
    provider
  )
  return gameContract
}

export const loadTokenContract = (provider: EthersProvider) => {
  const tokenAddress = loadAddress('fweb3_game')[0]
  const tokenContract = new ethers.Contract(
    tokenAddress,
    fweb3TokenInterface.abi,
    provider
  )
  return tokenContract
}

export const loadFweb3Contracts = (provider) => {
  return {
    gameContract: loadGameContract(provider),
    tokenContract: loadTokenContract(provider),
  }
}
