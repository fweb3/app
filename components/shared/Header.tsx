import { COLORS, TEXT, SPACING, MEDIA_QUERY, BORDERS } from '../styles'
import { useConnection, useGame } from '../../providers'
import { getPolygonscanUrl } from '../../interfaces'
import { useDevice } from '../../hooks/useDevice'
import { BsTrophyFill } from 'react-icons/bs'
import { GiUnplugged } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import { GiTwoCoins } from 'react-icons/gi'
import { ColoredText, CommonLink, CommonText } from './Elements'
import { GoPlug } from 'react-icons/go'
import styled from 'styled-components'
import { ethers } from 'ethers'
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
  color: ${COLORS.tangerine};
  text-decoration: underline;
  font-size: ${TEXT.h3};
  padding-right: ${SPACING.extra};
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

const StyledPlug = styled((props) => <GoPlug {...props} />)`
  font-size: ${TEXT.h4};
  color: ${COLORS.springGreen};
  padding-right: ${SPACING.normal};
`

const StyledUnplug = styled((props) => <GiUnplugged {...props} />)`
  color: ${COLORS.error};
  font-size: ${TEXT.h4};
  padding-right: ${SPACING.normal};
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

export const Header = (): JSX.Element => {
  const { displayName, isConnected, account, network } = useConnection()
  const [isWrongNetwork, setIsWrongNetwork] = useState<boolean>(false)
  const { trophyId, gameTaskState } = useGame()
  const { device } = useDevice()

  useEffect(() => {
    if (account) {
      const allowed = network?.chainId !== 137
      setIsWrongNetwork(allowed)
    }
  }, [network, isConnected, account])

  const renderMobileHeader = (): JSX.Element => {
    return (
      <>
        <Heading data-testid="header-mobile_heading">fweb3</Heading>
        <NavText>
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
        <NavText data-testid="header__connect-msg">
          Connect a wallet to get started
        </NavText>
      </>
    )
  }

  const renderConnectedNav = (): JSX.Element => {
    const balanceInEth = ethers.utils.formatEther(gameTaskState?.tokenBalance)
    const balance = ethers.utils.commify(balanceInEth)
    return (
      <>
        <StyledPlug />
        <CommonLink passHref href={getPolygonscanUrl(account)}>
          <DisplayName>{displayName}</DisplayName>
        </CommonLink>
        <BalanceContainer>
          <GiTwoCoins color={COLORS.yellowish} size={40} />
          <AccountBalance>{balance}</AccountBalance>
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
              {isConnected && trophyId && (
                <BsTrophyFill color="gold" size={40} />
              )}
              <Heading>fweb3</Heading>
            </LeftNav>
            <RightNav data-testid="header_right-nav">
              {isConnected ? renderConnectedNav() : renderDisconnectedNav()}
            </RightNav>
          </>
        )}
      </Container>
      {isWrongNetwork && (
        <WrongNetworkWrapper>
          Please connect to the Polygon Network
        </WrongNetworkWrapper>
      )}
    </>
  )
}
