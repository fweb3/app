import { COLORS, MEDIA_QUERY } from '../styles'
import { useGame } from '../../providers'
import styled from 'styled-components'
import { Tooltip } from './Tooltip'

const MD_DOT_SIZE = '50px'
const LG_DOT_SIZE = '80px'

interface IDotStyleProps {
  $isCompleted: boolean
  $isVisible: boolean
}

const createAura = ({ $isCompleted, $isVisible }: IDotStyleProps): string => {
  return $isVisible && !$isCompleted
    ? `0px 0px 207px 50px ${COLORS.violet}`
    : ''
}

const createBorder = ({ $isVisible, $isCompleted }: IDotStyleProps): string => {
  return $isVisible && !$isCompleted ? '1px solid white' : 'none'
}

const HoverStyle = styled((props) => <div {...props} />)`
  position: fixed;
  border-radius: 50%;
  z-index: 10;
  opacity: ${(props) => (props.$isVisible ? '1' : '0')};
  border: ${(props) => createBorder(props)};
  box-shadow: ${(props) => createAura(props)};

  top: ${(props) => `calc(${props.$position.dot.sm[1]}px + 7px)`};
  left: ${(props) => `calc(${props.$position.dot.sm[0]}px + 10px)`};

  width: calc(${MD_DOT_SIZE} - 20px);
  height: calc(${MD_DOT_SIZE} - 20px);

  &:hover {
    opacity: 1;
    border: 1px solid white;
  }

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    width: ${LG_DOT_SIZE};
    height: ${LG_DOT_SIZE};
    top: ${(props) => `${props.$position.dot.lg?.[1]}px`};
    left: ${(props) => `${props.$position.dot.lg?.[0]}px`};
  }
`

const dotOpacity = ({ $isCompleted, $isVisible }: IDotStyleProps): string => {
  return $isCompleted || $isVisible ? '1' : '0'
}

const StyledDot = styled((props) => <div {...props} />)`
  position: fixed;
  z-index: 6;
  opacity: ${(props) => dotOpacity(props)};
  background: url('./lit_dot.png') top left;
  background-size: contain;
  background-repeat: no-repeat;
  top: ${(props) => `${props.$position.dot.sm[1]}px`};
  left: ${(props) => `${props.$position.dot.sm[0]}px`};
  width: ${MD_DOT_SIZE};
  height: ${MD_DOT_SIZE};

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    width: ${LG_DOT_SIZE};
    height: ${LG_DOT_SIZE};
    top: ${(props) => `${props.$position.dot.lg?.[1]}px`};
    left: ${(props) => `${props.$position.dot.lg?.[0]}px`};
  }
`

export interface IDotProps {
  idx: string
  tooltip: string
  position: {
    dot?: {
      sm?: number[]
      md?: number[]
      lg?: number[]
    }
    tooltip?: {
      sm?: number[]
      md?: number[]
      lg?: number[]
    }
  }
  isCompleted: boolean
}

export const Dot = (dotData: IDotProps): JSX.Element => {
  const { setActiveDot, activeDot } = useGame()
  const { idx, position, isCompleted } = dotData
  const isVisible = idx === activeDot
  return (
    <div data-testid={`chest-dot_dot-${idx}`} onClick={() => setActiveDot(idx)}>
      <HoverStyle
        data-testid={`chest-dot_hover-${idx}`}
        $position={position}
        $isVisible={isVisible}
        $isCompleted={isCompleted}
      />
      <StyledDot
        data-testid={`chest-dot_${idx}`}
        $position={position}
        $isCompleted={isCompleted}
        $isVisible={isVisible}
      />
      <Tooltip {...dotData} />
    </div>
  )
}
