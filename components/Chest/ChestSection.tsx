import { numTasksCompleted } from '../../providers/Game/tasks'
import { useGame, useEthers, useAccount } from '../../hooks'
import { TrophyImage } from '../CompletedView/TrophyImage'
import styled, { keyframes } from 'styled-components'
import { useDevice } from '../../hooks/useDevice'
import { ShareButton } from './ShareButton'
import { fadeIn } from 'react-animations'
import { MEDIA_QUERY } from '../styles'
import { Dot } from './Dot'

const fade = keyframes(fadeIn)

const ChestContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: ${fade} 1.5s ease-in-out;
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
  const { queryAccount } = useAccount()
  const { isConnected } = useEthers()
  const { device } = useDevice()

  const shouldCountAsConnected = isConnected || queryAccount
  const numTasksComplete = numTasksCompleted(completedTasks)

  const renderMobileChest = (): JSX.Element => {
    return <Chest data-testid="chest-mobile" />
  }

  const renderGameChest = (): JSX.Element => {
    const shouldShowShare =
      isConnected &&
      Object.entries(completedTasks).filter(([, v]) => v.isCompleted).length >=
        2
    return (
      <>
        <Chest data-testid="chest">
          {shouldCountAsConnected &&
            Object.entries(completedTasks).map(([key, value], i) => (
              <Dot key={i} idx={key} {...value} />
            ))}
        </Chest>
        {shouldShowShare && <ShareButton />}
      </>
    )
  }

  const renderOpenChest = (): JSX.Element => {
    return <OpenChest data-testid="open-chest" />
  }

  const renderContent = (): JSX.Element => {
    if (device !== 'desktop') {
      return renderMobileChest()
    }
    if (shouldCountAsConnected && parseInt(trophyId) >= 1) {
      return <TrophyImage />
    }
    if (
      (shouldCountAsConnected && hasWonGame) ||
      (shouldCountAsConnected && numTasksComplete === 9)
    ) {
      return renderOpenChest()
    }
    return renderGameChest()
  }
  return <ChestContainer>{renderContent()}</ChestContainer>
}
