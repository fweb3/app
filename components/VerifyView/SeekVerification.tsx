import { PulseButton } from '../shared/PulseButton'

export const SeekVerification = () => {
  const handleVerification = () => {}
  return (
    <>
      <p>Please click the button below to seek verification from a judge.</p>
      <p>
        If you have already clicked verify once you do not need to again. It
        will only cost you more gas.
      </p>
      <p>
        Once a judge verifies you, you&apos;ll be able to claim your 1,000
        $FWEB3 tokens.
      </p>
      <PulseButton text="Seek verification" onClick={handleVerification} />
    </>
  )
}
