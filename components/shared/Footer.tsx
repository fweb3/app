import { FaGithubSquare } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import { BsDiscord } from 'react-icons/bs'
import { COLORS, SPACING } from '../styles'
import styled from 'styled-components'
import Link from 'next/link'

const FOOTER_ITEMS = [
  {
    href: 'https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7',
    text: 'Walkthrough',
    Icon: MdHelpCenter,
  },
  {
    href: 'https://discord.gg/pNSFNfyVxA',
    text: 'Discord',
    Icon: BsDiscord,
  },
  {
    href: 'https://github.com/fweb3/app',
    text: 'Github',
    Icon: FaGithubSquare,
  },
]

const Container = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  border-top: 1px solid #333;
  padding: ${SPACING.medium};
`

const StyledLink = styled.a`
  color: white;
  font-size: ${SPACING.medium};
`

const LinkItem = ({ href, text, Icon }) => {
  return (
    <Link href={href} passHref>
      <StyledLink>{text}</StyledLink>
    </Link>
  )
}

export const Footer = () => {
  return (
    <Container>
      {FOOTER_ITEMS.map((elem, i) => (
        <LinkItem key={i} {...elem} />
      ))}
    </Container>
  )
}
