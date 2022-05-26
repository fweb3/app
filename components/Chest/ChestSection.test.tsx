import { render, screen } from '@testing-library/react'
import { ChestSection } from './ChestSection'
import { useDevice } from '../../hooks/useDevice'
import { useGame } from '../../providers/GameProvider'
import { MOCK_GAME_CONTEXT } from '../../jest.fixtures'
const renderComponent = (props?: any) => render(<ChestSection {...props} />)

jest.mock('../../providers/ConnectionProvider')

const mockUseDevice = useDevice as jest.MockedFunction<typeof useDevice>
const mockUseGame = useGame as jest.MockedFunction<typeof useGame>
test('renders game chest', () => {
  renderComponent()
  expect(screen.getByTestId('chest')).ok
})

test('renders mobile chest', () => {
  mockUseDevice.mockReturnValueOnce({ device: 'mobile' })
  renderComponent()
  expect(screen.getByTestId('chest-mobile')).ok
})

test('renders open chest if the game has been won', () => {
  mockUseGame.mockReturnValueOnce({ ...MOCK_GAME_CONTEXT, hasWonGame: true })
  renderComponent()
  expect(screen.getByTestId('open-chest')).ok
})
