import Link from 'next/link'

export const ReceivingTokens = () => {
  return (
    <>
      <h2>Receive tokens (for free!)</h2>
      <p>
        <a
          href="https://discord.gg/pNSFNfyVxA"
          target="_blank"
          rel="noreferrer"
        >
          Join our Discord
        </a>{' '}
        and use the{' '}
        <Link href="https://fweb3-faucet.vercel.app">Web Faucet</Link> to
        receive 300 $FWEB3 tokens by specifying your wallet address.
      </p>
      <p>That&apos;s enough to complete all the tasks in the game.</p>
      <p>
        Don&apos;t see your tokens? Double check that your wallet is connected
        to the Polygon Network.
      </p>
      <p>
        Once you receive them, use the #collabland-join channel to verify your
        ownership and see the rest of the channels on Discord.
      </p>
    </>
  )
}
