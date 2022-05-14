import { createContext, useContext, useEffect, useState } from 'react'
import { useConnection, useGame } from '../providers'

interface ILoadingContext {
  isLoading: boolean
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
}

const LoadingContext = createContext(defaultLoadingContext)

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isFetchingGameData } = useGame()
  const { isConnecting } = useConnection()
  useEffect(() => {
    if (isConnecting || isFetchingGameData) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [isConnecting, isFetchingGameData])
  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => useContext(LoadingContext)

export { LoadingProvider, useLoading }
