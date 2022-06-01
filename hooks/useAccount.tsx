import { AccountContext } from '../providers/AccountProvider'
import { useContext } from 'react'

export const useAccount = () => useContext(AccountContext)
