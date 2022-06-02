import { cleanup } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ query: { account: '' } })),
}))

afterEach(cleanup)
