declare let window: any // eslint-disable-line

import type { IComponentProps } from '../../components/component.d'
import { renderHook } from '@testing-library/react-hooks'
import { EthersProvider } from './EthersProvider'
import { useEthers } from './useEthers'

const mockWindowEthereum = {
  isMetaMask: true,
  send: null,
  request: jest.fn(),
  on: null,
}

const mockWeb3Provider = {
  provider: mockWindowEthereum,
  getNetwork() {
    return {
      chainId: 137,
      name: 'mainnet',
      type: 'mainnet',
    }
  },
}

window.ethereum = {
  on: jest.fn(),
}

jest.mock('@ethersproject/providers', () => ({
  Web3Provider: jest.fn(() => mockWeb3Provider),
}))

const wrapper = ({ children }: IComponentProps) => (
  <EthersProvider>{children}</EthersProvider>
)

describe('useEthers', () => {
  it('initializes provider on an allowed network', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEthers(), {
      wrapper,
    })
    await waitForNextUpdate()
    expect(result.current.isInitialized).toBeTruthy()
    expect(result.current.isAllowedNetwork).toBeTruthy()
  })
})
