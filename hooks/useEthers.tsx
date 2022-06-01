import { EthersContext } from '../providers/EthersProvider'
import { useContext } from 'react'

export const useEthers = () => useContext(EthersContext)
