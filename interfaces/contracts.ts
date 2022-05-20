import fweb3TokenInterface from '../interfaces/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/Fweb3Game.json'
import { loadAddress } from './addresses'
import { ethers } from 'ethers'

export const loadGameContracts = (provider) => {
  const tokenAddress = loadAddress('fweb3_token')[0]
  const gameAddress = loadAddress('fweb3_game')[0]
  const tokenContract = new ethers.Contract(
    tokenAddress,
    fweb3TokenInterface.abi,
    provider
  )
  const gameContract = new ethers.Contract(
    gameAddress,
    fweb3GameInterface.abi,
    provider
  )
  return {
    gameContract,
    tokenContract,
  }
}
