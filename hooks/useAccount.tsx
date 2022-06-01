import { AccountContext } from '../providers/AccountProvider'
import { useContext } from 'react'
// implementation in ./providers/AccountProvider.tsx
export const useAccount = () => useContext(AccountContext)
