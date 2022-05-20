import { useConnection, useGame, useLoading } from '../../providers'
import { SeekVerification } from './SeekVerification'
import { useState, useEffect, useRef } from 'react'
import { VerifiedWinner } from './VerifiedWinner'
import { ContractFunction } from 'ethers'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const GameFinish = () => {
  const [transaction, setTransaction] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const { fullscreenLoader } = useLoading()
  const { isConnected, account } = useConnection()
  const [isWinner, setIsWinner] = useState(false)
  const [isJudge, setIsJudge] = useState(false)
  const { gameContract } = useGame()
  const { query } = useRouter()
  const toastId = useRef(null)

  const sendTransaction = async (
    method: ContractFunction,
    args: string = ''
  ) => {
    try {
      toastId.current = toast.loading('Sending tx', {
        autoClose: 1000,
      })
      fullscreenLoader(true)
      const tx = await method(args)
      const receipt = await tx.wait()
      setTransaction(receipt)
      fullscreenLoader(false)
      toast.update(toastId.current, {
        render: 'Sent!',
        type: toast.TYPE.SUCCESS,
        autoClose: 1000,
      })
    } catch (err) {
      console.error(err)
      toast.update(toastId.current, {
        render: 'Error sending tx',
        type: toast.TYPE.ERROR,
        autoClose: 1000,
      })
    }
  }
  const handleSeekVerification = async () => {
    await sendTransaction(gameContract.seekVerification)
  }

  const handleWin = async () => {
    await sendTransaction(gameContract.win)
  }

  const handleVerify = async () => {
    await sendTransaction(
      gameContract.verifyPlayer,
      query.wallet.toString() ?? account
    )
  }

  useEffect(() => {
    ;(async () => {
      if (isConnected && gameContract) {
        fullscreenLoader(true)
        toastId.current = toast.loading('Checking win state...', {
          autoClose: 1000,
        })
        try {
          const user = query?.wallet ?? account
          const isVerified = await gameContract.hasBeenVerifiedToWin(user)
          const isJudge = await gameContract.isJudge(account)
          const isWinner = await gameContract.isWinner(user)
          setIsVerified(isVerified)
          setIsWinner(isWinner)
          setIsJudge(isJudge)
          toast.update(toastId.current, {
            render: 'Done!',
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 1000,
          })
          fullscreenLoader(false)
        } catch (err) {
          console.error(err)
          toast.update(toastId.current, {
            render: 'An error occured',
            type: toast.TYPE.ERROR,
            isLoading: false,
            autoClose: 1000,
          })
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
  //         Claim 1,000 $FWEB3 tokens
  //       </button>
  //     </>
  //   )
  // } else if (true) {
  //   <VerifiedWinner />
  // } else {
  //   return <></>
  // }
}
