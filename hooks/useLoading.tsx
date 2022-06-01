import { useContext } from 'react'
import { LoadingContext } from '../providers/LoadingProvider'

// implementation in ./providers/LoadingProvider.tsx
export const useLoading = () => useContext(LoadingContext)
