import { useConnection } from "../providers";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Trophy } from "./Trophy";

export const GameFinish = () => {
  const [transactionFinished, setTransactionFinished] = useState(false);
  const { isConnected, account, gameContract } = useConnection();
  const [isVerified, setIsVerified] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isJudge, setIsJudge] = useState(false);
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();

  const seekVerification = async () => {
    const tx = await gameContract.seekVerification();
    setLoading(true);
    await tx.wait();
    setLoading(false);
    setTransactionFinished(true);
  };

  const win = async () => {
    setLoading(true);
    const tx = await gameContract.win();
    await tx.wait();
    setLoading(false);
    setTransactionFinished(true);
  };

  const verify = async () => {
    setLoading(true);
    const tx = await gameContract.verifyPlayer(query.wallet);
    await tx.wait();
    setLoading(false);
    setTransactionFinished(true);
  };

  useEffect(() => {
    (async () => {
      try {
        if (isConnected) {
          const user = query?.wallet ?? account;
          const verifiedToWin = await gameContract.hasBeenVerifiedToWin(user);
          const isJudge = await gameContract.isJudge(account);
          const isWinner = await gameContract.isWinner(user);
          setIsVerified(verifiedToWin);
          setIsWinner(isWinner);
          setIsJudge(isJudge);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isConnected, account, query, gameContract]);

  if (loading) {
    return <button className="disabled">Waiting for confirmation...</button>;
    // User is not verified and on their own page
  } else if (!isVerified && (!query.wallet || query.wallet === account)) {
    if (transactionFinished) {
      return (
        <p>
          Please wait for a judge to verify you. If it&apos;s been awhile, ping
          #finish-line to remind them.
        </p>
      );
    }
    return (
      <>
        <p>Please click the button below to seek verification from a judge.</p>
        <p>
          Once a judge verifies you, you&apos;ll be able to claim your 1,000
          $FWEB3 tokens.
        </p>
        <button onClick={seekVerification} className="pulse">
          Seek verification
        </button>
      </>
    );
    // User is a judge and page account is not verified
  } else if (!isVerified && isJudge) {
    if (transactionFinished) {
      return <p>You can remind this player to claim their tokens.</p>;
    }
    return (
      <>
        <p>If the nine dots on the left are lit up:</p>
        <button onClick={verify} className="pulse">
          Verify
        </button>
      </>
    );
  } else if (
    isVerified &&
    !isWinner &&
    (!query.wallet || query.wallet === account)
  ) {
    if (transactionFinished) {
      return (
        <>
          <p>Your tokens are en route...</p>
        </>
      );
    }
    return (
      <>
        <button onClick={win} className="pulse">
          Claim 1,000 $FWEB3 tokens
        </button>
      </>
    );
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
    );
  } else {
    return <></>;
  }
};
