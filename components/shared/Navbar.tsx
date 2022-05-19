import { useConnection, useGame } from '../../providers'
import { BsTrophyFill } from 'react-icons/bs'
import { GiTwoCoins } from 'react-icons/gi'
import { COLORS, TEXT, SPACING } from '../styles'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #333;
  margin: 0;
  padding: 0;
`

const Heading = styled.h2`
  color: ${COLORS.violet};
  font-size: ${TEXT.h2};
`

const LeftNav = styled.div`
  padding: 0 ${SPACING.medium};
`

const RightNav = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${SPACING.medium};
`

const DisplayName = styled.div`
  color: ${COLORS.maize};
  text-decoration: underline;
`

const AccountBalance = styled.div`
  color: ${COLORS.violet};
  padding-left: 0.5rem;
`
const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const InfoContainer = styled.div`
  padding-left: 1rem;
  text-align: right;
`

const NavText = styled.p`
  font-size: ${TEXT.p};
  color: ${COLORS.alabaster};
`

export const Navbar = () => {
  const { displayName, isConnected, account } = useConnection()
  const { hasWonGame, gameTaskState } = useGame()
  const { query } = useRouter()

  const renderDisconnectedNav = () => {
    return <NavText>Connect a wallet to get started</NavText>
  }

  const renderConnectedNav = () => {
    return (
      <>
        {hasWonGame && <BsTrophyFill color="gold" size={40} />}
        <InfoContainer>
          <Link
            passHref
            href={`https://polygonscan.com/address/${account ?? query.wallet}`}
          >
            <DisplayName>{displayName}</DisplayName>
          </Link>
          <BalanceContainer>
            <GiTwoCoins color={COLORS.yellowish} />
            <AccountBalance>{gameTaskState?.tokenBalance || 0}</AccountBalance>
          </BalanceContainer>
        </InfoContainer>
      </>
    )
  }

  return (
    <Container>
      <LeftNav>
        <Heading>fweb3</Heading>
      </LeftNav>
      <RightNav>
        {isConnected ? renderConnectedNav() : renderDisconnectedNav()}
      </RightNav>
    </Container>
  )
}
