import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { getUniswapUrl } from '../../../interfaces'

export const SwapToken = () => {
  const uniswapUrl = getUniswapUrl()
  return (
    <>
      <Subheading>Swap a token</Subheading>
      <CommonText>
        Go to Uniswap to swap 1 $FWEB3 token for some more MATIC:{' '}
        <CommonLink href={uniswapUrl} target="_blank" rel="noreferrer">
          {uniswapUrl}
        </CommonLink>
        .
      </CommonText>
      <CommonText>
        If it doesn&apos;t appear, that means you need to import the FWEB3 token
        into Uniswap.
      </CommonText>
    </>
  )
}
