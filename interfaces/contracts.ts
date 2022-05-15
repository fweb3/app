import { FWEB3_GAME_ADDRESS, FWEB3_TOKEN_ADDRESS } from './addresses'
import fweb3TokenInterface from '../interfaces/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/Fweb3Game.json'
import { ethers } from 'ethers'

export const loadGameContracts = (provider) => {
  const tokenContract = new ethers.Contract(
    FWEB3_TOKEN_ADDRESS,
    fweb3TokenInterface.abi,
    provider
  )
  const gameContract = new ethers.Contract(
    FWEB3_GAME_ADDRESS,
    fweb3GameInterface.abi,
    provider
  )
  return {
    gameContract,
    tokenContract,
  }
}
