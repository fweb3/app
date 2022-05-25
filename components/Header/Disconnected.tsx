import { AiOutlineDeleteRow } from 'react-icons/ai'
import { COLORS, TEXT, SPACING } from '../styles'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { HeaderLogo } from './Logo'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Text = styled.p`
  color: ${COLORS.alabaster};
`

const StyledUnplug = styled((props) => <AiOutlineDeleteRow {...props} />)`
  color: ${COLORS.error};
  font-size: ${TEXT.h3};
  padding-right: ${SPACING.small};
`

const QueryConnect = styled.button`
  padding: 1.3rem;
`

export const DisconnectedHeader = () => {
  const { query } = useRouter()

  const renderQueryConnect = () => {
    return <QueryConnect>Connect</QueryConnect>
  }

  const renderGetStarted = () => {
    return (
      <>
        <HeaderLogo />
        <Container>
          <StyledUnplug />
          <Text data-testid="header_connect-msg">
            Connect a wallet to get started
          </Text>
        </Container>
      </>
    )
  }
  return query?.account ? renderQueryConnect() : renderGetStarted()
}
