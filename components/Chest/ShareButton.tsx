import { COLORS, SPACING } from '../styles'
import { useConnection, useGame } from '../../providers'
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

export const ShareButton = (): JSX.Element => {
  const { hasWonGame, shareInfo } = useGame()
  const { isQueryLoad } = useConnection()
  const { query } = useRouter()

  const handleShare = (): void => {
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
  return !isQueryLoad ? (
    <ShareButtonContainer data-testid="share-btn" onClick={handleShare}>
      {hasWonGame ? 'Share your win' : 'Share your progress'}
    </ShareButtonContainer>
  ) : (
    <></>
  )
}
