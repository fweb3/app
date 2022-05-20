import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { getPolygonscanUrl, loadAddress } from '../../../interfaces'

export const VoteWithTokens = (): JSX.Element => {
  const pollAddress = loadAddress('fweb3_poll')[0]
  const voteInPollAddress = `${getPolygonscanUrl(pollAddress)}#writeContract`
  return (
    <>
      <Subheading>Vote in a proposal with your tokens</Subheading>
      <CommonText>
        Use our poll contract to vote yes or no. You&apos;ll need at least 100
        $FWEB3 tokens in order to do this.
      </CommonText>
      <CommonText>
        <CommonLink href={voteInPollAddress} target="_blank" rel="noreferrer">
          {pollAddress}
        </CommonLink>
      </CommonText>
      <CommonText>What question are you answering? Who knows!</CommonText>
    </>
  )
}
