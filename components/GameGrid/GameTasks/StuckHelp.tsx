import { useGame } from '../../../providers'

export const StuckHelp = () => {
  const { hasWonGame, activeDot } = useGame()
  return (
    !hasWonGame &&
    activeDot !== -1 && (
      <p style={{ color: '#fff', fontWeight: 'bold' }}>
        Stuck? Click the dots to the left to see further instructions, or check
        out the Walkthrough below.
      </p>
    )
  )
}
