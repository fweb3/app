import { MOCK_ETHERS_CONTEXT } from '../../jest/jest.fixtures'
import { renderHook, act } from '@testing-library/react-hooks'
import { AllowedChains, IComponentProps } from '../../types'
import { useEthers } from '../Ethers/useEthers'
import { UrlProvider } from './UrlProvider'
import { useUrl } from './useUrl'

jest.unmock('./useUrl')

const wrapper = ({ children }: IComponentProps) => (
  <UrlProvider>{children}</UrlProvider>
)

describe('useUrl', () => {
  it('creates opensea link for mainnet', () => {
    const { result } = renderHook(() => useUrl(), { wrapper })
    act(() => {
      const actual = result.current.getOpenseaUrl('foobar')
      const expected = 'https://opensea.io/assets/matic/foobar'
      expect(actual).toEqual(expected)
    })
  })
  it('creates opensea for mumbai', () => {
    jest.mocked(useEthers).mockReturnValueOnce({
      ...MOCK_ETHERS_CONTEXT,
      chainId: AllowedChains.MUMBAI,
    })
    const { result } = renderHook(() => useUrl(), { wrapper })
    act(() => {
      const actual = result.current.getOpenseaUrl('foobar')
      const expected = 'https://testnets.opensea.io/assets/mumbai/foobar'
      expect(actual).toEqual(expected)
    })
  })
  it('creates polygonscan url for mainnet', () => {
    jest.mocked(useEthers).mockReturnValueOnce({
      ...MOCK_ETHERS_CONTEXT,
      chainId: AllowedChains.POLYGON,
    })
    const { result } = renderHook(() => useUrl(), { wrapper })
    act(() => {
      const actual = result.current.getPolygonscanUrl('foobar')
      const expected = 'https://polygonscan.com/address/foobar'
      expect(actual).toEqual(expected)
    })
  })
  it('creates polygonscan url for testnet', () => {
    jest.mocked(useEthers).mockReturnValueOnce({
      ...MOCK_ETHERS_CONTEXT,
      chainId: AllowedChains.MUMBAI,
    })
    const { result } = renderHook(() => useUrl(), { wrapper })
    act(() => {
      const actual = result.current.getPolygonscanUrl('foobar')
      const expected = 'https://mumbai.polygonscan.com/address/foobar'
      expect(actual).toEqual(expected)
    })
  })
  it('has default share info', () => {
    const { result } = renderHook(() => useUrl(), { wrapper })
    act(() => {
      const actual = result.current.shareInfo
      const expected = 'https://fweb3.xyz/fweb3.png'
      expect(actual.imageUrl).toEqual(expected)
    })
  })
})
