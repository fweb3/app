import { UrlContext } from './UrlProvider'
import { useContext } from 'react'

export const useUrl = () => useContext(UrlContext)
