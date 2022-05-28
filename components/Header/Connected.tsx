import { useConnection, useGame, useNetwork, useUrl } from '../../hooks'
import styled, { keyframes } from 'styled-components'
import { COLORS, SPACING, TEXT } from '../styles'
import { formatBalance } from '../../interfaces'
import { CommonLink } from '../shared/Elements'
import { GiTwoCoins } from 'react-icons/gi'
import { flash } from 'react-animations'
import { HeaderLogo } from './Logo'

const flicker = keyframes(flash)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const DisplayName = styled.div`
  font-size: 1.2rem;
  padding-bottom: 0.4rem;
  animation: 0.2s ${flicker};
  animation-delay: 5s;
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

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: ${SPACING.medium};
`

const NetworkText = styled.p`
  padding: 0;
  margin: 0;
`

export const ConnectedHeader = () => {
  const { displayName, account } = useConnection()
  const { getPolygonscanUrl } = useUrl()
  const { gameTaskState } = useGame()
  const network = useNetwork()

  const balance = formatBalance(gameTaskState?.tokenBalance?.toString())

  return (
    <>
      <HeaderLogo />
      <Container>
        <InnerContainer>
          <CommonLink href={getPolygonscanUrl(account)}>
            <DisplayName data-testid="header_displayname">
              {displayName}
            </DisplayName>
          </CommonLink>
          <NetworkText>
            {network.isAllowed ? `🟢 ${network.name}` : `🔴 ${network.name}`}
          </NetworkText>
        </InnerContainer>
        <BalanceContainer>
          {balance !== '0.0' && (
            <>
              <GiTwoCoins color={COLORS.yellowish} size={40} />
              <AccountBalance data-testid="header_balance">
                {balance}
              </AccountBalance>
            </>
          )}
        </BalanceContainer>
      </Container>
    </>
  )
}
