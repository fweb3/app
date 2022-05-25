import { HeadingText, CommonText } from '../shared/Elements'
import { PulseButton } from '../shared/PulseButton'
import { useEffect } from 'react'

export const SeekVerification = (): JSX.Element => {
  const handleVerification = (): void => {}

  useEffect(() => {}, [])

  return (
    <>
      <HeadingText>Tasks Complete!</HeadingText>
      <CommonText>
        Please click the button below to seek verification from a judge.
      </CommonText>
      <CommonText>
        If you have already clicked verify once you do not need to again. It
        will only cost you more gas.
      </CommonText>
      <CommonText>
        Once a judge verifies you, you&apos;ll be able to claim your 1,000 FWEB3
        tokens.
      </CommonText>
      <PulseButton onClick={handleVerification}>Seek verification</PulseButton>
    </>
  )
}
