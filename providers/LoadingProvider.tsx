import { LoadingDots } from '../components/shared/LoadingDots'
import { createContext, useContext, useState } from 'react'
interface ILoadingContext {
  isLoading: boolean
  fullscreenLoader: (val: boolean) => void
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
  fullscreenLoader: () => {},
}

const LoadingContext = createContext(defaultLoadingContext)

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fullscreenLoader = (val: boolean) => {
    setIsLoading(val)
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        fullscreenLoader,
      }}
    >
      <>
        <LoadingDots isLoading={isLoading} />
        {children}
      </>
    </LoadingContext.Provider>
  )
}

const useLoading = () => useContext(LoadingContext)

export { LoadingProvider, useLoading }
