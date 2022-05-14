import { createContext, useContext, useState } from 'react'
import { toast, Slide, ToastOptions } from 'react-toastify'

interface INotificationContext {
  triggerError: (message: string) => void
  triggerSuccess: (message: string) => void
}

const defaultNotificationContext: INotificationContext = {
  triggerError: () => {},
  triggerSuccess: () => {},
}

const NotificationContext = createContext(defaultNotificationContext)

export const DEFAULT_TOAST_OPTS: ToastOptions = {
  progress: 0,
  pauseOnFocusLoss: false,
  theme: 'dark',
}

const NotificationProvider = ({ children }) => {
  const triggerError = (message: string) => {
    toast.error(message, {
      ...DEFAULT_TOAST_OPTS,
    })
  }

  const triggerSuccess = (message: string) => {
    toast.success(message, {
      ...DEFAULT_TOAST_OPTS,
    })
  }

  return (
    <NotificationContext.Provider
      value={{
        triggerError,
        triggerSuccess,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

const useNotification = () => useContext(NotificationContext)

export { NotificationProvider, useNotification }
