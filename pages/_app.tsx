import { RootProvider } from '../hooks/RootProvider'
import type { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css'
import '../public/index.css'
import 'normalize.css'

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  )
}

export default NextWeb3App
