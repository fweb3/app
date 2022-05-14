declare let window: any

import { FWEB3_GAME_ADDRESS, FWEB3_TOKEN_ADDRESS } from '../interfaces'
import { createContext, useContext, useEffect, useState } from 'react'
import fweb3TokenInterface from '../interfaces/Fweb3Token.json'
import fweb3GameInterface from '../interfaces/Fweb3Game.json'
import { DEFAULT_TOAST_OPTS } from './NotificationProvider'
import { Contract, ethers } from 'ethers'
import { toast } from 'react-toastify'
interface IConnectionContext {
  isConnected: boolean
  connect: () => void
  account: string
  provider: ethers.providers.AlchemyProvider | ethers.providers.JsonRpcProvider
  network: ethers.providers.Network
  isConnecting: boolean
  tokenContract: Contract
  gameContract: Contract
  ensName: string
}

const defaultConnectionContext: IConnectionContext = {
  isConnected: false,
  connect: () => {},
  account: '',
  provider: null,
  network: null,
  isConnecting: false,
  tokenContract: null,
  gameContract: null,
  ensName: '',
}

const ConnectionContext = createContext(defaultConnectionContext)

const ConnectionProvider = ({ children }) => {
  const [network, setNetwork] = useState<ethers.providers.Network>(null)
  const [tokenContract, setTokenContract] = useState<Contract>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [gameContract, setGameContract] = useState<Contract>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [account, setAccount] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const [provider, setProvider] = useState(null)

  const connect = async () => {
    if (window?.ethereum) {
      const toaster = toast.loading('Connecting wallet', {
        toastId: 0,
        ...DEFAULT_TOAST_OPTS,
      })
      try {
        setIsConnecting(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account = await provider.send('eth_requestAccounts', [])
        const currentNetwork = await provider.getNetwork()
        const tokenContract = await loadTokenContract(provider)
        const gameContract = await loadGameContract(provider)
        const ensName = await fetchEnsName(account[0])
        setTokenContract(tokenContract)
        setGameContract(gameContract)
        setNetwork(currentNetwork)
        setAccount(account[0])
        setProvider(provider)
        setEnsName(ensName)
        toast.update(toaster, {
          render: 'Complete!',
          type: toast.TYPE.SUCCESS,
          autoClose: 500,
          isLoading: false,
          ...DEFAULT_TOAST_OPTS,
        })
        setIsConnecting(false)
        setIsConnected(true)
      } catch (err) {
        console.error(err)
        toast.update(toaster, {
          render: 'An error occured',
          type: toast.TYPE.ERROR,
          autoClose: 2000,
          isLoading: false,
          ...DEFAULT_TOAST_OPTS,
        })
      }
    }
  }

  const handleAccountChange = async (accounts) => {
    console.log('ACCOUNT CHANGE EVENT')
    if (accounts?.[0] !== account) {
      setAccount(account[0])
    }
    if (accounts.length === 0) {
      handleDisconnect()
    }
  }

  const handleChainChange = () => {
    console.log('CHAIN CHANGE EVENT')
    if (window?.location) {
      window.location.reload()
    }
  }
  const handleDisconnect = () => {
    setIsConnected(false)
    setEnsName('')
    setNetwork(null)
    setAccount(null)
    setProvider(null)
  }

  const loadTokenContract = (provider) => {
    const contract = new ethers.Contract(
      FWEB3_TOKEN_ADDRESS,
      fweb3TokenInterface.abi,
      provider
    )
    return contract
  }

  const loadGameContract = (provider) => {
    const contract = new ethers.Contract(
      FWEB3_GAME_ADDRESS,
      fweb3GameInterface.abi,
      provider
    )
    return contract
  }

  const fetchEnsName = async (account) => {
    if (account) {
      const provider = new ethers.providers.AlchemyProvider(
        'homestead',
        process.env.NEXT_PUBLIC_ALCHEMY_KEY
      )
      const ensName = await provider.lookupAddress(account)
      return ensName
    }
  }

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountChange)
      window.ethereum.on('chainChanged', handleChainChange)
      window.ethereum.on('disconnect', handleDisconnect)
    }
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange)
      window.ethereum.removeListener('chainChanged', handleChainChange)
      window.ethereum.removeListener('disconnect', handleDisconnect)
    }
  }, []) // eslint-disable-line

  return (
    <ConnectionContext.Provider
      value={{
        isConnected,
        isConnecting,
        connect,
        account,
        provider,
        network,
        tokenContract,
        gameContract,
        ensName,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

const useConnection = () => useContext(ConnectionContext)

export { useConnection, ConnectionProvider }
