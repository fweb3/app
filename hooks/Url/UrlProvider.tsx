import { createShareInfo, ISocialShare } from '../Game/social'
import { AllowedChains, IComponentProps } from '../../types'
import { createContext, useEffect, useState } from 'react'
import { useAccount } from '../Account'
import { useEthers } from '../Ethers'
import { useGame } from '../Game'

interface IUrlContext {
  getPolygonscanUrl: (address: string) => string
  getOpenseaUrl: (address: string) => string
  getOpenseaAccountUrl: () => string
  discordUrl: string
  faucetUrl: string
  githubUrl: string
  uniswapUrl: string
  walkthroughUrl: string
  shareInfo: ISocialShare
}

const initShareInfo = {
  imageUrl: 'https://fweb3.xyz/fweb3.png',
  tweetText: '',
  tweetUrl: '',
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
  shareInfo: initShareInfo,
}

const UrlContext = createContext(defaultUrlContext)

const POLYGONSCAN_URL = 'https://polygonscan.com'
const MUMBAI_POLYGONSCAN_URL = 'https://mumbai.polygonscan.com'

const POLYGON_BASE_OPENSEA_URL = 'https://opensea.io'
const MUMBAI_BASE_OPENSEA_URL = 'https://testnets.opensea.io'

const POLYGON_OPENSEA_URL = `${POLYGON_BASE_OPENSEA_URL}/assets/matic`
const MUMBAI_OPEANSEA_URL = `${MUMBAI_BASE_OPENSEA_URL}/assets/mumbai`

const UrlProvider = ({ children }: IComponentProps) => {
  const [shareInfo, setShareInfo] = useState<ISocialShare>(initShareInfo)
  const { trophyColor, trophyId, completedTasks } = useGame()
  const { account } = useAccount()
  const { chainId } = useEthers()
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
      return `${MUMBAI_OPEANSEA_URL}/${address}`
    }
    return `${POLYGON_OPENSEA_URL}/${address}`
  }

  const getOpenseaAccountUrl = (): string => {
    if (chainId !== AllowedChains.POLYGON) {
      return `${MUMBAI_BASE_OPENSEA_URL}/account`
    }
    return `${POLYGON_BASE_OPENSEA_URL}/account`
  }

  useEffect(() => {
    if (account) {
      const shareInfo = createShareInfo(trophyId, trophyColor, completedTasks)
      setShareInfo(shareInfo)
    }
  }, [account, completedTasks, trophyColor, trophyId])

  return (
    <UrlContext.Provider
      value={{
        walkthroughUrl: URLS.walkthroughUrl,
        discordUrl: URLS.discord,
        uniswapUrl: URLS.uniswap,
        faucetUrl: URLS.faucet,
        githubUrl: URLS.github,
        getOpenseaAccountUrl,
        getPolygonscanUrl,
        getOpenseaUrl,
        shareInfo,
      }}
    >
      {children}
    </UrlContext.Provider>
  )
}

export { UrlProvider, UrlContext }
