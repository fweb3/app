import { MOCK_ACCOUNT_CONTEXT } from '../../hooks/Account/__mocks__/useAccount'
import { MOCK_ETHERS_CONTEXT } from '../../hooks/Ethers/__mocks__/useEthers'
import { screen, render } from '@testing-library/react'
import { useAccount, useEthers } from '../../hooks'
import { ShareButton } from './ShareButton'

jest.mock('../../hooks/Account/useAccount')
jest.mock('../../hooks/Ethers/useEthers')

const mockUseAccount = useAccount as jest.MockedFunction<typeof useAccount>
const mockUseEthers = useEthers as jest.MockedFunction<typeof useEthers>

const renderComponent = () => render(<ShareButton />)

describe('<ShareButton />', () => {
  it('renders the share button', () => {
    mockUseAccount.mockReturnValue({
      ...MOCK_ACCOUNT_CONTEXT,
      queryAccount: '',
    })
    renderComponent()
    expect(screen.getByTestId('share-btn')).toBeTruthy()
  })

  it('wont render if loaded by query account', () => {
    mockUseEthers.mockReturnValueOnce(MOCK_ETHERS_CONTEXT)
    mockUseAccount.mockReturnValueOnce({
      ...MOCK_ACCOUNT_CONTEXT,
      queryAccount: 'account',
    })
    renderComponent()
    expect(() => screen.getByTestId('share-btn')).toThrow()
  })
})
