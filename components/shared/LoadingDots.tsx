import styled, { keyframes } from 'styled-components'
import { COLORS } from '../styles'

const FadeInOut = keyframes`
  0% {
    opacity: 1;
  };
  50% {
    opacity: 0;
    transform: scale(0.2);
  };
  0% {
    opacity: 1;
  };
`

const FadeIn = keyframes`
  0% {
    opacity: 10;
  };
  100% {
    opacity: 1;
  };
`
const OutterContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
`

const InnerContainer = styled((props) => <div {...props} />)`
  display: grid;
  grid-template-rows: 1fr 20% 1fr;
  grid-template-columns: 1fr 13% 1fr;
  // background: rgba(0, 36, 102, 0.5);
  grid-gap: 0.2rem;
  width: 100%;
  height: 100%;
  animation: ${(props) => props.isLoading && `${FadeIn} 0.3s`};
`

const DotContainer = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`

const DOT_SIZE = '50px'

const Dot = styled((props) => <div {...props} $s={props.$s} />)`
  background: ${COLORS.violet};
  width: ${DOT_SIZE};
  height: ${DOT_SIZE};
  border-radius: 50%;
  animation: ${FadeInOut} ${(props) => `${props.$s}s`} infinite;
`

export const LoadingDots = ({ isLoading }) => {
  return isLoading ? (
    <OutterContainer>
      <InnerContainer $isLoading={isLoading}>
        <DotContainer>
          {[...Array.from(Array(9).keys())].map((i) => (
            <Dot key={i} $s={(i + 9) * 0.19} />
          ))}
        </DotContainer>
      </InnerContainer>
    </OutterContainer>
  ) : null
}
