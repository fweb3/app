import { ShareButton } from '../GameGrid/ShareButton'
import styled from 'styled-components'
import { DOTS_MAP } from './dots'
import { Dot } from './Dot'
import { useConnection, useGame } from '../../providers'

const ChestContainer = styled.div``

const Chest = styled.div`
  display: block;
  contain: content;
  background: url('./chest_closed.png') no-repeat;
  background-size: contain;
  background-repeat: no-repeat;
  width: 800px;
  height: 800px;
  @media only screen and (max-width: 814px) {
    grid-template-rows: 1rf;
    width: 490px;
    height: 490px;
  }
`

export const ChestSection = () => {
  // const { isConnected } = useConnection()
  const { completedTasks } = useGame()
  const isConnected = true
  return (
    <ChestContainer>
      <Chest>
        {isConnected &&
          Object.entries(completedTasks).map(([key, value], i) => (
            <Dot key={i} idx={key} {...value} />
          ))}
      </Chest>
      <ShareButton />
    </ChestContainer>
  )
}
