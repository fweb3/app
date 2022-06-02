import { LoadingContext } from './LoadingProvider'
import { useContext } from 'react'

export const useLoading = () => useContext(LoadingContext)
