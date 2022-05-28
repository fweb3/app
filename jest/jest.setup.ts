export {}

import { cleanup } from '@testing-library/react'

jest.mock('../providers/AccountProvider')
jest.mock('../providers/EthersProvider')
jest.mock('../providers/GameProvider')
jest.mock('../hooks/useDevice')
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { account: '' } })),
}))

afterEach(cleanup)
