import styled from 'styled-components'
import { HeaderLogo } from './Logo'
import { COLORS } from '../styles'

const Text = styled.p`
  padding: 0;
  margin: 0;
  color: ${COLORS.alabaster};
`

export const MobileHeader = () => {
  return (
    <>
      <HeaderLogo />
      <Text data-testid="header-mobile_text">Not supported on mobile</Text>
    </>
  )
}
