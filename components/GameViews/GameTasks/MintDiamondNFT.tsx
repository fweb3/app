import {
  getOpensealAccountUrl,
  getPolygonscanUrl,
  loadAddress,
} from '../../../interfaces'
import {
  CommonLink,
  CommonText,
  ErrorText,
  Subheading,
} from '../../shared/Elements'

export const MintDiamonNFT = (): JSX.Element => {
  const diamondNftAddress = loadAddress('fweb3_diamond_nft')[0]
  const nftPolygonscanUrl = `${getPolygonscanUrl(
    diamondNftAddress
  )}#writeContract`
  return (
    <>
      <Subheading>Mint an NFT</Subheading>
      <CommonText>
        Go to our{' '}
        <CommonLink href={nftPolygonscanUrl} target="_blank" rel="noreferrer">
          diamond NFT
        </CommonLink>{' '}
        smart contract and mint yourself a Diamond NFT that will last forever.
      </CommonText>
      <CommonText>
        To mint yourself a unique diamond, pick a number of your choice and
        enter it in the “mint” function.
      </CommonText>
      <ErrorText style={{ color: '#f55' }}>
        If the gas is too high, it means that diamond is already taken. Please
        try a new one!
      </ErrorText>
      <CommonText>
        This will show up in your OpenSea shortly, which you can see here:{' '}
        <CommonLink
          href={getOpensealAccountUrl()}
          target="_blank"
          rel="noreferrer"
        >
          {getOpensealAccountUrl()}
        </CommonLink>
      </CommonText>
    </>
  )
}
