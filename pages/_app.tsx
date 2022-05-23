import { ConnectionProvider, GameProvider, LoadingProvider } from '../providers'
import { LoadingDots } from '../components/shared/LoadingDots'
import { useState, useEffect } from 'react'

import type { AppProps } from 'next/app'

import 'react-toastify/dist/ReactToastify.css'
import '../public/index.css'
import 'normalize.css'

function NextWeb3App({ Component, pageProps }: AppProps) {
  const [init, setInit] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setInit(false)
    }, 2000)
  }, [])
  return init ? (
    <LoadingDots isLoading={init} />
  ) : (
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
