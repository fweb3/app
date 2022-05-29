import { CommonText, Subheading } from '../../shared/Elements'
import { RiFileCopy2Line } from 'react-icons/ri'
import { useGame } from '../../../providers'
import { DotKey } from '../../Chest/dots'
import styled from 'styled-components'
import { toast } from 'react-toastify'

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

export const BurnToken = (): JSX.Element => {
  const { isDotComplete, burnAddress } = useGame()
  const hasBurnedTokens = isDotComplete(DotKey.hasBurnedTokens)

  const handleCopy = (): void => {
    navigator?.clipboard.writeText(burnAddress)
    toast.success('copied!', {
      autoClose: 1000,
    })
  }

  const renderCompleted = (): JSX.Element => {
    return (
      <div data-testid="game-tasks_5-complete">
        <Subheading>You&apos;ve burned tokens!</Subheading>
        <CommonText>
          From the ashes rises the glorious phoenix that is exchange.
        </CommonText>
      </div>
    )
  }

  const renderIncomplete = (): JSX.Element => {
    return (
      <div data-testid="game-tasks_5-incomplete">
        <Subheading>Burn a token</Subheading>
        <CommonText>Do this by sending at least 1 FWEB3 token to:</CommonText>
        <CopyableContainer>
          <PreText>{burnAddress}</PreText>
          <CopyIcon color="white" size={30} onClick={handleCopy} />
        </CopyableContainer>
        <CommonText>
          This is a &quot;burn address&quot;. It is a black hole from which no
          token escapes... It&apos;s like taking a match to a dollar bill. It
          won&apos;t tip the scales as far as supply and demand goes, but there
          is a paper trail that you effectively destroyed one token. Deflation!
        </CommonText>
      </div>
    )
  }

  return hasBurnedTokens ? renderCompleted() : renderIncomplete()
}
