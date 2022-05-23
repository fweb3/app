import { CommonText, Subheading } from '../../shared/Elements'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'

export const SendTokens = (): JSX.Element => {
  const { hasCompletedTask } = useGame()
  const hasSentTokens = hasCompletedTask(DotKey.hasUsedFaucet)

  const renderCompleted = () => {
    return (
      <>
        <Subheading>You&apos;ve sent FWEB3! </Subheading>
        <CommonText>That was prolly pretty darn easy, huh?</CommonText>
        <CommonText>
          Lets step it up a bit and actually run a contract!
        </CommonText>
      </>
    )
  }

  const renderIncomplete = () => {
    return (
      <>
        <Subheading>Use gas to send tokens</Subheading>
        <CommonText>This one&apos;s easy!</CommonText>
        <CommonText>
          Use MetaMask to send 100 FWEB3 tokens to someone.
        </CommonText>
      </>
    )
  }

  return hasSentTokens ? renderCompleted() : renderIncomplete()
}
