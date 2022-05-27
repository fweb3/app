import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { useGame, useUrl } from '../../../hooks'
import { DotKey } from '../../Chest/dots'

export const SwapToken = () => {
  const { isDotComplete } = useGame()
  const { uniswapUrl } = useUrl()

  const hasSwappedTokens = isDotComplete(DotKey.hasSwappedTokens)

  const renderCompleted = () => {
    return (
      <div data-testid="game-tasks_6-complete">
        <Subheading>You&apos;ve swapped tokens!</Subheading>
        <CommonText>
          Now you&apos;re dangerous enough to start making real bad choices
          swapping shit-coins. Be careful and really pay attention when using a{' '}
          <CommonLink href="https://www.coinbase.com/learn/crypto-basics/what-is-a-dex">
            DEX
          </CommonLink>{' '}
          like uniswap or pancake swap.{' '}
          <CommonLink href="https://coinmarketcap.com/alexandria/glossary/rug-pull">
            Rug pulls{' '}
          </CommonLink>
          are real.
        </CommonText>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_6-incomplete">
        <Subheading>Swap a token</Subheading>
        <CommonText>
          Go to Uniswap to swap 1 FWEB3 token for some more MATIC here{' '}
          <CommonLink href={uniswapUrl}>uniswap.org</CommonLink>
        </CommonText>
        <CommonText>
          You&apos;re gonna need to add our custom token to you&apos;re uniswap
          interface before you can swap. See if you can figure out how to do
          that without any help now that you&apos;ve had to add our token to
          metamask already.
        </CommonText>
      </div>
    )
  }

  return hasSwappedTokens ? renderCompleted() : renderIncomplete()
}
