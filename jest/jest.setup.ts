declare let window: any // eslint-disable-line

import { MOCK_ROUTER_STATE } from './jest.fixtures'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('../interfaces/ethersInterfaces')
jest.mock('../hooks/Ethers/useEthers')
jest.mock('../hooks/Device/useDevice')
jest.mock('@ethersproject/contracts')
jest.mock('../interfaces/addresses')
jest.mock('../interfaces/contracts')
jest.mock('../hooks/Game/useGame')
jest.mock('../hooks/Url/useUrl')
jest.mock('../hooks/Account')

const mockWindowEthereum = {
  isMetaMask: true,
  send: jest.fn(),
  request: jest.fn(),
  on: jest.fn(),
}

jest.mock('@ethersproject/providers', () => ({
  ...jest.requireActual('@ethersproject/providers'),
  AlchemyProvider: jest.fn(),
  JsonRpcProvider: jest.fn(),
  Web3Provider: jest.fn(() => ({
    send: jest.fn(async () => ['web3_account']),
    provider: mockWindowEthereum,
    async getNetwork() {
      return {
        chainId: 137,
        name: 'mainnet',
        type: 'mainnet',
      }
    },
  })),
}))

window.ethereum = mockWindowEthereum

let routerState = MOCK_ROUTER_STATE

export const __setRouterState = (state?: any) => {
  routerState = { ...MOCK_ROUTER_STATE, ...state }
}

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => routerState),
}))

afterEach(cleanup)
