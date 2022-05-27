import { HeadingText, CommonText } from '../shared/Elements'
import { PulseButton } from '../shared/PulseButton'
import { useEffect } from 'react'

// const sendTransaction = async (method: ContractFunction, args?: string) => {
//   const toaster = startToast('Sending tx')
//   try {
//     fullscreenLoader(true)
//     const tx = await method(args)
//     const receipt = await tx.wait()
//     setTransaction(receipt)
//     fullscreenLoader(false)
//     updateToast('Sent tx', toaster, {
//       type: toast.TYPE.SUCCESS,
//     })
//   } catch (err) {
//     console.error(err)
//     errorToast('Error sending tx', toaster)
//   }
// }
// const handleSeekVerification = async () => {
//   await sendTransaction(gameContract?.seekVerification)
// }

// const handleWin = async () => {
//   await sendTransaction(gameContract?.win)
// }

// const handleVerify = async () => {
//   await sendTransaction(gameContract?.verifyPlayer, account)
// }

// useEffect(() => {
//   ;(async () => {
//     if (isConnected && gameContract) {
//       fullscreenLoader(true)
//       const toaster = startToast('Checking win state...')
//       try {
//         const user = query?.wallet ?? account
//         const isVerified = await gameContract.hasBeenVerifiedToWin(user)
//         const isJudge = await gameContract.isJudge(account)
//         const isWinner = await gameContract.isWinner(user)
//         setIsVerified(isVerified)
//         setIsWinner(isWinner)
//         setIsJudge(isJudge)
//         updateToast('Done', toaster, {
//           type: toast.TYPE.SUCCESS,
//         })
//         fullscreenLoader(false)
//       } catch (err: GameError) {
//         console.error(err)
//         errorToast(err.message)
//         fullscreenLoader(false)
//       }
//     }
//   })()
// }, [isConnected, account, query, gameContract]) // eslint-disable-line

export const SeekVerification = (): JSX.Element => {
  const handleVerification = (): void => {}

  useEffect(() => {}, [])

  return (
    <div data-testid="seek-verification">
      <HeadingText>Tasks Complete!</HeadingText>
      <CommonText>Please click the button below to seek verification from a judge.</CommonText>
      <CommonText>
        If you have already clicked verify once you do not need to again. It will only cost you more
        gas.
      </CommonText>
      <CommonText>
        Once a judge verifies you, you&apos;ll be able to claim your 1,000 FWEB3 tokens.
      </CommonText>
      <PulseButton onClick={handleVerification}>Seek verification</PulseButton>
    </div>
  )
}
