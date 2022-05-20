import { ConnectionProvider, GameProvider, LoadingProvider } from '../providers'
import type { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css'
import '../public/index.css'
import 'normalize.css'

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <ConnectionProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </ConnectionProvider>
    </LoadingProvider>
  )
}

export default NextWeb3App
