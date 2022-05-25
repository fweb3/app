import styled, { keyframes } from 'styled-components'
import { HeadingText } from '../shared/Elements'
import { flash } from 'react-animations'
import { TEXT } from '../styles'

const flicker = keyframes(flash)

const FlashingHeader = styled(HeadingText)`
  padding: 0;
  margin: 0;
  animation: 0.2s repeat ${flicker};
  animation-delay: 10s;
  font-size: ${TEXT.h2};
`

export const HeaderLogo = () => {
  return (
    <FlashingHeader data-testid="header-mobile_heading">fweb3</FlashingHeader>
  )
}
