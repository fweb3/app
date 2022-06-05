import { COLORS, MEDIA_QUERY, SPACING } from '../styles'
import styled, { keyframes } from 'styled-components'
import { useError, useDevice } from '../../hooks'
import { fadeIn } from 'react-animations'
import { MdClose } from 'react-icons/md'
import { useEffect } from 'react'

const fade = keyframes(fadeIn)

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  background: ${COLORS.error};
  position: fixed;
  z-index: 6;
  top: 100px;
  left: 0;
  right: 0;
  padding: ${SPACING.medium};
  box-shadow: inset 2px 2px 8px 1px rgba(0, 0, 0, 0.5);
  animation: ${fade} 1.5s ease-in-out;

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    top: 125px;
    padding: 0.7rem;
  }
`

const ErrorText = styled.p`
  grid-column: 2;
  justify-self: center;
  margin: 0;
  padding: 0;
  color: white;
  font-size: 1.2rem;
`

const CloseBtnContainer = styled.div`
  grid-column: 3 / 3;
  border-radius: 50%;
  justify-self: flex-end;
  margin-right: 1rem;
`

const StyledCloseIcon = styled(MdClose)``

export const ErrorBanner = () => {
  const { errorMessage, setErrorMessage } = useError()
  const { device } = useDevice()

  const isMobile = device && device !== 'desktop'

  const handleCloseBanner = () => {
    setErrorMessage('')
  }

  useEffect(() => {
    if (isMobile) {
      setErrorMessage('Not supported on mobile')
    }
  }, [device]) // eslint-disable-line

  return errorMessage ? (
    <Container data-testid="error-banner">
      <ErrorText>{errorMessage}</ErrorText>
      <CloseBtnContainer data-testid="close-btn" onClick={handleCloseBanner}>
        {device === 'desktop' ? (
          <StyledCloseIcon size={isMobile ? 30 : 40} color="white" />
        ) : (
          ''
        )}
      </CloseBtnContainer>
    </Container>
  ) : (
    <></>
  )
}
