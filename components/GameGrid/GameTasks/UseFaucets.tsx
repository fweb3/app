import Link from 'next/link'

export const UseFaucets = () => {
  return (
    <>
      <h2>Receive gas using tokens (for free!)</h2>
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
        receive .0420 $MATIC. You&apos;ll need the 300 $FWEB3 tokens from the
        fweb3 faucet in order to use it.
      </p>
    </>
  )
}
