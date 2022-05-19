import styled, { keyframes } from 'styled-components'
import { COLORS, SPACING } from '../styles'

const pulse = keyframes`
  0% {
    transform: scale(0.99);
    box-shadow: 0 0 0 0 ${COLORS.violetAlpha};
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(255, 149, 238, 0);
  }

  100% {
    transform: scale(0.99);
    box-shadow: 0 0 0 0 rgba(255, 149, 238, 0);
  }
`

const Button = styled.button`
  animation: ${pulse} 2s infinite;
  background: ${COLORS.violet};
  border-radius: 3rem;
  border: none;
  color: ${COLORS.russianViolet};
  font-weight: bold;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.2s ease-in-out;
  font-size: 1.5rem;
  padding: ${SPACING.medium};
`

export const PulseButton = ({ children, onClick }) => {
  return (
    <Button data-testid="pulse-btn" onClick={onClick}>
      {children}
    </Button>
  )
}
