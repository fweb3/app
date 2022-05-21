import { SeekVerification } from '../CompletedView/SeekVerification'
import { DeployOwnContract } from './GameTasks/DeployOwnContract'
import { VerifiedWinner } from '../CompletedView/VerifiedWinner'
import { ReceivingTokens } from './GameTasks/ReceivingTokens'
import { VoteWithTokens } from './GameTasks/VoteWithTokens'
import { MintDiamonNFT } from './GameTasks/MintDiamondNFT'
import { useConnection, useGame } from '../../providers'
import { CreateToken } from './GameTasks/CreateToken'
import { UseFaucets } from './GameTasks/UseFaucets'
import { SendTokens } from './GameTasks/SendTokens'
import { BurnToken } from './GameTasks/BurnToken'
import { SwapToken } from './GameTasks/SwapToken'
import { useDevice } from '../../hooks/useDevice'
import { MEDIA_QUERY, SPACING } from '../styles'
import { ConnectButton } from './ConnectButton'
import { Introduction } from './Introduction'
import styled from 'styled-components'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: ${SPACING.medium} ${SPACING.medium} 4rem ${SPACING.medium};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    margin: 0 ${SPACING.extra} 0 ${SPACING.extra};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    margin ${SPACING.normal};
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
  const { isConnected } = useConnection()
  const { device } = useDevice()

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
    console.log({ activeDot })
    return (
      <>
        {activeDot === '0' && <ReceivingTokens />}
        {activeDot === '1' && <ReceivingTokens />}
        {activeDot === '2' && <UseFaucets />}
        {activeDot === '3' && <SendTokens />}
        {activeDot === '4' && <MintDiamonNFT />}
        {activeDot === '5' && <BurnToken />}
        {activeDot === '6' && <SwapToken />}
        {activeDot === '7' && <VoteWithTokens />}
        {activeDot === '8' && <CreateToken />}
        {activeDot === '9' && <DeployOwnContract />}
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

    if (isConnected && trophyId) {
      return renderHasTrophy()
    }

    if (isConnected && hasWonGame) {
      return renderNeedsVerification()
    }

    if (isConnected) {
      return renderConnected()
    }
    return renderNotConnected()
  }

  return <ContentContainer>{renderGame()}</ContentContainer>
}
