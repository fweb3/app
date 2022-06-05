import { act, renderHook } from '@testing-library/react-hooks'
import type { IComponentProps } from '../../types'
import { EthersProvider } from './EthersProvider'
import { useEthers } from './useEthers'

jest.unmock('./useEthers')

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

  it('connects an account', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useEthers(), {
      wrapper,
    })
    await waitForNextUpdate()
    act(() => {
      result.current.connectAccount()
    })
    await waitForNextUpdate()
    expect(result.current.isConnected).toBeTruthy()
    expect(result.current.account).toBeTruthy()
  })
})
