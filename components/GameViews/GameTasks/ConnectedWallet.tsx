import { CommonText, Subheading } from '../../shared/Elements'

export const ConnectedWallet = (): JSX.Element => {
  return (
    <div data-testid="game-tasks_0">
      <Subheading>You&apos;ve connected your wallet!</Subheading>
      <CommonText>Welcome to the game!</CommonText>
      <CommonText>Let&apos;s get you started with some game tokens.</CommonText>
      <CommonText>
        Click on the unlit dots on the chest to the left to get more information
        on your next task.
      </CommonText>
    </div>
  )
}
