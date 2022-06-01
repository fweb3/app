import { MOCK_GAME_CONTEXT } from '../../jest/jest.fixtures'
import { setCompleteTasks } from '../../jest/jest.helpers'
import { render, screen } from '@testing-library/react'
import { useGame, useDevice } from '../../hooks'
import { ChestSection } from './ChestSection'

const renderComponent = () => render(<ChestSection />)

const mockUseDevice = useDevice as jest.MockedFunction<typeof useDevice>
const mockUseGame = useGame as jest.MockedFunction<typeof useGame>

describe('<ChestSection />', () => {
  it('renders game chest', () => {
    renderComponent()
    expect(screen.getByTestId('chest')).toBeTruthy()
  })

  it('renders mobile chest', () => {
    mockUseDevice.mockReturnValueOnce({ device: 'mobile' })
    renderComponent()
    expect(screen.getByTestId('chest-mobile')).toBeTruthy()
  })

  it('renders open chest if the game has been won', () => {
    mockUseGame.mockReturnValueOnce({ ...MOCK_GAME_CONTEXT, hasWonGame: true })
    renderComponent()
    expect(screen.getByTestId('open-chest')).toBeTruthy()
  })

  it('shows share button when at least 1 task is complete', () => {
    mockUseGame.mockReturnValueOnce({
      ...MOCK_GAME_CONTEXT,
      completedTasks: setCompleteTasks(['hasVotedInPoll']),
    })
    renderComponent()
    expect(screen.getByTestId('share-btn')).toBeTruthy()
    expect(screen.getByText('Share your progress')).toBeTruthy()
  })

  it('chest lights up dots', () => {
    const completedTasks = setCompleteTasks([
      'hasVotedInPoll',
      'hasSentTokens',
      'hasUsedFaucet',
    ])
    mockUseGame.mockReturnValueOnce({
      ...MOCK_GAME_CONTEXT,
      completedTasks,
    })
    renderComponent()
    expect(screen.getByTestId('dot_dot-0-visible-active')).toBeTruthy()
    expect(screen.getByTestId('dot_dot-2-visible')).toBeTruthy()
    expect(screen.getByTestId('dot_dot-7-visible')).toBeTruthy()
  })
})
