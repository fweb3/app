import { DeployOwnContract } from './GameTasks/DeployOwnContract'
import { ReceivingTokens } from './GameTasks/ReceivingTokens'
import { MintDiamonNFT } from './GameTasks/MintDiamondNFT'
import { VoteWithTokens } from './GameTasks/VoteWithTokens'
import { useConnection, useGame } from '../../providers'
import { GameFinish } from '../VerifyView/GameFinish'
import { CreateToken } from './GameTasks/CreateToken'
import { UseFaucets } from './GameTasks/UseFaucets'
import { SendTokens } from './GameTasks/SendTokens'
import { BurnToken } from './GameTasks/BurnToken'
import { SwapToken } from './GameTasks/SwapToken'
import { ConnectButton } from './ConnectButton'
import { Introduction } from './Introduction'
import styled from 'styled-components'

const ContentContainer = styled.div`
  margin: 1rem;
  padding: 0 1rem;
`

export const ContentSection = () => {
  const { activeDot, handleSetActiveDot, hasWonGame } = useGame()
  const { account, isConnected, ensName } = useConnection()

  return hasWonGame ? (
    <div>
      {<h2>{ensName ?? account}</h2>}
      <GameFinish />
    </div>
  ) : (
    <ContentContainer>
      {!isConnected && (
        <>
          <Introduction />
          <ConnectButton />
        </>
      )}
      {activeDot === 1 && <ReceivingTokens />}
      {activeDot === 2 && <UseFaucets />}
      {activeDot === 3 && <SendTokens />}
      {activeDot === 4 && <MintDiamonNFT />}
      {activeDot === 5 && <BurnToken />}
      {activeDot === 6 && <SwapToken />}
      {activeDot === 7 && <VoteWithTokens />}
      {activeDot === 8 && <CreateToken />}
      {activeDot === 9 && <DeployOwnContract />}
    </ContentContainer>
  )
}
