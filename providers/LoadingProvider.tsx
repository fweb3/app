import { LoadingDots } from '../components/shared/LoadingDots'
import { createContext, useContext, useState } from 'react'
import { Id, toast, ToastContent, ToastOptions } from 'react-toastify'
interface ILoadingContext {
  isLoading: boolean
  fullscreenLoader: (val: boolean) => void
  startToast: (msg: string) => Id
  updateToast: (toaster: ToastContent, msg: string, opts?: ToastOptions) => void
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
  fullscreenLoader: () => {},
  updateToast: () => {},
  startToast: () => null,
}

const LoadingContext = createContext(defaultLoadingContext)

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fullscreenLoader = (val: boolean) => {
    setIsLoading(val)
  }

  const startToast = (
    message: string = 'Loading...',
    opts: ToastOptions = {}
  ): Id => {
    const defaultOptions = {
      autoClose: 2000,
      pauseOnFocusLoss: false,
      ...opts,
    }
    return toast.loading(message, {
      ...defaultOptions,
    })
  }

  // Temp fix until toastify library gets fixed
  const updateToast = (
    toaster: Id,
    message: string = 'Loaded!',
    opts: ToastOptions = {}
  ) => {
    const defaultOpts = {
      type: toast.TYPE.INFO,
      isLoading: false,
      autoClose: 1000,
      pauseOnFocusLoss: false,
      hideProgressBar: undefined,
      ...opts,
    }
    setTimeout(() => {
      toast.update(toaster, {
        render: message,
        ...defaultOpts,
      })
    }, 1000)
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        fullscreenLoader,
        startToast,
        updateToast,
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
