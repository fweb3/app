import {
  getDiscordUrl,
  getFaucetUrl,
  getPolygonscanUrl,
  loadAddress,
} from '../../../interfaces'
import { COLORS } from '../../styles'
import {
  ColoredText,
  CommonLink,
  CommonText,
  ErrorText,
  Subheading,
} from '../../shared/Elements'
import { FaucetDisclaimer } from '../FaucetDisclaimer'

export const ReceivingTokens = () => {
  return (
    <>
      <Subheading>Receive tokens (for free!)</Subheading>
      <CommonText>
        <CommonLink href={getDiscordUrl()}>Join our Discord</CommonLink> and use
        the *<CommonLink href={getFaucetUrl()}>faucet</CommonLink> to receive{' '}
        <ColoredText>300 $FWEB3</ColoredText> tokens by specifying your wallet
        address. That&apos;s enough to complete all the tasks in the game.
      </CommonText>
      <CommonText>
        Once you receive them, use the{' '}
        <ColoredText color={COLORS.yellowish}>
          <CommonLink href={getDiscordUrl()}>#collabland-join</CommonLink>
        </ColoredText>{' '}
        channel to verify your ownership and see the rest of the channels on
        Discord.
      </CommonText>
      <CommonText
        style={{ fontSize: '1rem', fontStyle: 'italic', fontWeight: 'bold' }}
      >
        <ColoredText color={COLORS.yellowish}>
          Don&apos;t see your tokens? Double check that your wallet is connected
          to the{' '}
          <CommonLink href="https://polygonscan.com/">
            Polygon Network
          </CommonLink>{' '}
          and you have added the{' '}
          <CommonLink href={getPolygonscanUrl(loadAddress('fweb3_token')[0])}>
            fweb3 token
          </CommonLink>{' '}
          to your wallet
        </ColoredText>
      </CommonText>
      <FaucetDisclaimer />
    </>
  )
}
