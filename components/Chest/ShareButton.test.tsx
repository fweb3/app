import { MOCK_ACCOUNT_STATE } from '../../hooks/__mocks__/useAccount'
import { MOCK_ETHERS_STATE } from '../../hooks/__mocks__/useEthers'
import { screen, render } from '@testing-library/react'
import { useAccount, useEthers } from '../../hooks'
import { ShareButton } from './ShareButton'

const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>
const mockUseEthers = useEthers as jest.MockedFunction<typeof useEthers>

const renderComponent = () => render(<ShareButton />)

describe('<ShareButton />', () => {
  it('renders the share button', () => {
    mockUseAccount.mockReturnValue({
      ...MOCK_ACCOUNT_STATE,
      queryAccount: '',
    })
    renderComponent()
    expect(screen.getByTestId('share-btn')).toBeTruthy()
  })

  it('wont render if loaded by query account', () => {
    mockUseEthers.mockReturnValueOnce(MOCK_ETHERS_STATE)
    mockUseAccount.mockReturnValueOnce({
      ...MOCK_ACCOUNT_STATE,
      queryAccount: 'account',
    })
    renderComponent()
    expect(() => screen.getByTestId('share-btn')).toThrow()
  })
})
