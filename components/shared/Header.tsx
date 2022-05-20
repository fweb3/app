import { COLORS, TEXT, SPACING, MEDIA_QUERY } from '../styles'
import { useConnection, useGame } from '../../providers'
import { getPolygonscanUrl } from '../../interfaces'
import { useDevice } from '../../hooks/useDevice'
import { BsTrophyFill } from 'react-icons/bs'
import { GiTwoCoins } from 'react-icons/gi'
import { CommonLink } from './Elements'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const LeftNav = styled.div``

const Heading = styled.h2`
  color: ${COLORS.violet};
  padding: 0;
  margin: 0;
  font-size: ${TEXT.h4};
  text-shadow: 2px 2px ${COLORS.violetAlpha};
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
  border-bottom: 2px solid #333;
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
        <Heading>fWeb3</Heading>
        <NavText>Not supported on mobile</NavText>
      </>
    )
  }

  const renderDisconnectedNav = (): JSX.Element => {
    return <NavText>Connect a wallet to get started</NavText>
  }

  const renderConnectedNav = (): JSX.Element => {
    return (
      <>
        <CommonLink passHref href={getPolygonscanUrl(account)}>
          <DisplayName>{displayName}</DisplayName>
        </CommonLink>
        <BalanceContainer>
          <GiTwoCoins color={COLORS.yellowish} size={40} />
          <AccountBalance>{gameTaskState?.tokenBalance || 0}</AccountBalance>
        </BalanceContainer>
      </>
    )
  }

  return (
    <>
      <Container>
        {device !== 'desktop' ? (
          renderMobileHeader()
        ) : (
          <>
            <LeftNav>
              {isConnected && trophyId && (
                <BsTrophyFill color="gold" size={40} />
              )}
              <Heading>fWeb3</Heading>
            </LeftNav>
            <RightNav>
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
