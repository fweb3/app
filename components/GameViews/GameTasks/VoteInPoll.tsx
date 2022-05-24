import { loadAddress } from '../../../interfaces'
import { RiFileCopy2Line } from 'react-icons/ri'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'
import styled from 'styled-components'
import {
  CommonLink,
  CommonText,
  ErrorText,
  Subheading,
} from '../../shared/Elements'

const CopyableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.3rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`

const PreText = styled.span`
  font-size: 1rem;
  padding: 1rem;
  background: #041c32;
`
const CopyIcon = styled(RiFileCopy2Line)`
  margin-left: 1rem;
  border-radius: 0.3rem;
  padding: 0.3rem;
  &:hover {
    border: 1px solid white;
  }
`
export const VoteInPoll = (): JSX.Element => {
  const pollAddress = loadAddress('fweb3_poll')[0]
  const { isDotComplete } = useGame()
  const hasVotedInPoll = isDotComplete(DotKey.hasVotedInPoll)

  const renderCompleted = () => {
    return (
      <div data-testid="game-tasks_7-complete">
        <Subheading>Ahh Democracy...</Subheading>
        <CommonText>There is one last task.</CommonText>
        <CommonText>
          It&apos;s time to jump all the way in and create something from
          scratch...
        </CommonText>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_7-incomplete">
        <Subheading>Vote on a proposal with your tokens</Subheading>
        <CommonText>
          Use our fweb3 poll found at this contract address
        </CommonText>
        <CopyableContainer>
          <PreText>{pollAddress}</PreText>
          <CopyIcon />
        </CopyableContainer>
        <CommonText>
          to vote yes or no. True democracy and the heat of mos{' '}
          <CommonLink href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization">
            DAOs
          </CommonLink>
          . You&apos;ll need at least 100 FWEB3 tokens in order to do this.
        </CommonText>
        <CommonText></CommonText>
        <CommonText>What question are you answering? Who knows!</CommonText>
        <ErrorText>
          See if you can figure out how to get to the contract and run the vote
          function... you&apos;ve already had to do something similar once so
          far.
        </ErrorText>
      </div>
    )
  }
  return hasVotedInPoll ? renderCompleted() : renderIncomplete()
}
