import { useContext } from 'react'
import { ErrorContext } from '../providers/ErrorProvider'

export const useError = () => useContext(ErrorContext)
