import type { AppProps } from 'next/app'
import { ConnectionProvider, GameProvider, LoadingProvider } from '../providers'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider>
      <LoadingProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </LoadingProvider>
    </ConnectionProvider>
  )
}

export default NextWeb3App
