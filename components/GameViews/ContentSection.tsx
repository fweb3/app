import { SeekVerification } from '../CompletedView/SeekVerification'
import { VerifiedWinner } from '../CompletedView/VerifiedWinner'
import { DeployedContract } from './GameTasks/DeployedContract'
import { HasEnoughTokens } from './GameTasks/HasEnoughTokens'
import { ConnectedWallet } from './GameTasks/ConnectedWallet'
import { useAccount, useEthers, useGame } from '../../hooks'
import { MintDiamonNFT } from './GameTasks/MintDiamondNFT'
import { HasSentTokens } from './GameTasks/HasSentTokens'
import styled, { keyframes } from 'styled-components'
import { UseFaucets } from './GameTasks/UseFaucets'
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
  const { activeDot, hasWonGame, trophyId } = useGame()
  const { isConnected } = useEthers()
  const { isQueryLoad } = useAccount()
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
        {activeDot === '0' && <ConnectedWallet />}
        {activeDot === '1' && <HasEnoughTokens />}
        {activeDot === '2' && <UseFaucets />}
        {activeDot === '3' && <HasSentTokens />}
        {activeDot === '4' && <MintDiamonNFT />}
        {activeDot === '5' && <BurnToken />}
        {activeDot === '6' && <SwapToken />}
        {activeDot === '7' && <VoteInPoll />}
        {activeDot === '8' && <DeployedContract />}
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

    if (shouldCountAsConnected && parseInt(trophyId) >= 1) {
      return renderHasTrophy()
    }

    if (shouldCountAsConnected && hasWonGame) {
      return renderNeedsVerification()
    }

    if (shouldCountAsConnected) {
      return renderConnected()
    }
    return renderNotConnected()
  }

  return <ContentContainer>{renderGame()}</ContentContainer>
}
