import { LoadingDots } from '../components/shared/LoadingDots'
import { IComponentProps } from '../components/component'
import { Context, createContext, useState } from 'react'

interface ILoadingContext {
  isLoading: boolean
  setIsLoading: (val: boolean) => void
}

const defaultContext: ILoadingContext = {
  isLoading: false,
  setIsLoading: () => null,
}

const LoadingContext: Context<ILoadingContext> = createContext(defaultContext)

const LoadingProvider = ({ children }: IComponentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      <>
        <LoadingDots isLoading={isLoading} />
        {children}
      </>
    </LoadingContext.Provider>
  )
}

export { LoadingProvider, LoadingContext }
