import { CommonLink, CommonText, Subheading } from '../../shared/Elements'

export const CreateToken = (): JSX.Element => {
  const walkthroughLink =
    'https://www.notion.so/fweb3/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7#3c526735ae074b88838ad7b467545614'
  return (
    <>
      <Subheading>Create your own token</Subheading>
      <CommonText>
        This is the final step. You&apos;re going to deploy your own code to the
        Polygon blockchain, just like we had to do to make this game.
      </CommonText>
      <CommonText>
        So far, you have interfaced with **three** smart contracts we have
        deployed:
      </CommonText>
      <ol>
        <li>The ERC20 token for the 10,000,000 $FWEB3 tokens</li>
        <li>The ERC721 token for the Diamond NFT</li>
        <li>The scratch-made smart contract of the poll above</li>
      </ol>
      <CommonText>
        Now you will deploy one of your own. Need help? Check out{' '}
        <CommonLink href={walkthroughLink} target="_blank" rel="noreferrer">
          this video
        </CommonLink>{' '}
        we made.
      </CommonText>
    </>
  )
}
