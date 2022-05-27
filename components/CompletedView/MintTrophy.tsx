import { CommonLink, CommonText } from '../shared/Elements'
import { loadAddress } from '../../interfaces'
import { useUrl } from '../../hooks'

export const MintTrophy = (): JSX.Element => {
  const { getPolygonscanUrl } = useUrl()
  const trophyAddress = loadAddress('fweb3_trophy')[0]
  const contractUrl = `${getPolygonscanUrl(trophyAddress)}#writeContract`

  return (
    <>
      <CommonText>
        For your efforts, you&apos;ve received 1,000 FWEB3 tokens and can now
        mint a <CommonLink href={contractUrl}>Trophy NFT</CommonLink>.
      </CommonText>
      <CommonText>
        Hurry! There are only 10,000 trophies. The first 333 winners get a Gold
        trophy, the next 3,333 get a Silver trophy, and the rest get a Bronze
        trophy.
      </CommonText>
    </>
  )
}
