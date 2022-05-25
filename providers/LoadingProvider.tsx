import { Context, createContext, useContext, useState } from 'react'
import { LoadingDots } from '../components/shared/LoadingDots'
import { IComponentProps } from '../components/component'
import { Id, toast, ToastOptions } from 'react-toastify'

interface ILoadingContext {
  isLoading: boolean
  fullscreenLoader: (val: boolean) => void
  startToast: (msg: string) => Id
  updateToast: (msg: string, toaster?: Id, opts?: ToastOptions) => void
  errorToast: (msg: string, toaster?: Id, opts?: ToastOptions) => void
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
  fullscreenLoader: () => {},
  updateToast: () => {},
  startToast: () => toast.success('default'),
  errorToast: () => {},
}

const LoadingContext: Context<ILoadingContext> = createContext(
  defaultLoadingContext
)

const LoadingProvider = ({ children }: IComponentProps) => {
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

  const updateToast = (message: string, toaster?: Id, opts?: ToastOptions) => {
    const defaultOpts = {
      type: toast.TYPE.INFO,
      isLoading: false,
      autoClose: 1000,
      pauseOnFocusLoss: false,
      hideProgressBar: undefined,
      ...opts,
    }
    setTimeout(() => {
      toast.update(toaster || '', {
        render: message,
        ...defaultOpts,
      })
    }, 500)
  }
  const errorToast = (message: string, toaster?: Id): void => {
    if (!toaster) {
      toast.error(message, {
        isLoading: false,
        autoClose: 1000,
        pauseOnFocusLoss: false,
        hideProgressBar: undefined,
      })
      return
    }
    updateToast(message, toaster, {
      type: toast.TYPE.ERROR,
    })
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        fullscreenLoader,
        startToast,
        updateToast,
        errorToast,
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
