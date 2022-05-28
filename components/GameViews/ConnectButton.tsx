declare let window: any // eslint-disable-line

import { useEthers } from '../../providers/EthersProvider'
// import MetaMaskOnboarding from "@metamask/onboarding";
// import { OnboardingButton } from "./OnboardingButton";
import styled, { keyframes } from 'styled-components'
import { OnboardingButton } from './OnboardingButton'
import { PulseButton } from '../shared/PulseButton'
import { CgSpinner } from 'react-icons/cg'
import { SPACING, TEXT } from '../styles'

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
  const { connectAccount, isConnected, isConnecting } = useEthers()
  // todo onboarding
  // if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
  // const isMetaMaskInstalled = window && typeof window?.ethereum !== undefined
  //   return <OnboardingButton />
  // }

  const isMetaMaskInstalled = true

  return !isConnected ? (
    <ButtonContainer>
      {isMetaMaskInstalled ? (
        <PulseButton data-testid="pulse-btn" onClick={connectAccount}>
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
