import { MOCK_ETHERS_CONTEXT } from '../Ethers/__mocks__/useEthers'
import { renderHook, act } from '@testing-library/react-hooks'
import { IComponentProps } from '../../components/component'
import { AllowedChains } from '../../types/networks.d'
import { useEthers } from '../Ethers/useEthers'
import { UrlProvider } from './UrlProvider'
import { useUrl } from './useUrl'

jest.mock('../Account/useAccount')
jest.mock('../Ethers/useEthers')
jest.mock('../Game/useGame')

const mockUseEthers = useEthers as jest.MockedFunction<typeof useEthers>

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
    mockUseEthers.mockReturnValueOnce({
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
    mockUseEthers.mockReturnValueOnce({
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
    mockUseEthers.mockReturnValueOnce({
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
