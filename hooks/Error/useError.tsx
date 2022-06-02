import { ErrorContext } from './ErrorProvider'
import { useContext } from 'react'

export const useError = () => useContext(ErrorContext)
