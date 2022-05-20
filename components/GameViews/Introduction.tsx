import { useDevice } from '../../hooks/useDevice'
import { COLORS } from '../styles'
import {
  HeadingText,
  CommonText,
  CommonLink,
  ErrorText,
  ColoredText,
} from '../shared/Elements'

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
      <HeadingText>Learn and Build in Web3</HeadingText>
      <CommonText>
        There are 9 dots to light up by doing things on a blockchain (in this
        case, Polygon). Once you light them all up, you win additional{' '}
        <ColoredText color={COLORS.violet}>$FWEB3</ColoredText> tokens and a
        commemorative NFT... and it&apos;s free!
      </CommonText>
      {device === 'desktop' && renderMetamaskInstructions()}
      <ErrorText>
        Note: there&apos;s lots of phishing happening out there! Our code is{' '}
        <CommonLink
          href="https://github.com/fweb3/app"
          target="_blank"
          rel="noreferrer"
        >
          open source
        </CommonLink>{' '}
        so you can make sure it&apos;s safe. We only use MetaMask to get your
        wallet address.
      </ErrorText>
    </>
  )
}
