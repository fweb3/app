import { BORDERS, COLORS } from '../styles'
import { BsCheckLg } from 'react-icons/bs'
import { useGame } from '../../providers'
import styled from 'styled-components'
import { IDotProps } from './Dot'

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

export const Tooltip = (dotData: IDotProps): JSX.Element => {
  const { activeDot } = useGame()
  const { idx, tooltip, position, isCompleted } = dotData
  const isVisible = idx === activeDot
  return (
    <TooltipContainer
      data-testid={`chest-tooltip_${idx}`}
      $isVisible={isVisible}
    >
      <TooltipText $isCompleted={isCompleted} $position={position}>
        {tooltip}
      </TooltipText>
      {isCompleted && (
        <BsCheckLg
          data-testid={`chest-tooltip-checkmark_${idx}`}
          color={COLORS.acidGreen}
          size={20}
        />
      )}
    </TooltipContainer>
  )
}
