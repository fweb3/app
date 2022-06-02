import { useGame, useEthers, useAccount, useDevice } from '../../hooks'
import { numTasksCompleted } from '../../hooks/Game/tasks'
import { TrophyImage } from '../CompletedView/TrophyImage'
import styled, { keyframes } from 'styled-components'
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

  const renderContent = (): JSX.Element => {
    if (device !== 'desktop') {
      return <Chest data-testid="chest-mobile" />
    }
    if (shouldCountAsConnected && parseInt(trophyId) >= 1) {
      return <TrophyImage />
    }
    if (
      (shouldCountAsConnected && hasWonGame) ||
      (shouldCountAsConnected && numTasksComplete === 9)
    ) {
      return <OpenChest data-testid="open-chest" />
    }
    return renderGameChest()
  }
  return <ChestContainer>{renderContent()}</ChestContainer>
}
