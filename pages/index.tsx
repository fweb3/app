import { ContentSection } from '../components/GameGrid/ContentSection'
import { ChestSection } from '../components/Chest/ChestSection'
import { Layout } from '../components/shared/Layout'
import styled from 'styled-components'

const GameGrid = styled.div`
  display: grid;
  @media only screen and (min-width: 600px) {
    justify-items: center;
  }
  @media only screen and (min-width: 1440px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 1rem;
  }
`

export default function Home() {
  return (
    <Layout>
      <GameGrid>
        <ChestSection />
        <ContentSection />
      </GameGrid>
    </Layout>
  )
}
