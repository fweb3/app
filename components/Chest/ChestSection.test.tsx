import { MOCK_GAME_CONTEXT } from '../../jest/jest.fixtures'
import { setCompleteTasks } from '../../jest/jest.helpers'
import { render, screen } from '@testing-library/react'
import { useGame } from '../../providers/GameProvider'
import { useDevice } from '../../hooks/useDevice'
import { ChestSection } from './ChestSection'

const renderComponent = (props?: any) => render(<ChestSection {...props} />)

jest.mock('../../providers/ConnectionProvider')

const mockUseDevice = useDevice as jest.MockedFunction<typeof useDevice>
const mockUseGame = useGame as jest.MockedFunction<typeof useGame>

test('renders game chest', () => {
  renderComponent()
  expect(screen.getByTestId('chest')).toBeTruthy()
})

test('renders mobile chest', () => {
  mockUseDevice.mockReturnValueOnce({ device: 'mobile' })
  renderComponent()
  expect(screen.getByTestId('chest-mobile')).toBeTruthy()
})

test('renders open chest if the game has been won', () => {
  mockUseGame.mockReturnValueOnce({ ...MOCK_GAME_CONTEXT, hasWonGame: true })
  renderComponent()
  expect(screen.getByTestId('open-chest')).toBeTruthy()
})

test('shows share button when at least 1 task is complete', () => {
  mockUseGame.mockReturnValueOnce({
    ...MOCK_GAME_CONTEXT,
    completedTasks: setCompleteTasks(['hasVotedInPoll']),
  })
  renderComponent()
  expect(screen.getByTestId('share-btn')).toBeTruthy()
  expect(screen.getByText('Share your progress')).toBeTruthy()
})

test('chest lights up dots', () => {
  const tasks = setCompleteTasks(['hasVotedInPoll', 'hasSentTokens', 'hasUsedFaucet'])
  mockUseGame.mockReturnValueOnce({
    ...MOCK_GAME_CONTEXT,
    completedTasks: tasks,
  })
  renderComponent()
  expect(screen.getByTestId('dot_dot-0-visible-active')).toBeTruthy()
  expect(screen.getByTestId('dot_dot-2-visible')).toBeTruthy()
  expect(screen.getByTestId('dot_dot-7-visible')).toBeTruthy()
})
