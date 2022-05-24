import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { FaucetDisclaimer } from '../FaucetDisclaimer'
import { getFaucetUrl } from '../../../interfaces'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'

export const UseFaucets = (): JSX.Element => {
  const { isDotComplete } = useGame()
  const hasNativeTokens = isDotComplete(DotKey.hasUsedFaucet)

  const renderCompleted = () => {
    return (
      <div data-testid="game-tasks_2-complete">
        <Subheading>You&apos;ve got MATIC for gas!</Subheading>
        <CommonText>Now we can start transacting!</CommonText>
        <CommonText>Lets send some of our FWEB3 to a friend</CommonText>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_2-incomplete">
        <Subheading>Get native tokens for gas</Subheading>
        <CommonText>
          You can use the *<CommonLink href={getFaucetUrl()}>faucet</CommonLink>{' '}
          to receive the native tokens required to pay gas. You&apos;ll need at
          least 300 FWEB3 tokens in your account to use it.
        </CommonText>
        <CommonText>
          Alternatively, you can bridge another currency over to MATIC. This
          process is a bit more advanced if you haven&apos;t swapped or used a
          bridge across chains before. One of the bridges we use can be found{' '}
          <CommonLink href="https://bridge.umbria.network/bridge/ethereum-polygon/matic">
            here
          </CommonLink>
        </CommonText>
        <FaucetDisclaimer />
      </div>
    )
  }
  return hasNativeTokens ? renderCompleted() : renderIncomplete()
}
