import styled from 'styled-components'
import { COLORS } from '../../styles'

const StuckText = styled.p`
  color: ${COLORS.light};
  font-weight: bold;
`

export const StuckHelp = (): JSX.Element => {
  return (
    <StuckText>
      Stuck? Click the dots to the left to see further instructions, or check
      out the Walkthrough below.
    </StuckText>
  )
}
