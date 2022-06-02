import { COLORS, SPACING, MEDIA_QUERY, BORDERS } from '../styles'
import { DesktopHeader } from './Desktop'
import { useDevice } from '../../hooks'
import { MobileHeader } from './Mobile'
import styled from 'styled-components'

const Container = styled.nav`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${COLORS.background};
  border-bottom: ${BORDERS.line};
  padding: ${SPACING.normal};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    padding: ${SPACING.medium};
    flex-direction: row;
    justify-content: center;
  }

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    padding-top: ${SPACING.extra};
    justify-content: space-between;
  }

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    padding-left: ${SPACING.extra};
    padding-right: ${SPACING.extra};
    justify-content: space-between;
  }
`

export const Header = (): JSX.Element => {
  const { device } = useDevice()
  const isMobile = device !== 'desktop'
  return (
    <Container>{isMobile ? <MobileHeader /> : <DesktopHeader />}</Container>
  )
}
