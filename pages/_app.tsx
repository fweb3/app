import type { AppProps } from 'next/app'
import {
  ConnectionProvider,
  NotificationProvider,
  GameProvider,
  LoadingProvider,
} from '../providers'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <ConnectionProvider>
        <LoadingProvider>
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </LoadingProvider>
      </ConnectionProvider>
    </NotificationProvider>
  )
}

export default NextWeb3App
