import { getOpenseaUrl, loadAddress } from '../../interfaces'
import { useGame } from '../../providers'
import styled from 'styled-components'
import {
  CommonText,
  HeadingText,
  ColoredText,
  Subheading,
  CommonLink,
} from '../shared/Elements'

const WinnerText = styled(HeadingText)`
  font-size: 3.7rem;
`

export const VerifiedWinner = (): JSX.Element => {
  const trophyAddress = loadAddress('fweb3_trophy')
  const { trophyId } = useGame()

  const openSeaUrl = `${getOpenseaUrl(trophyAddress[0])}/${trophyId}`

  return (
    <>
      <WinnerText>You have won!</WinnerText>
      <Subheading>
        <CommonLink href={openSeaUrl}>View your trophy here</CommonLink>
      </Subheading>
      <CommonText>
        Enjoyed yourself? Consider onboarding a friend or family member by
        sending them some <ColoredText>$FWEB3</ColoredText> tokens.
      </CommonText>
      <CommonText>
        Or help us build by chiming into the{' '}
        <ColoredText>#building</ColoredText> channel on Discord.
      </CommonText>
    </>
  )
}