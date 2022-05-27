import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'
import { getOpensealAccountUrl, getPolygonscanUrl, loadAddress } from '../../../interfaces'
import { CommonLink, CommonText, ErrorText, Subheading } from '../../shared/Elements'

export const MintDiamonNFT = (): JSX.Element => {
  const { isDotComplete } = useGame()
  const hasMintedNFT = isDotComplete(DotKey.hasMintedNFT)
  const diamondNftAddress = loadAddress('fweb3_diamond_nft')[0]
  const nftPolygonscanUrl = `${getPolygonscanUrl(diamondNftAddress, 'polygon')}#writeContract`

  const renderCompleted = () => {
    return (
      <div data-testid="game-tasks_4-complete">
        <Subheading>So you&apos;ve minted a diamond, eh?</Subheading>
        <CommonText>Now that you&apos;ve created something, lets destroy something...</CommonText>
        <CommonText>Let it burn, baby. Burn.</CommonText>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_4-incomplete">
        <Subheading>Mint an NFT</Subheading>
        <CommonText>
          Go to our <CommonLink href={nftPolygonscanUrl}>diamond NFT</CommonLink> smart contract and
          mint yourself a Diamond NFT that will last forever.
        </CommonText>
        <CommonText>
          To mint yourself a unique diamond, pick a number of your choice and enter it in the
          &quot;mint&quot; function.
        </CommonText>
        <CommonText>
          This will show up in your OpenSea account shortly.{' '}
          <CommonLink href={getOpensealAccountUrl('polygon')}>
            {getOpensealAccountUrl('polygon')}
          </CommonLink>
          <ErrorText>
            If you&apos;re having trouble or the gas is too high, it probably means that diamond is
            already taken. Try inputing different values! 69 and 420 have already been taken 😄 FYI.
          </ErrorText>
        </CommonText>
      </div>
    )
  }
  return hasMintedNFT ? renderCompleted() : renderIncomplete()
}
