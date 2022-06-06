import { screen, render } from '@testing-library/react'
import { useAccount } from '../../../hooks/Account'
import { useEthers } from '../../../hooks/Ethers'
import { ShareButton } from '../ShareButton'
import {
  MOCK_ACCOUNT_CONTEXT,
  MOCK_ETHERS_CONTEXT,
} from '../../../jest/jest.fixtures'

const renderComponent = () => render(<ShareButton />)

describe('<ShareButton />', () => {
  it('renders the share button', () => {
    jest.mocked(useAccount).mockReturnValue({
      ...MOCK_ACCOUNT_CONTEXT,
      queryAccount: '',
    })
    renderComponent()
    expect(screen.getByTestId('share-btn')).toBeTruthy()
  })

  it('wont render if loaded by query account', () => {
    jest.mocked(useEthers).mockReturnValueOnce(MOCK_ETHERS_CONTEXT)
    jest.mocked(useAccount).mockReturnValueOnce({
      ...MOCK_ACCOUNT_CONTEXT,
      queryAccount: 'account',
    })
    renderComponent()
    expect(() => screen.getByTestId('share-btn')).toThrow()
  })
})
