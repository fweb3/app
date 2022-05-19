import styled from 'styled-components'
import { useGame } from '../../providers'
import { COLORS } from '../styles'

const StyledDot = styled((props) => <div {...props} />)`
  position: fixed;
  z-index: 3;
  display: ${(props) => (props.$isCompleted ? 'block' : 'none')};
  background: url('./lit_dot.png') top left;
  background-size: contain;
  background-repeat: no-repeat;
  top: ${(props) => `${props.$position.dot.md[1]}px`};
  left: ${(props) => `${props.$position.dot.md[0]}px`};
  width: 60px;
  height: 60px;
  @media only screen and (max-width: 814px) {
    width: 35px;
    height: 35px;
    top: ${(props) => `${props.$position.dot.sm?.[1]}px`};
    left: ${(props) => `${props.$position.dot.sm?.[0]}px`};
  }
`
const Tooltip = styled((props) => <div {...props} />)`
  display: none;
  position: absolute;
  background: black;
  z-index: 30;
  text-align: center;
  padding: 1rem;
  color: ${COLORS.yellowish};
  border-radius: 30px;
  box-shadow: 13px 10px 5px 0px rgba(0, 0, 0, 0.75);
  width: 400px;
  height: 100px;
  // top: ${(props) => `${props.$position.tooltip.md[1]}px`};
  // left: ${(props) => `${props.$position.tooltip.md[0]}px`};
  ${StyledDot}:hover & {
    display: block;
  }
`

export const Dot = ({ idx, position, tooltip, isCompleted }) => {
  const { handleSetActiveDot } = useGame()
  return (
    <>
      <StyledDot
        $position={position}
        $isCompleted={isCompleted}
        onClick={() => handleSetActiveDot(idx)}
      >
        <Tooltip $position={position}>{tooltip}</Tooltip>
      </StyledDot>
    </>
  )
}
