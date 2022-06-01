import { UrlContext } from '../providers/UrlProvider'
import { useContext } from 'react'

// implementation in ./providers/UrlProvider.tsx
export const useUrl = () => useContext(UrlContext)
