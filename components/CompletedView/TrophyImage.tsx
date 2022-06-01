import styled from 'styled-components'
import { useGame } from '../../hooks'
import Image from 'next/image'

const ImageContainer = styled.div``

const StyledImage = styled(Image)`
  border-radius: 50%;
`

export const TrophyImage = (): JSX.Element => {
  const { trophyColor } = useGame()
  return (
    <ImageContainer>
      {trophyColor ? (
        <StyledImage
          src={`/fweb_yearone_${trophyColor}.png`}
          alt="trophy"
          width={500}
          height={500}
        />
      ) : (
        <>NO IMAGE FOUND!</>
      )}
    </ImageContainer>
  )
}
