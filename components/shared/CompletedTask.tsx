import { slideInLeft, slideInRight, fadeIn, tada } from 'react-animations'
import styled, { keyframes } from 'styled-components'
import { GiStarKey } from 'react-icons/gi'
import { HeadingText } from './Elements'
import { COLORS, TEXT } from '../styles'

const leftAnim = keyframes(slideInLeft)
const rightAnim = keyframes(slideInRight)
const fade = keyframes(fadeIn)
const keyanim = keyframes(tada)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  border-radius: 2rem;
  border: 1px solid white;
  animation: 0.6s ${fade};
`

const CompleteText = styled(HeadingText)`
  color: gold;
  font-size: ${TEXT.h3};
  animation: 0.2s ${leftAnim};
`
const TaskText = styled.p`
  font-size: ${TEXT.p};
  color: ${COLORS.acidGreen};
  padding: 0;
  margin: 0;
  animation: 0.2s ${rightAnim};
  animation-delay: 1s;
`

const Key = styled(GiStarKey)`
  margin-top: 3rem;
  animation: 0.6s ${keyanim};
  animation-delay: 2s;
`

export const CompletedTask = ({ task }: { task: string }): JSX.Element => {
  return (
    <Container>
      <CompleteText>Task Complete!</CompleteText>
      <TaskText>{task}</TaskText>
      <Key size={120} color="gold" />
    </Container>
  )
}
