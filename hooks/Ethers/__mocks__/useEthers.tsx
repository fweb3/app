import { MOCK_ETHERS_CONTEXT } from '../../../jest/jest.fixtures'

export const useEthers = jest.fn(() => {
  return MOCK_ETHERS_CONTEXT
})
