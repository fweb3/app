import { QueryAccountSection } from './QueryAccountSection'
import { SeekVerification } from './SeekVerification'
import { VerifiedWinner } from './VerifiedWinner'
import { useRouter } from 'next/router'
import { useGame } from '../../hooks'

export const GameFinish = (): JSX.Element => {
  const { trophyId } = useGame()
  const { query } = useRouter()

  // trophyId is set to '0' when verification is needed
  const alreadyVerified = parseInt(trophyId || '0') >= 1

  if (query?.account) {
    return <QueryAccountSection />
  }

  return (
    <div data-testid="game-finish">
      {alreadyVerified ? <VerifiedWinner /> : <SeekVerification />}
    </div>
  )
}
