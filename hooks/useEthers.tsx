import { EthersContext } from '../providers/EthersProvider'
import { useContext } from 'react'
// implementation in ./providers/EthersProvider.tsx
export const useEthers = () => useContext(EthersContext)
