import { CommonText } from '../shared/CommonText'
import { HeadingText } from '../shared/HeadingText'
import { CommonLink } from '../shared/CommonLink'
import { ErrorText } from '../shared/ErrorText'
export const Introduction = () => {
  return (
    <div>
      <>
        <HeadingText>Learn and build in web3.</HeadingText>
        <CommonText>
          There are 9 dots to light up by doing things on a blockchain (in this
          case, Polygon). Once you light them all up, you win additional $FWEB3
          tokens and a commemorative NFT.
        </CommonText>
        <CommonText>
          It&apos;s free to play. Login with MetaMask to get started.
        </CommonText>
        <CommonText>
          Instructions for metamask can be{' '}
          <CommonLink href="https://metamask.io/faqs/">found here</CommonLink>
        </CommonText>
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
    </div>
  )
}
