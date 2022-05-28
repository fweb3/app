declare let window: any // eslint-disable-line

import { createContext, useContext, useEffect, useState } from 'react'
import type { IComponentProps } from '../components/component'
import { createAlchemyProvider } from '../interfaces'
// eslint-disable-next-line
import type { GameError } from '../interfaces/game'
import { useEthers } from './EthersProvider'
import { useRouter } from 'next/router'
import { logger } from '../lib'

interface IAccountContext {
  ensName: string
  displayName: string
  queryDisplayName: string
  queryAccount: string
  isQueryLoad: boolean
  account: string
}

const defaultConnectionContext: IAccountContext = {
  ensName: '',
  displayName: '',
  queryDisplayName: '',
  isQueryLoad: false,
  queryAccount: '',
  account: '',
}

const AccountContext = createContext<IAccountContext>(defaultConnectionContext)

const USE_LIVE_ENS = false

const AccountProvider = ({ children }: IComponentProps) => {
  const [queryDisplayName, setQueryDisplayName] = useState<string>('')
  const [isQueryLoad, setIsQueryLoad] = useState<boolean>(false)
  const [queryAccount, setQueryAccount] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const { account } = useEthers()
  const { query } = useRouter()

  const fetchEnsName = async (): Promise<string> => {
    if (USE_LIVE_ENS) {
      const provider = await createAlchemyProvider('homestead')
      const ensName: string = (await provider.lookupAddress(account)) || ''
      ensName && logger.log(`[+] found ens: ${ensName}`)
      return ensName
    }
    logger.log('[+] skipping ens')
    return ''
  }

  useEffect(() => {
    ;(async () => {
      try {
        const queryAccount = query?.account?.toString()
        if (queryAccount) {
          setIsQueryLoad(!!queryAccount)
          setQueryAccount(queryAccount)
          setQueryDisplayName(`${queryAccount?.substring(0, 6)}...`)
        } else {
          const ensName = await fetchEnsName()
          const displayName = ensName ?? `${account.substring(0, 6)}...`
          setDisplayName(displayName)
          setEnsName(ensName)
        }
      } catch (err: GameError) {
        console.error(err.message)
      }
    })()
  }, [query, account]) // eslint-disable-line

  return (
    <AccountContext.Provider
      value={{
        ensName,
        displayName,
        queryDisplayName,
        isQueryLoad,
        queryAccount,
        account,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

const useAccount = () => useContext(AccountContext)

export { useAccount, AccountProvider }
