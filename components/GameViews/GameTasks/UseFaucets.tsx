import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { getDiscordUrl, getFaucetUrl } from '../../../interfaces'

export const UseFaucets = (): JSX.Element => {
  return (
    <>
      <Subheading>Receive gas using tokens (for free!)</Subheading>
      <CommonText>
        <CommonLink href={getDiscordUrl()} target="_blank" rel="noreferrer">
          Join our Discord
        </CommonLink>{' '}
        and use the <CommonLink href={getFaucetUrl()}>Web Faucet</CommonLink> to
        receive .0420 $MATIC. You&apos;ll need the 300 $FWEB3 tokens from the
        fweb3 faucet in order to use it.
      </CommonText>
    </>
  )
}
