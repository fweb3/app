import { createContext, useContext, useState } from 'react'
import { DEFAULT_TOAST_OPTS } from '../providers'
import { toast, Id } from 'react-toastify'
interface ILoadingContext {
  isLoading: boolean
  fullscreenLoader: (val: boolean) => void
  loadingToast: (id: number, msg?: string) => Id
  updateToast: (toaster: Id, msg?: string) => void
  successToast: (toaster: Id, msg?: string) => void
  errorToast: (toaster: Id, msg?: string) => void
}

const defaultLoadingContext: ILoadingContext = {
  isLoading: false,
  fullscreenLoader: () => {},
  loadingToast: () => null,
  updateToast: () => {},
  successToast: () => {},
  errorToast: () => {},
}

const LoadingContext = createContext(defaultLoadingContext)

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fullscreenLoader = (val: boolean) => {
    setIsLoading(val)
  }

  const loadingToast = (toastId: number, message: string = 'Loading...') => {
    return toast.loading(message, {
      toastId,
      ...DEFAULT_TOAST_OPTS,
    })
  }

  const updateToast = (toaster: Id, message: string) => {
    toast.update(toaster, {
      render: message,
      type: toast.TYPE.INFO,
      autoClose: 500,
      isLoading: false,
      ...DEFAULT_TOAST_OPTS,
    })
  }

  const successToast = (toaster: Id, message: string = 'Success') => {
    toast.update(toaster, {
      render: message,
      type: toast.TYPE.SUCCESS,
      autoClose: 500,
      isLoading: false,
      ...DEFAULT_TOAST_OPTS,
    })
  }

  const errorToast = (toaster: Id, message: string = 'An error occured') => {
    toast.update(toaster, {
      render: message,
      type: toast.TYPE.ERROR,
      autoClose: 2000,
      isLoading: false,
      ...DEFAULT_TOAST_OPTS,
    })
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        fullscreenLoader,
        loadingToast,
        updateToast,
        successToast,
        errorToast,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => useContext(LoadingContext)

export { LoadingProvider, useLoading }
