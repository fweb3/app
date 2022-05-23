import { SeekVerification } from '../CompletedView/SeekVerification'
import { VerifiedWinner } from '../CompletedView/VerifiedWinner'
import { ReceivingTokens } from './GameTasks/ReceivingTokens'
import { MintDiamonNFT } from './GameTasks/MintDiamondNFT'
import { useConnection, useGame } from '../../providers'
import { CompletedTask } from '../shared/CompletedTask'
import { CreateToken } from './GameTasks/CreateToken'
import styled, { keyframes } from 'styled-components'
import { UseFaucets } from './GameTasks/UseFaucets'
import { SendTokens } from './GameTasks/SendTokens'
import { VoteInPoll } from './GameTasks/VoteInPoll'
import { BurnToken } from './GameTasks/BurnToken'
import { SwapToken } from './GameTasks/SwapToken'
import { useDevice } from '../../hooks/useDevice'
import { MEDIA_QUERY, SPACING } from '../styles'
import { ConnectButton } from './ConnectButton'
import { Introduction } from './Introduction'
import { fadeIn } from 'react-animations'

const fade = keyframes(fadeIn)

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: 0.5s ${fade};
  margin: ${SPACING.medium} ${SPACING.medium} 4rem ${SPACING.medium};
  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    margin: 0 ${SPACING.extra} 0 ${SPACING.extra};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    margin: ${SPACING.normal};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.desktop}) {
    margin-right: ${SPACING.large};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    max-width: 80%;
  }
`

export const ContentSection = (): JSX.Element => {
  const { activeDot, hasWonGame, trophyId, isQueryLoad } = useGame()
  const { isConnected } = useConnection()
  const { device } = useDevice()

  const shouldCountAsConnected = isConnected || isQueryLoad

  const renderNotConnected = (): JSX.Element => {
    return (
      <>
        <Introduction />
        <ConnectButton />
      </>
    )
  }

  const renderNotDesktop = (): JSX.Element => {
    return <Introduction />
  }

  const renderHasTrophy = () => {
    return <VerifiedWinner />
  }

  const renderConnected = (): JSX.Element => {
    return (
      <>
        {activeDot === '0' && <CompletedTask task="Connected Wallet" />}
        {activeDot === '1' && <ReceivingTokens />}
        {activeDot === '2' && <UseFaucets />}
        {activeDot === '3' && <SendTokens />}
        {activeDot === '4' && <MintDiamonNFT />}
        {activeDot === '5' && <BurnToken />}
        {activeDot === '6' && <SwapToken />}
        {activeDot === '7' && <VoteInPoll />}
        {activeDot === '8' && <CreateToken />}
      </>
    )
  }

  const renderNeedsVerification = (): JSX.Element => {
    return <SeekVerification />
  }

  const renderGame = (): JSX.Element => {
    if (device !== 'desktop') {
      return renderNotDesktop()
    }

    if (shouldCountAsConnected && trophyId) {
      return renderHasTrophy()
    }

    if (shouldCountAsConnected && hasWonGame) {
      return renderNeedsVerification()
    }

    if (shouldCountAsConnected || isQueryLoad) {
      return renderConnected()
    }
    return renderNotConnected()
  }

  return <ContentContainer>{renderGame()}</ContentContainer>
}
