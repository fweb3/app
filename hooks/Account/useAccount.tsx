import { AccountContext } from './AccountProvider'
import { useContext } from 'react'

export const useAccount = () => useContext(AccountContext)
