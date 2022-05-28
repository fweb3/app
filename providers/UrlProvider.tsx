import { IComponentProps } from '../components/component'
import { createContext, useContext } from 'react'
import { useNetwork } from './NetworkProvider'
import { AllowedChains } from './providers.d'

interface IUrlContext {
  getPolygonscanUrl: (address: string) => string
  getOpenseaUrl: (address: string) => string
  getOpenseaAccountUrl: (address: string) => string
  discordUrl: string
  faucetUrl: string
  githubUrl: string
  uniswapUrl: string
  walkthroughUrl: string
}

const defaultUrlContext: IUrlContext = {
  getPolygonscanUrl: () => '',
  getOpenseaUrl: () => '',
  getOpenseaAccountUrl: () => '',
  discordUrl: '',
  faucetUrl: '',
  githubUrl: '',
  uniswapUrl: '',
  walkthroughUrl: '',
}

const UrlContext = createContext(defaultUrlContext)

const POLYGONSCAN_URL = 'https://polygonscan.com/address'
const MUMBAI_POLYGONSCAN_URL = 'https://mumbai.polygonscan.com/address'

const POLYGON_BASE_OPENSEA_URL = 'https://opensea.io'
const MUMBAI_BASE_OPENSEA_URL = 'https://mumbai.polygonscan.com'

const POLYGON_OPENSEA_URL = `${POLYGON_BASE_OPENSEA_URL}/assets/matic`
const MUMBAI_OPEANSEA_URL = `${MUMBAI_BASE_OPENSEA_URL}/assets`

const UrlProvider = ({ children }: IComponentProps) => {
  const { chainId } = useNetwork()

  const URLS = {
    discord: 'https://discord.gg/pNSFNfyVxA',
    faucet: 'https://fweb3-faucet.vercel.app',
    uniswap: 'https://app.uniswap.org/#/swap?chain=polygon',
    walkthroughUrl:
      'https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7',
    github: 'https://github.com/fweb3',
  }

  const getPolygonscanUrl = (address: string) => {
    if (chainId !== AllowedChains.POLYGON) {
      return `${MUMBAI_POLYGONSCAN_URL}/address/${address}`
    }
    return `${POLYGONSCAN_URL}/address/${address}`
  }

  const getOpenseaUrl = (address: string): string => {
    if (chainId !== AllowedChains.POLYGON) {
      return `${MUMBAI_OPEANSEA_URL}/?search[chains][0]=MUMBAI&search[query]=${address}[resultModel]=ASSETS`
    }
    return `${POLYGON_OPENSEA_URL}/${address}`
  }

  const getOpenseaAccountUrl = (): string => {
    if (chainId !== AllowedChains.POLYGON) {
      return `${MUMBAI_BASE_OPENSEA_URL}/account`
    }
    return `${POLYGON_BASE_OPENSEA_URL}/account`
  }

  return (
    <UrlContext.Provider
      value={{
        getPolygonscanUrl,
        getOpenseaUrl,
        getOpenseaAccountUrl,
        discordUrl: URLS.discord,
        faucetUrl: URLS.faucet,
        githubUrl: URLS.github,
        uniswapUrl: URLS.uniswap,
        walkthroughUrl: URLS.walkthroughUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  )
}

const useUrl = () => useContext(UrlContext)

export { UrlProvider, useUrl }
