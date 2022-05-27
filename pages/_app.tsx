import { LoadingDots } from '../components/shared/LoadingDots'
import { RootProvider } from '../providers/RootProvider'
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
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  )
}

export default NextWeb3App
