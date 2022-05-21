declare let window: any

import { useConnection } from '../../providers'
import styled, { keyframes } from 'styled-components'
import { COLORS, SPACING, TEXT } from '../styles'
// import MetaMaskOnboarding from "@metamask/onboarding";
// import { OnboardingButton } from "./OnboardingButton";
import { CgSpinner } from 'react-icons/cg'
import { PulseButton } from '../shared/PulseButton'
import { OnboardingButton } from './OnboardingButton'

const Spin = keyframes`
  0% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinContainer = styled.span`
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
`

const Spinner = styled((props) => <CgSpinner {...props} />)`
  // animation: ${Spin} 1s infinite;
  // margin-right: 0.5rem;
`

const ButtonContainer = styled.div`
  // display: flex;
  // margin: ${SPACING.large};
  // justify-content: center;
`

const ButtonText = styled.span`
  // font-family: ${TEXT.font};
  // color: white;
  // margin: ${SPACING.medium};
`

export const ConnectButton = () => {
  const { connect, isConnected, isConnecting } = useConnection()
  // todo onboarding
  // if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
  // const isMetaMaskInstalled = window && typeof window?.ethereum !== undefined
  //   return <OnboardingButton />
  // }

  const isMetaMaskInstalled = true

  return !isConnected ? (
    <ButtonContainer>
      {isMetaMaskInstalled ? (
        <PulseButton data-testid="pulse-btn" onClick={connect}>
          {isConnecting ? (
            <SpinContainer>
              <Spinner size={40} />
              <ButtonText>Connecting...</ButtonText>
            </SpinContainer>
          ) : (
            <ButtonText>Connect Wallet</ButtonText>
          )}
        </PulseButton>
      ) : (
        <OnboardingButton />
      )}
    </ButtonContainer>
  ) : null
}
