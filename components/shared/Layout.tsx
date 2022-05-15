import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import { LoadingDots } from './LoadingDots'

export const MainLayout = ({ children, shareImageUrl }) => {
  return (
    <>
      <ToastContainer limit={2} />
      <LoadingDots />
      <Head>
        <title>Fweb3</title>
        <meta name="description" content="Learn and build web3" />
        <link rel="icon" href="/icon.png" />
        <meta content="Learn and build web3" name="description" />
        <meta content="Fweb3" property="og:title" />
        <meta content="Learn and build web3" property="og:description" />
        <meta content={shareImageUrl} property="og:image" />
        <meta content="Fweb3" property="twitter:title" />
        <meta content={shareImageUrl} property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
      <footer>
        <a
          href="https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7"
          target="_blank"
          rel="noreferrer"
        >
          Walkthrough
        </a>
        <a
          href="https://discord.gg/pNSFNfyVxA"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
        <a
          href="https://github.com/slavingia/fweb3.xyz/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </footer>
    </>
  )
}
