import { MOCK_ROUTER_STATE } from '../../jest/jest.fixtures'
import { renderHook } from '@testing-library/react-hooks'
import { createAlchemyProvider } from '../../interfaces'
import { AccountProvider } from './AccountProvider'
import type { IComponentProps } from '../../types'
import { useAccount } from './useAccount'
import { useRouter } from 'next/router'

jest.mock('../Ethers')
jest.mock('../../interfaces')

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

const wrapper = ({ children }: IComponentProps) => (
  <AccountProvider>{children}</AccountProvider>
)

describe('useAccount', () => {
  it('sets a query account if present', () => {
    mockUseRouter.mockReturnValue({
      ...MOCK_ROUTER_STATE,
      query: { account: 'fooaccount' },
    })
    const { result } = renderHook(() => useAccount(), { wrapper })
    expect(result.current.isQueryLoad).toBeTruthy()
    expect(result.current.queryAccount).toBe('fooaccount')
    expect(result.current.queryDisplayName).toBe('fooacc...')
  })

  it('sets ens name if avail', async () => {
    process.env.NEXT_PUBLIC_USE_ENS = 'true'
    mockUseRouter.mockReturnValue({
      ...MOCK_ROUTER_STATE,
      query: { account: '' },
    })

    // eslint-disable-next-line
    // @ts-ignore
    createAlchemyProvider.mockReturnValueOnce({
      lookupAddress: async () => 'foobarbaz',
    })

    const { result, waitForNextUpdate } = renderHook(() => useAccount(), {
      wrapper,
    })
    await waitForNextUpdate()
    expect(result.current.displayName).toBe('foobarbaz')
  })
})
