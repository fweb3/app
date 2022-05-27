import { ContentSection } from '../components/GameViews/ContentSection'
import { ChestSection } from '../components/Chest/ChestSection'
import { MEDIA_QUERY, SPACING } from '../components/styles'
import { Layout } from '../components/shared/Layout'
import styled from 'styled-components'

const GameGrid = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
  }

  @media only screen and (min-width: ${MEDIA_QUERY.desktop}) {
    margin-right: ${SPACING.large};
  }

  @media only screen and (min-width: ${MEDIA_QUERY.wide}) {
    grid-template-colums: 1fr 1fr;
    margin-right: 0;
    align-items: center;
    justify-items: flex-start;
  }
`

export default function Home(): JSX.Element {
  return (
    <Layout>
      <GameGrid>
        <ChestSection />
        <ContentSection />
      </GameGrid>
    </Layout>
  )
}
