import { useConnection, useGame, useLoading } from '../../providers'
import { SeekVerification } from './SeekVerification'
import { useState, useEffect, useRef } from 'react'
import { VerifiedWinner } from './VerifiedWinner'
import { GameError } from '../../interfaces/game'
import { ContractFunction } from 'ethers'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const GameFinish = (): JSX.Element => {
  const { fullscreenLoader, startToast, updateToast, errorToast } = useLoading()
  const [transaction, setTransaction] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const { isConnected, account } = useConnection()
  const [isWinner, setIsWinner] = useState(false)
  const [isJudge, setIsJudge] = useState(false)
  const { gameContract } = useGame()
  const { query } = useRouter()

  const sendTransaction = async (method: ContractFunction, args?: string) => {
    const toaster = startToast('Sending tx')
    try {
      fullscreenLoader(true)
      const tx = await method(args)
      const receipt = await tx.wait()
      setTransaction(receipt)
      fullscreenLoader(false)
      updateToast('Sent tx', toaster, {
        type: toast.TYPE.SUCCESS,
      })
    } catch (err) {
      console.error(err)
      errorToast('Error sending tx', toaster)
    }
  }
  const handleSeekVerification = async () => {
    await sendTransaction(gameContract?.seekVerification)
  }

  const handleWin = async () => {
    await sendTransaction(gameContract?.win)
  }

  const handleVerify = async () => {
    await sendTransaction(gameContract?.verifyPlayer, account)
  }

  useEffect(() => {
    ;(async () => {
      if (isConnected && gameContract) {
        fullscreenLoader(true)
        const toaster = startToast('Checking win state...')
        try {
          const user = query?.wallet ?? account
          const isVerified = await gameContract.hasBeenVerifiedToWin(user)
          const isJudge = await gameContract.isJudge(account)
          const isWinner = await gameContract.isWinner(user)
          setIsVerified(isVerified)
          setIsWinner(isWinner)
          setIsJudge(isJudge)
          updateToast('Done', toaster, {
            type: toast.TYPE.SUCCESS,
          })
          fullscreenLoader(false)
        } catch (err: GameError) {
          console.error(err)
          errorToast(err.message)
          fullscreenLoader(false)
        }
      }
    })()
  }, [isConnected, account, query, gameContract]) // eslint-disable-line

  return !isVerified ? <SeekVerification /> : <VerifiedWinner />

  // if (!isVerified && (!query.wallet || query.wallet === account)) {
  //   if (transaction) {
  //     return (
  //       <p>
  //         Please wait for a judge to verify you. If it&apos;s been awhile, ping
  //         #finish-line to remind them.
  //       </p>
  //     )
  //   }
  //   return (
  //     <SeekVerification />
  //   )
  //   // User is a judge and page account is not verified
  // } else if (!isVerified && isJudge) {
  //   // if (transaction) {
  //   //   return <p>You can remind this player to claim their tokens.</p>
  //   // }
  //   // return (
  //   //   <>
  //   //     <p>If the nine dots on the left are lit up:</p>
  //   //     <button onClick={handleVerify} className="pulse">
  //   //       Verify
  //   //     </button>
  //   //   </>
  //   // )
  // } else if (
  //   isVerified &&
  //   !isWinner &&
  //   (!query.wallet || query.wallet === account)
  // ) {
  //   if (transaction) {
  //     return (
  //       <>
  //         <p>Your tokens are en route...</p>
  //       </>
  //     )
  //   }
  //   return (
  //     <>
  //       <button onClick={handleWin} className="pulse">
  //         Claim 1,000 FWEB3 tokens
  //       </button>
  //     </>
  //   )
  // } else if (true) {
  //   <VerifiedWinner />
  // } else {
  //   return <></>
  // }
}
