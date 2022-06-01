import { IComponentProps } from '../components/component'
import { toast, ToastOptions } from 'react-toastify'
import { createContext, useState } from 'react'
import { useLoading } from '../hooks'

interface IErrorContext {
  errorMessage: string
  setErrorMessage: (msg: string) => void
  errorToast: (error: string, opts?: ToastOptions) => void
  errorWithToast: (error: string, opts?: ToastOptions) => void
}

const defaultErrorContext: IErrorContext = {
  errorMessage: '',
  setErrorMessage: () => null,
  errorToast: () => null,
  errorWithToast: () => null,
}

const ErrorContext = createContext(defaultErrorContext)

const ErrorProvider = ({ children }: IComponentProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { setIsLoading } = useLoading()

  const errorWithToast = (msg: string, opts?: ToastOptions) => {
    setErrorMessage(msg)
    errorToast(msg, opts)
    setIsLoading(false)
  }

  const defaultToastOptions = {
    pauseOnFocusLoss: false,
    autoClose: 1000,
    hideProgressBar: undefined,
    isLoading: false,
  }

  const errorToast = (msg: string, opts?: ToastOptions) => {
    setIsLoading(false)
    toast.error(msg, {
      ...defaultToastOptions,
      ...opts,
    })
  }

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        errorToast,
        errorWithToast,
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export { ErrorProvider, ErrorContext }
