import { getDiscordUrl } from '../../../interfaces'
import {
  ColoredText,
  CommonLink,
  CommonText,
  Subheading,
} from '../../shared/Elements'
import { COLORS } from '../../styles'

export const ReceivingTokens = () => {
  return (
    <>
      <Subheading>Receive tokens (for free!)</Subheading>
      <CommonText>
        <CommonLink
          href="https://discord.gg/pNSFNfyVxA"
          target="_blank"
          rel="noreferrer"
        >
          Join our Discord
        </CommonLink>{' '}
        and use the{' '}
        <CommonLink href="https://fweb3-faucet.vercel.app">
          Web Faucet
        </CommonLink>{' '}
        to receive 300 $FWEB3 tokens by specifying your wallet address.
      </CommonText>
      <CommonText>
        That&apos;s enough to complete all the tasks in the game.
      </CommonText>
      <CommonText>
        Don&apos;t see your tokens? Double check that your wallet is connected
        to the Polygon Network.
      </CommonText>
      <CommonText>
        Once you receive them, use the{' '}
        <ColoredText color={COLORS.yellowish}>
          <CommonLink href={getDiscordUrl()}>#collabland-join</CommonLink>
        </ColoredText>{' '}
        channel to verify your ownership and see the rest of the channels on
        Discord.
      </CommonText>
    </>
  )
}
