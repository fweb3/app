import { UrlContext } from '../providers/UrlProvider'
import { useContext } from 'react'

export const useUrl = () => useContext(UrlContext)
