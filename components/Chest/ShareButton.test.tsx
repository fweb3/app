import { MOCK_ACCOUNT_STATE } from '../../providers/__mocks__/AccountProvider'
import { MOCK_ETHERS_STATE } from '../../providers/__mocks__/EthersProvider'
import { screen, render } from '@testing-library/react'
import { ShareButton } from './ShareButton'
import { useEthers } from '../../providers'
import { useAccount } from '../../hooks'

const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>
const mockUseEthers = useEthers as jest.MockedFunction<typeof useEthers>

const renderComponent = () => render(<ShareButton />)

describe('<ShareButton />', () => {
  it('renders the share button', () => {
    mockUseAccount.mockReturnValue({
      ...MOCK_ACCOUNT_STATE,
      isQueryLoad: false,
    })
    renderComponent()
    expect(screen.getByTestId('share-btn')).toBeTruthy()
  })

  it('wont render if loaded by query account', () => {
    mockUseEthers.mockReturnValueOnce(MOCK_ETHERS_STATE)
    mockUseAccount.mockReturnValueOnce({
      ...MOCK_ACCOUNT_STATE,
      isQueryLoad: true,
    })
    renderComponent()
    expect(() => screen.getByTestId('share-btn')).toThrow()
  })
})
