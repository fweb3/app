import { COLORS, SPACING } from '../styles'
import { useGame } from '../../providers'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const ShareButtonContainer = styled.div`
  padding: ${SPACING.medium};
  transition: background 0.3s linear;
  color: ${COLORS.light};
  border: 1px solid ${COLORS.russianViolet};
  border-radius: ${SPACING.small};
  &:hover {
    background: ${COLORS.midnight};
  }
`

export const ShareButton = () => {
  const { hasWonGame, shareInfo } = useGame()
  const { query } = useRouter()

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        text: shareInfo?.tweetText,
      })
      return
    }
    if (!query?.router) {
      window.open(shareInfo?.tweetUrl)
      return
    }
  }
  return (
    !query?.wallet && (
      <ShareButtonContainer onClick={handleShare}>
        {hasWonGame ? 'Share your win' : 'Share your progress'}
      </ShareButtonContainer>
    )
  )
}
