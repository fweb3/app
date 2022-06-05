import { AiOutlineDeleteRow } from 'react-icons/ai'
import { COLORS, TEXT, SPACING } from '../styles'
import { useRouter } from 'next/router'
import styled from 'styled-components'
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
    return <QueryConnect data-testid="query-connect">Connect</QueryConnect>
  }

  const renderGetStarted = () => {
    return (
      <>
        <StyledUnplug />
        <Text data-testid="header-get-started">
          Connect a wallet to get started
        </Text>
      </>
    )
  }
  return (
    <>
      <HeaderLogo />
      <Container data-testid="disconnected-header">
        {query?.account ? renderQueryConnect() : renderGetStarted()}
      </Container>
    </>
  )
}
