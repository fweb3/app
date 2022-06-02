import { EthersContext } from './EthersProvider'
import { useContext } from 'react'

export const useEthers = () => useContext(EthersContext)
