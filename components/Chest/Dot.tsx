import { COLORS, MEDIA_QUERY } from '../styles'
import { useGame } from '../../providers'
import styled from 'styled-components'

const StyledDot = styled((props) => <div {...props} />)`
  position: fixed;
  z-index: 3;
  display: ${(props) => (props.$isCompleted ? 'block' : 'none')};
  background: url('./lit_dot.png') top left;
  background-size: contain;
  background-repeat: no-repeat;
  top: ${(props) => `${props.$position.dot.sm[1]}px`};
  left: ${(props) => `${props.$position.dot.sm[0]}px`};
  width: 50px;
  height: 50px;

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    width: 80px;
    height: 80px;
    top: ${(props) => `${props.$position.dot.lg?.[1]}px`};
    left: ${(props) => `${props.$position.dot.lg?.[0]}px`};
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
interface IDotProps {
  idx: number
  tooltip: string
  position: {
    dot?: {
      sm?: number[]
      md?: number[]
      lg: number[]
    }
    tooltip?: {
      sm?: number[]
      md?: number[]
      lg: number[]
    }
  }
  isCompleted: boolean
}

export const Dot = ({
  idx,
  position,
  tooltip,
  isCompleted,
}: IDotProps): JSX.Element => {
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
