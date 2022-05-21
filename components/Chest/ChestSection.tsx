import { TrophyImage } from '../CompletedView/TrophyImage'
import { useConnection, useGame } from '../../providers'
import { ShareButton } from '../GameViews/ShareButton'
import { useDevice } from '../../hooks/useDevice'
import { MEDIA_QUERY } from '../styles'
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

export const ChestSection = (): JSX.Element => {
  const { completedTasks, hasWonGame, trophyId } = useGame()
  const { isConnected } = useConnection()
  const { device } = useDevice()

  const renderMobileChest = (): JSX.Element => {
    return <Chest />
  }

  const renderGameChest = (): JSX.Element => {
    const shouldShowShare =
      isConnected &&
      Object.entries(completedTasks).filter(([k, v]) => v.isCompleted).length >=
        2
    return (
      <>
        <Chest data-testid="chest-section_chest">
          {isConnected &&
            Object.entries(completedTasks).map(([key, value], i) => (
              <Dot key={i} idx={key} {...value} />
            ))}
        </Chest>
        {shouldShowShare && <ShareButton />}
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
