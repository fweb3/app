import { renderHook } from '@testing-library/react-hooks'
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
})
