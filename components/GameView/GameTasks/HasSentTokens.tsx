import { CommonText, Subheading } from '../../shared/Elements'
import { DotKey } from '../../Chest/dots'
import { useGame } from '../../../hooks'

export const HasSentTokens = (): JSX.Element => {
  const { isDotComplete } = useGame()
  const hasSentTokens = isDotComplete(DotKey.hasUsedFaucet)

  const renderCompleted = () => {
    return (
      <div data-testid="game-tasks_3-complete">
        <Subheading>You&apos;ve sent FWEB3! </Subheading>
        <CommonText>That was prolly pretty darn easy, huh?</CommonText>
        <CommonText>
          Lets step it up a bit and actually run a contract!
        </CommonText>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_3-incomplete">
        <Subheading>Use gas to send tokens</Subheading>
        <CommonText>This one&apos;s easy!</CommonText>
        <CommonText>
          Use MetaMask to send 100 FWEB3 tokens to someone.
        </CommonText>
      </div>
    )
  }

  return hasSentTokens ? renderCompleted() : renderIncomplete()
}
