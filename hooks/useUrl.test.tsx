import { EthersProvider } from '../providers/EthersProvider'
import { GameProvider } from '../providers/GameProvider'
import { AccountProvider } from '../providers/AccountProvider'
import { renderHook, act } from '@testing-library/react-hooks'
import { IComponentProps } from '../components/component'
import { useUrl } from './useUrl'

const wrapper = ({ children }: IComponentProps) => (
  <EthersProvider>
    <AccountProvider>
      <GameProvider>{children}</GameProvider>
    </AccountProvider>
  </EthersProvider>
)

describe('useUrl', () => {
  it('creates opensea link', () => {
    const { result } = renderHook(() => useUrl(), { wrapper })
    // expect(result.current.errorMessage).toBe('')

    act(() => {
      result.current.getOpenseaUrl('0x123')
    })
    // expect(result.current.errorMessage).toBe('foo')
  })
})
