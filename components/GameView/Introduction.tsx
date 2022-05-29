import { COLORS, TEXT, MEDIA_QUERY } from '../styles'
import { useDevice } from '../../hooks/useDevice'
import styled from 'styled-components'
import {
  HeadingText,
  CommonText,
  CommonLink,
  ColoredText,
} from '../shared/Elements'

const StyledHeading = styled(HeadingText)`
  font-size: 1.5rem;

  @media only screen and (min-width: ${MEDIA_QUERY.tablet}) {
    font-size: ${TEXT.h2};
    padding-bottom: 0.4rem;
  }
`

export const Introduction = (): JSX.Element => {
  const { device } = useDevice()

  const renderMetamaskInstructions = () => {
    return (
      <CommonText>
        Login with MetaMask to get started. Instructions for metamask can be{' '}
        <CommonLink href="https://metamask.io/faqs/">found here</CommonLink>
      </CommonText>
    )
  }

  return (
    <>
      <StyledHeading data-testid="section-introduction">
        Learn and Build in Web3
      </StyledHeading>
      <CommonText>
        There are 9 dots to light up by doing things on a blockchain (in this
        case, Polygon). Once you light them all up, you win additional{' '}
        <ColoredText color={COLORS.violet}>FWEB3</ColoredText> tokens and a
        commemorative NFT... and it&apos;s free!
      </CommonText>
      {device === 'desktop' && renderMetamaskInstructions()}
      <ColoredText color={COLORS.teaGreen}>
        Note: there&apos;s lots of phishing happening out there! Our code is{' '}
        <CommonLink href="https://github.com/fweb3/app">open source</CommonLink>{' '}
        so you can make sure it&apos;s safe. We use metamask to get your address
        and your address only. Think of it like logging in.
      </ColoredText>
    </>
  )
}
