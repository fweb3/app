import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { getDiscordUrl, getFaucetUrl } from '../../../interfaces'
import { FaucetDisclaimer } from '../FaucetDisclaimer'

export const UseFaucets = (): JSX.Element => {
  return (
    <>
      <Subheading>Receive gas using tokens (for free!)</Subheading>
      <CommonText>
        Join our{' '}
        <CommonLink href={getDiscordUrl()} target="_blank" rel="noreferrer">
          Discord
        </CommonLink>{' '}
        and use the *<CommonLink href={getFaucetUrl()}>Faucet</CommonLink> to
        receive gas in $MATIC. You&apos;ll need the 300 $FWEB3 tokens from the
        fweb3 faucet in order to use it.
      </CommonText>
      <FaucetDisclaimer />
    </>
  )
}
