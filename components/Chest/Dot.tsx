import { BORDERS, COLORS, MEDIA_QUERY } from '../styles'
import { BsCheckLg } from 'react-icons/bs'
import { useGame } from '../../providers'
import styled from 'styled-components'

const MD_DOT_SIZE = '50px'
const LG_DOT_SIZE = '80px'

const createAura = ({ $isCompleted, $isVisible }) => {
  return $isVisible && !$isCompleted
    ? `0px 0px 207px 50px ${COLORS.violet}`
    : ''
}

const createBorder = ({ $isVisible, $isCompleted }) => {
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

const showDot = ({ $isCompleted, $isVisible }) => {
  return $isCompleted || $isVisible ? '1' : '0'
}

const StyledDot = styled((props) => <div {...props} />)`
  position: fixed;
  z-index: 6;
  opacity: ${(props) => showDot(props)};
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

const TooltipContainer = styled((props) => <div {...props} />)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isVisible ? '1' : '0')};
  top: 0;
  left: 100px;
  width: 460px;
  height: 70px;
  border-radius: ${BORDERS.radius.sm};
  border: 1px solid ${COLORS.violet};
  z-index: 3;
  text-align: center;
`

const TooltipText = styled((props) => <div {...props} />)`
  padding: 1rem;
  color: ${(props) => (props.$isCompleted ? COLORS.acidGreen : COLORS.light)};
`
interface IDotProps {
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

export const Dot = ({
  idx,
  position,
  tooltip,
  isCompleted,
}: IDotProps): JSX.Element => {
  const { handleSetActiveDot, activeDot } = useGame()
  return (
    <div onClick={() => handleSetActiveDot(idx)}>
      <HoverStyle
        $position={position}
        $isVisible={idx === activeDot}
        $isCompleted={isCompleted}
      />
      <StyledDot
        data-testid="chest-section_dot"
        $position={position}
        $isCompleted={isCompleted}
        $isVisible={idx === activeDot}
      />
      <TooltipContainer $isVisible={idx === activeDot}>
        <TooltipText $isCompleted={isCompleted} $position={position}>
          {tooltip}
        </TooltipText>
        {isCompleted && <BsCheckLg color={COLORS.acidGreen} size={20} />}
      </TooltipContainer>
    </div>
  )
}
