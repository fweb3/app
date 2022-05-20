import { TrophyImage } from '../CompletedView/TrophyImage'
import { useConnection, useGame } from '../../providers'
import { COLORS, MEDIA_QUERY, SPACING } from '../styles'
import { ShareButton } from '../GameViews/ShareButton'
import { useDevice } from '../../hooks/useDevice'
import styled from 'styled-components'
import { Dot } from './Dot'

const ChestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const OpenChest = styled.div`
  background: url('./chest_open.png') no-repeat;
  background-size: contain;
  width: 660px;
  height: 410px;

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    width: 1020px;
    height: 660px;
  }
`

const Chest = styled.div`
  contain: content;
  background: url('./chest_closed.png') no-repeat;
  background-size: contain;
  width: 390px;
  height: 250px;

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    width: 750px;
    height: 500px;
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    width: 660px;
    height: 430px;
  }

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    width: 1020px;
    height: 660px;
  }
`

const ShareButtonContainer = styled.div`
  padding: ${SPACING.large};
  transition: background 0.3s linear;
  border: 1px solid ${COLORS.russianViolet};
  &:hover {
    background: ${COLORS.midnight};
  }
`

export const ChestSection = (): JSX.Element => {
  const { completedTasks, hasWonGame, trophyId } = useGame()
  const { isConnected } = useConnection()
  const { device } = useDevice()

  const renderMobileChest = (): JSX.Element => {
    return <Chest />
  }

  const renderShareButton = (): JSX.Element => {
    return (
      <ShareButtonContainer>
        <ShareButton />
      </ShareButtonContainer>
    )
  }

  const renderGameChest = (): JSX.Element => {
    return (
      <>
        <Chest>
          {isConnected &&
            Object.entries(completedTasks).map(([key, value], i) => (
              <Dot key={i} idx={key} {...value} />
            ))}
        </Chest>
        {isConnected && renderShareButton()}
      </>
    )
  }

  const renderOpenChest = (): JSX.Element => {
    return <OpenChest />
  }

  const renderContent = (): JSX.Element => {
    if (device !== 'desktop') {
      return renderMobileChest()
    }
    if (isConnected && trophyId && trophyId !== '0') {
      return <TrophyImage />
    }
    if (isConnected && hasWonGame) {
      return renderOpenChest()
    }
    return renderGameChest()
  }
  return <ChestContainer>{renderContent()}</ChestContainer>
}
