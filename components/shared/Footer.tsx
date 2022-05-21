import { BORDERS, COLORS, MEDIA_QUERY, SPACING, TEXT } from '../styles'
import { useDevice } from '../../hooks/useDevice'
import { FaGithubSquare } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { BsDiscord } from 'react-icons/bs'
import styled from 'styled-components'
import Link from 'next/link'
import {
  getDiscordUrl,
  getGithubUrl,
  getWalkthroughUrl,
} from '../../interfaces'

const FOOTER_ITEMS = [
  {
    href: getWalkthroughUrl(),
    text: 'Walkthrough',
    Icon: MdHelpCenter,
  },
  {
    href: getDiscordUrl(),
    text: 'Discord',
    Icon: BsDiscord,
  },
  {
    href: getGithubUrl(),
    text: 'Github',
    Icon: FaGithubSquare,
  },
]

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${COLORS.background};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: ${BORDERS.line};
  padding: ${SPACING.medium};

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    postion: relative;
    border-top: 3px solid #333;
    padding: ${SPACING.extra};
    font-size: ${TEXT.p};
  }
`

const StyledLink = styled.a`
  color: ${COLORS.light};
`

const LinkItem = ({ href, text, Icon }): JSX.Element => {
  const { device } = useDevice()
  return (
    <Link href={href} passHref>
      {device === 'mobile' ? (
        <Icon size={30} color={COLORS.light} />
      ) : (
        <StyledLink>{text}</StyledLink>
      )}
    </Link>
  )
}

export const Footer = (): JSX.Element => {
  return (
    <Container data-testid="footer_footer">
      {FOOTER_ITEMS.map((elem, i) => (
        <LinkItem key={i} {...elem} />
      ))}
    </Container>
  )
}
