import { useAccount, useEthers, useGame, useUrl } from '../../hooks'
import { COLORS, SPACING, TEXT } from '../styles'
import { CommonLink } from '../shared/Elements'
import { prettyParseBalance } from '../../lib'
import { GiTwoCoins } from 'react-icons/gi'
import styled from 'styled-components'
import { HeaderLogo } from './Logo'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const DisplayName = styled.div`
  font-size: 1.2rem;
  padding-bottom: 0.4rem;
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
  const { isAllowedNetwork, network } = useEthers()
  const { displayName, account } = useAccount()
  const { getPolygonscanUrl } = useUrl()
  const { gameTaskState } = useGame()

  const balance = prettyParseBalance(
    gameTaskState?.tokenBalance?.toString() || '0'
  )
  const netName = network?.name || 'Unknown'
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
            {isAllowedNetwork ? '🟢' : '🔴'} {netName}
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
