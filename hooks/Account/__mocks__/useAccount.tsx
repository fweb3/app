import { MOCK_ACCOUNT_CONTEXT } from '../../../jest/jest.fixtures'

export const useAccount = jest.fn(() => {
  return MOCK_ACCOUNT_CONTEXT
})
