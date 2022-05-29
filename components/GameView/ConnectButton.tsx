declare let window: any // eslint-disable-line

import { useEthers } from '../../providers/EthersProvider'
import styled, { keyframes } from 'styled-components'
import { PulseButton } from '../shared/PulseButton'
import { CgSpinner } from 'react-icons/cg'
import { SPACING } from '../styles'

const Spin = keyframes`
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const Spinner = styled((props) => <CgSpinner {...props} />)`
  animation: ${Spin} 1s infinite;
`

const ButtonContainer = styled.div``

const ButtonText = styled.span`
  margin: ${SPACING.medium};
`

export const ConnectButton = () => {
  const { connectAccount, isConnected, isConnecting } = useEthers()

  return !isConnected ? (
    <ButtonContainer>
      <PulseButton data-testid="connect-btn" onClick={connectAccount}>
        {isConnecting ? (
          <SpinContainer>
            <Spinner size={40} color="white" />
          </SpinContainer>
        ) : (
          <ButtonText>Connect Wallet</ButtonText>
        )}
      </PulseButton>
    </ButtonContainer>
  ) : (
    <></>
  )
}
