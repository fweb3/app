import { CommonLink, CommonText, Subheading } from '../../shared/Elements'
import { PulseButton } from '../../shared/PulseButton'
import { getGithubUrl } from '../../../interfaces'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'

export const DeployedContract = (): JSX.Element => {
  const { isDotComplete } = useGame()
  const hasDeployedContract = isDotComplete(DotKey.hasDeployedContract)
  const walkthroughLink =
    'https://www.notion.so/fweb3/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#3c526735ae074b88838ad7b467545614'

  const handleSubmit = async () => {
    console.log('make trophy')
  }

  const renderCompleted = () => {
    return (
      <div data-testid="game-tasks_8-complete">
        <Subheading>Winner winner chicken dinner!</Subheading>
        <CommonText>You killed it.</CommonText>
        <CommonText>
          Time to start shilling your own token to friends and family!
        </CommonText>
        <CommonText>
          It&apos;s also time for you to collect your spoils - your FWEB3 trophy
          NFT.
        </CommonText>
        <PulseButton data-testid="pulse-btn" onClick={handleSubmit}>
          Claim Trophy
        </PulseButton>
      </div>
    )
  }

  const renderIncomplete = () => {
    return (
      <div data-testid="game-tasks_8-incomplete">
        <Subheading>Create your own token</Subheading>
        <CommonText>
          This is the final step. You&apos;re going to deploy your own code to
          the Polygon blockchain, just like we had to do to make this game.
        </CommonText>
        <CommonText>
          So far, you have interacted with three of our fweb3 contracts. The
          code for them is totally open and can be found{' '}
          <CommonLink href={getGithubUrl()}>here</CommonLink>
        </CommonText>
        <CommonText>
          It&apos;s time for you to deploy your own. Here is a{' '}
          <CommonLink href={walkthroughLink} target="_blank" rel="noreferrer">
            video
          </CommonLink>{' '}
          to arm you with the weapons necessary to slay this beast. Go forth.
          Conquer.
        </CommonText>
      </div>
    )
  }
  return hasDeployedContract ? renderCompleted() : renderIncomplete()
}
