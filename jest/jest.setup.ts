export {}

import { cleanup } from '@testing-library/react'

jest.mock('../hooks/useAccount')
jest.mock('../hooks/useLoading')
jest.mock('../hooks/useEthers')
jest.mock('../hooks/useDevice')
jest.mock('../hooks/useGame')
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { account: '' } })),
}))

afterEach(cleanup)
