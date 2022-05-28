import { COLORS, MEDIA_QUERY, SPACING } from '../styles'
import { useError, useDevice } from '../../hooks'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'
import { useEffect } from 'react'

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

  @media only screen and (min-width: ${MEDIA_QUERY.smallDesk}) {
    top: 125px;
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

  const handleCloseBanner = () => {
    setErrorMessage('')
  }

  useEffect(() => {
    if (device && device !== 'desktop') {
      setErrorMessage('Not supported on mobile')
    }
  }, [device]) // eslint-disable-line

  return errorMessage ? (
    <Container>
      <ErrorText>{errorMessage}</ErrorText>
      <CloseBtnContainer onClick={handleCloseBanner}>
        {device === 'desktop' ? (
          <StyledCloseIcon size={40} color="white" />
        ) : (
          ''
        )}
      </CloseBtnContainer>
    </Container>
  ) : (
    <></>
  )
}
