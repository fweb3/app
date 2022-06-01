import { ErrorContext } from '../providers/ErrorProvider'
import { useContext } from 'react'
// implementation in ./providers/ErrorProvider.tsx
export const useError = () => useContext(ErrorContext)
