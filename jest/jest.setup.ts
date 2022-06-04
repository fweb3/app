import { MOCK_ROUTER_STATE } from './jest.fixtures'
import { cleanup } from '@testing-library/react'

jest.mock('../hooks/Ethers/useEthers')
jest.mock('../hooks/Game/useGame')
jest.mock('../hooks/Url/useUrl')

let routerState = MOCK_ROUTER_STATE

export const __setRouterState = (state?: any) => {
  routerState = { ...MOCK_ROUTER_STATE, ...state }
}

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => routerState),
}))

afterEach(cleanup)
