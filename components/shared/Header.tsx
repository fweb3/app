import { COLORS, TEXT, SPACING, MEDIA_QUERY, BORDERS } from '../styles'
import { ColoredText, CommonLink, HeadingText } from './Elements'
import { useConnection, useGame } from '../../providers'
import styled, { keyframes } from 'styled-components'
import { getPolygonscanUrl } from '../../interfaces'
import { AiOutlineDeleteRow } from 'react-icons/ai'
import { useDevice } from '../../hooks/useDevice'
import { BsTrophyFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { GiTwoCoins } from 'react-icons/gi'
import { flash } from 'react-animations'
import { GoPlug } from 'react-icons/go'
import { ethers } from 'ethers'

const flicker = keyframes(flash)

const LeftNav = styled.div``

const Heading = styled.h2`
  color: ${COLORS.violet};
  padding: 0;
  margin: 0;
  font-size: ${TEXT.h4};
`

const RightNav = styled.div``

const NavText = styled.p`
  color: ${COLORS.alabaster};
`

const DisplayName = styled.div`
  font-size: ${TEXT.h4};
  padding-right: ${SPACING.medium};
  animation: 0.2s ${flicker};
  animation-delay: 0.6s;
`

const AccountBalance = styled.div`
  color: ${COLORS.violet};
  padding-left: 0.9rem;
  font-size: ${TEXT.h4};
`

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Container = styled.nav`
  display: flex;
  z-index: 2;
  background: ${COLORS.background};
  align-items: center;
  border-bottom: ${BORDERS.line};
  flex-direction: column;
  padding: ${SPACING.large} 0 0 0;

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    padding: ${SPACING.medium};
    flex-direction: row;
    justify-content: space-between;

    ${Heading} {
      font-size: ${TEXT.h2};
    }

    ${RightNav} {
      display: flex;
      align-items: center;
    }
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    padding-top: ${SPACING.extra};

    ${Heading} {
      font-size: ${TEXT.h1};
      margin-left: ${SPACING.medium};
    }

    ${NavText} {
      font-size: ${TEXT.p};
    }

    ${LeftNav} {
      padding: 0 ${SPACING.medium};
      display: flex;
      align-items: center;
    }

    ${RightNav} {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      padding: 0 ${SPACING.medium};
    }
  }
`

const plugin = keyframes`
  0% {
    transform: translateX(-50px);
    color: red;
  }
  80% {
    transform: scale(1.3);
    color: red;

  }
  90% {
    transform: scale(1);
    transform: translateX(0);
    color: red;
  }
  100% {
    color: green;
  }
`

const StyledPlug = styled((props) => <GoPlug {...props} />)`
  font-size: ${TEXT.h3};
  color: ${COLORS.springGreen};
  padding-right: 0.8rem;
  animation: 0.8s ${plugin};
`

const StyledUnplug = styled((props) => <AiOutlineDeleteRow {...props} />)`
  color: ${COLORS.error};
  font-size: ${TEXT.h3};
  padding-right: ${SPACING.small};
`

const WrongNetworkWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  background: ${COLORS.error};
  display: flex;
  font-size: 3rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
`

const FlashingHeader = styled(HeadingText)`
  animation: 0.2s repeat ${flicker};
  animation-delay: 10s;
  font-size: ${TEXT.h2};
`

export const Header = (): JSX.Element => {
  const { displayName, isConnected, account, network, queryDisplayName } =
    useConnection()
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false)
  const { trophyId, gameTaskState, isQueryLoad } = useGame()
  const { device } = useDevice()

  const shouldCountAsConnected = isConnected || isQueryLoad

  useEffect(() => {
    if (account) {
      const allowed = network?.chainId !== 137
      setIsWrongNetwork(allowed)
    }
  }, [network, isConnected, account])

  const renderMobileHeader = (): JSX.Element => {
    return (
      <>
        <FlashingHeader data-testid="header-mobile_heading">
          fweb3
        </FlashingHeader>
        <NavText data-testid="header-mobile_text">
          Not supported on mobile{' '}
          <ColoredText color={COLORS.teaGreen}>yet</ColoredText>
        </NavText>
      </>
    )
  }

  const renderDisconnectedNav = (): JSX.Element => {
    return (
      <>
        <StyledUnplug />
        <NavText data-testid="header_connect-msg">
          Connect a wallet to get started
        </NavText>
      </>
    )
  }

  const renderConnectedNav = (): JSX.Element => {
    console.log({ gameTaskState })
    const balanceInEth = ethers.utils.formatEther(
      gameTaskState?.tokenBalance || '0'
    )
    const balance = ethers.utils.commify(balanceInEth)
    const displayTouse = queryDisplayName ?? displayName
    return (
      <>
        <StyledPlug />
        <CommonLink passHref href={getPolygonscanUrl(account)}>
          <DisplayName data-testid="header_displayname">
            {displayTouse}
          </DisplayName>
        </CommonLink>
        <BalanceContainer>
          <GiTwoCoins color={COLORS.yellowish} size={40} />
          <AccountBalance data-testid="header_balance">
            {balance}
          </AccountBalance>
        </BalanceContainer>
      </>
    )
  }

  return (
    <>
      <Container data-testid="header_heading">
        {device !== 'desktop' ? (
          renderMobileHeader()
        ) : (
          <>
            <LeftNav>
              {shouldCountAsConnected && trophyId && (
                <BsTrophyFill color="gold" size={40} />
              )}
              <FlashingHeader>fweb3</FlashingHeader>
            </LeftNav>
            <RightNav data-testid="header_right-nav">
              {shouldCountAsConnected
                ? renderConnectedNav()
                : renderDisconnectedNav()}
            </RightNav>
          </>
        )}
      </Container>
      {isWrongNetwork && (
        <WrongNetworkWrapper data-testid="header_wrong-network">
          Please connect to the Polygon Network
        </WrongNetworkWrapper>
      )}
    </>
  )
}
