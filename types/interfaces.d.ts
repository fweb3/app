import { Contract } from '@ethersproject/contracts'

export interface IFweb3Contracts {
  gameContract: Contract | null
  tokenContract: Contract | null
}
