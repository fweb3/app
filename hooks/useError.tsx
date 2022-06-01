import { ErrorContext } from '../providers/ErrorProvider'
import { useContext } from 'react'

export const useError = () => useContext(ErrorContext)
