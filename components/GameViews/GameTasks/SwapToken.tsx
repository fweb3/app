import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { getUniswapUrl } from '../../../interfaces'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'

export const SwapToken = () => {
  const { hasCompletedTask } = useGame()
  const hasSwappedTokens = hasCompletedTask(DotKey.hasSwappedTokens)
  const uniswapUrl = getUniswapUrl()

  const renderCompleted = () => {
    return (
      <>
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
      </>
    )
  }

  const renderIncomplete = () => {
    return (
      <>
        <Subheading>Swap a token</Subheading>
        <CommonText>
          Go to Uniswap to swap 1 FWEB3 token for some more MATIC here{' '}
          <CommonLink href={uniswapUrl} target="_blank" rel="noreferrer">
            uniswap.org
          </CommonLink>
        </CommonText>
        <CommonText>
          You&apos;re gonna need to add our custom token to you&apos;re uniswap
          interface before you can swap. See if you can figure out how to do
          that without any help now that you&apos;ve had to add our token to
          metamask already.
        </CommonText>
      </>
    )
  }

  return hasSwappedTokens ? renderCompleted() : renderIncomplete()
}
