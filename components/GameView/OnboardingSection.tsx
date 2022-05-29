import MetaMaskOnboarding from '@metamask/onboarding'
import { PulseButton } from '../shared/PulseButton'
import { Subheading } from '../shared/Elements'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  height: 100%;
  margin-right: 2rem;
`

export const OnboardingSection = () => {
  const onboarding = useRef(null)

  const handleOnboard = () => {
    if (onboarding?.current) {
      // eslint-disable-next-line
      // @ts-ignore
      onboarding?.current?.startOnboarding()
    }
  }

  useEffect(() => {
    if (!onboarding?.current) {
      // eslint-disable-next-line
      // @ts-ignore
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    const hasMetamask = MetaMaskOnboarding.isMetaMaskInstalled()
    if (hasMetamask) {
      window.location.reload()
    }
  }, [])

  return (
    <Container>
      <Subheading>A wallet is required. Please installl meta mask</Subheading>
      <PulseButton data-testid="onboarding-button" onClick={handleOnboard}>
        Onboard
      </PulseButton>
    </Container>
  )
}
