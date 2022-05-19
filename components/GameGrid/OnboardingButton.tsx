import MetaMaskOnboarding from '@metamask/onboarding'
import { useRef, useEffect, useState } from 'react'

export const OnboardingButton = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const onboarding = useRef(null)

  const handleOnboard = () => {
    setIsDisabled(true)
    onboarding.current.startOnboarding()
  }

  useEffect(() => {
    // clear on load
    setIsDisabled(false)
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  return (
    <button disabled={isDisabled} onClick={handleOnboard}>
      Onboard
    </button>
  )
}
