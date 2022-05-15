import { useConnection, useGame, useLoading } from '../providers'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Trophy } from './Trophy'
import { ContractFunction } from 'ethers'

export const GameFinish = () => {
  const [transaction, setTransaction] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const {
    isLoading,
    loadingToast,
    successToast,
    fullscreenLoader,
    errorToast,
  } = useLoading()
  const { isConnected, account } = useConnection()
  const [isWinner, setIsWinner] = useState(false)
  const [isJudge, setIsJudge] = useState(false)
  const { gameContract } = useGame()
  const { query } = useRouter()

  const sendTransaction = async (
    method: ContractFunction,
    args: string = ''
  ) => {
    const toaster = loadingToast(3)
    try {
      fullscreenLoader(true)
      const tx = await method(args)
      const receipt = await tx.wait()
      setTransaction(receipt)
      fullscreenLoader(false)
      successToast(toaster)
    } catch (err) {
      console.error(err)
      errorToast(toaster)
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
        const toaster = loadingToast(2, 'Checking win state...')
        try {
          const user = query?.wallet ?? account
          const verifiedToWin = await gameContract.hasBeenVerifiedToWin(user)
          const isJudge = await gameContract.isJudge(account)
          const isWinner = await gameContract.isWinner(user)
          setIsVerified(verifiedToWin)
          setIsWinner(isWinner)
          setIsJudge(isJudge)
          successToast(toaster)
          fullscreenLoader(false)
        } catch (err) {
          console.error(err)
          errorToast(toaster, 'Network congested')
          fullscreenLoader(false)
        }
      }
    })()
  }, [isConnected, account, query, gameContract]) // eslint-disable-line

  if (!isVerified && (!query.wallet || query.wallet === account)) {
    if (transaction) {
      return (
        <p>
          Please wait for a judge to verify you. If it&apos;s been awhile, ping
          #finish-line to remind them.
        </p>
      )
    }
    return (
      <>
        <p>Please click the button below to seek verification from a judge.</p>
        <p>
          Once a judge verifies you, you&apos;ll be able to claim your 1,000
          $FWEB3 tokens.
        </p>
        <button onClick={handleSeekVerification} className="pulse">
          Seek verification
        </button>
      </>
    )
    // User is a judge and page account is not verified
  } else if (!isVerified && isJudge) {
    if (transaction) {
      return <p>You can remind this player to claim their tokens.</p>
    }
    return (
      <>
        <p>If the nine dots on the left are lit up:</p>
        <button onClick={handleVerify} className="pulse">
          Verify
        </button>
      </>
    )
  } else if (
    isVerified &&
    !isWinner &&
    (!query.wallet || query.wallet === account)
  ) {
    if (transaction) {
      return (
        <>
          <p>Your tokens are en route...</p>
        </>
      )
    }
    return (
      <>
        <button onClick={handleWin} className="pulse">
          Claim 1,000 $FWEB3 tokens
        </button>
      </>
    )
  } else if (isWinner) {
    return (
      <>
        <Trophy />
        <p>
          Enjoyed yourself? Consider onboarding a friend or family member by
          sending them some $FWEB3 tokens.
        </p>
        <p>
          Or help us build by chiming into the #building channel on Discord.
        </p>
      </>
    )
  } else {
    return <></>
  }
}
