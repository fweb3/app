import { useUrl } from '../../providers'
import Head from 'next/head'

export const HtmlHead = () => {
  const { shareInfo } = useUrl()

  return (
    <Head>
      <title>fWeb3</title>
      <meta name="description" content="Learn and build web3" />
      <link rel="icon" href="/icon.png" />
      <meta content="Learn and build web3" name="description" />
      <meta content="Fweb3" property="og:title" />
      <meta content="Learn and build web3" property="og:description" />
      <meta content={shareInfo.imageUrl} property="og:image" />
      <meta content="Fweb3" property="twitter:title" />
      <meta content={shareInfo.imageUrl} property="twitter:image" />
      <meta property="og:type" content="website" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  )
}
