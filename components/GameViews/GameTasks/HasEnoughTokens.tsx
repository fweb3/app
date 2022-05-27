import { FaucetDisclaimer } from '../FaucetDisclaimer'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'
import { COLORS } from '../../styles'
import { getDiscordUrl, getFaucetUrl, getPolygonscanUrl, loadAddress } from '../../../interfaces'
import { ColoredText, CommonLink, CommonText, Subheading } from '../../shared/Elements'

export const HasEnoughTokens = (): JSX.Element => {
  const { isDotComplete } = useGame()
  const hasEnoughTokens = isDotComplete(DotKey.hasEnoughTokens)

  const renderHasCompleted = () => {
    return (
      <div data-testid="game-tasks_1-complete">
        <Subheading>You&apos;ve got tokens!</Subheading>
        <CommonText>
          Now that you have the required fweb3 we need to get you some native tokens for gas! You
          can attempt to use the MATIC *faucet <CommonLink href={getFaucetUrl()}>here</CommonLink>{' '}
          or ask politely in our <CommonLink href={getDiscordUrl()}>#support</CommonLink> channel.
        </CommonText>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_1-incomplete">
        <Subheading>Receive tokens (for free)</Subheading>
        <CommonText>
          <CommonLink href={getDiscordUrl()}>Join our Discord</CommonLink> and use the *
          <CommonLink href={getFaucetUrl()}>faucet</CommonLink> to receive{' '}
          <ColoredText>300 FWEB3</ColoredText> tokens by specifying your wallet address. That&apos;s
          enough to complete all the tasks in the game.
        </CommonText>
        <CommonText>
          Once you receive them, use the{' '}
          <ColoredText color={COLORS.yellowish}>
            <CommonLink href={getDiscordUrl()}>#collabland-join</CommonLink>
          </ColoredText>{' '}
          channel to verify your ownership and see the rest of the channels on Discord.
        </CommonText>
        <CommonText style={{ fontSize: '1rem', fontStyle: 'italic', fontWeight: 'bold' }}>
          <ColoredText color={COLORS.yellowish}>
            Don&apos;t see your tokens? Double check that your wallet is connected to the{' '}
            <CommonLink href="https://polygonscan.com/">Polygon Network</CommonLink> and you have
            added the{' '}
            <CommonLink href={getPolygonscanUrl(loadAddress('fweb3_token')[0], 'polygon')}>
              fweb3 token
            </CommonLink>{' '}
            to your wallet
          </ColoredText>
        </CommonText>
      </div>
    )
  }

  return (
    <>
      {hasEnoughTokens ? renderHasCompleted() : renderIncomplete()}
      <FaucetDisclaimer />
    </>
  )
}
