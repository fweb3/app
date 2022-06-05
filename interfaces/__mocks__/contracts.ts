import { MockContract } from './ethersInterfaces'

export const loadFweb3Contracts = jest.fn().mockResolvedValue({
  gameContract: new MockContract(),
  tokenContract: new MockContract(),
})
