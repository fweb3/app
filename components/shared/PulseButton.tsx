import { COLORS, MEDIA_QUERY, SPACING, TEXT } from '../styles'
import styled, { keyframes } from 'styled-components'
import type { IComponentProps } from '../../types'

const pulse = keyframes`
  0% {
    transform: scale(0.99);
    box-shadow: 0 0 0 0 ${COLORS.violetAlpha};
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px ${COLORS.shadow};
  }

  100% {
    transform: scale(0.99);
    box-shadow: 0 0 0 0 ${COLORS.shadow};
  }
`

const Button = styled.button`
  background: ${COLORS.violet};
  color: black;
  font-size: ${TEXT.p};
  font-weight: bold;
  border: none;
  margin-top: ${SPACING.medium};
  padding: ${SPACING.medium};
  width: 100%;
  cursor: pointer;

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    animation: ${pulse} 2s infinite;
    border-radius: ${SPACING.medium};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.desktop}) {
    padding: ${SPACING.large};
  }
`
interface IButtonProps extends IComponentProps {
  onClick: () => void
}

export const PulseButton = ({ children, onClick }: IButtonProps) => {
  return (
    <Button data-testid="pulse-btn" onClick={onClick}>
      {children}
    </Button>
  )
}
