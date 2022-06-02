import { BORDERS, COLORS, MEDIA_QUERY, SPACING, TEXT } from '../styles'
import { useUrl, useDevice } from '../../hooks'
import { FaGithubSquare } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { BsDiscord } from 'react-icons/bs'
import styled from 'styled-components'
import { IconType } from 'react-icons'
import Link from 'next/link'

interface IFooterItems {
  href: string
  text: string
  Icon: IconType
}

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

const StyledLink = styled(Link)`
  color: ${COLORS.light};
`

interface ILinkItemProps {
  href: string
  text: string
  Icon: IconType
}

const LinkItem = ({ href, text, Icon }: ILinkItemProps): JSX.Element => {
  const { device } = useDevice()
  return (
    <StyledLink href={href} passHref>
      {device === 'mobile' ? (
        <Icon size={30} color={COLORS.light} />
      ) : (
        <span>{text}</span>
      )}
    </StyledLink>
  )
}

export const Footer = (): JSX.Element => {
  const { walkthroughUrl, discordUrl, githubUrl } = useUrl()
  const FOOTER_ITEMS: IFooterItems[] = [
    {
      href: walkthroughUrl,
      text: 'Walkthrough',
      Icon: MdHelpCenter,
    },
    {
      href: discordUrl,
      text: 'Discord',
      Icon: BsDiscord,
    },
    {
      href: githubUrl,
      text: 'Github',
      Icon: FaGithubSquare,
    },
  ]
  return (
    <Container data-testid="footer_footer">
      {FOOTER_ITEMS.map((elem, i) => (
        <LinkItem key={i} {...elem} />
      ))}
    </Container>
  )
}
