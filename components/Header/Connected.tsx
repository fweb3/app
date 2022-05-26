import { formatBalance, getPolygonscanUrl } from '../../interfaces'
import { useConnection, useGame } from '../../providers'
import styled, { keyframes } from 'styled-components'
import { COLORS, SPACING, TEXT } from '../styles'
import { CommonLink } from '../shared/Elements'
import { GiTwoCoins } from 'react-icons/gi'
import { flash } from 'react-animations'
import { GoPlug } from 'react-icons/go'
import { HeaderLogo } from './Logo'

const flicker = keyframes(flash)

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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledPlug = styled((props) => <GoPlug {...props} />)`
  font-size: ${TEXT.h3};
  color: ${COLORS.springGreen};
  padding-right: 0.8rem;
  animation: 0.8s ${plugin};
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

export const ConnectedHeader = () => {
  const { displayName, account } = useConnection()
  const { gameTaskState } = useGame()
  const balance = formatBalance(gameTaskState?.tokenBalance?.toString())
  return (
    <>
      <HeaderLogo />
      <Container>
        <StyledPlug />
        <CommonLink href={getPolygonscanUrl(account)}>
          <DisplayName data-testid="header_displayname">{displayName}</DisplayName>
        </CommonLink>
        <BalanceContainer>
          <GiTwoCoins color={COLORS.yellowish} size={40} />
          <AccountBalance data-testid="header_balance">{balance}</AccountBalance>
        </BalanceContainer>
      </Container>
    </>
  )
}
