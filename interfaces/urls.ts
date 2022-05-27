const POLYGON_BASE_OPENSEA_URL = 'https://opensea.io'
const MUMBAI_BASE_OPENSEA_URL = 'https://mumbai.polygonscan.com'

const POLYGON_OPENSEA_URL = `${POLYGON_BASE_OPENSEA_URL}/assets/matic`
const MUMBAI_OPEANSEA_URL = `${MUMBAI_BASE_OPENSEA_URL}/assets`

const POLYGONSCAN_URL = 'https://polygonscan.com/address'
const MUMBAI_POLYGONSCAN_URL = 'https://mumbai.polygonscan.com/address'

export const getPolygonscanUrl = (address: string, network: string): string => {
  if (network !== 'polygon') {
    return `${MUMBAI_POLYGONSCAN_URL}/${address}`
  }
  return `${POLYGONSCAN_URL}/${address}`
}

export const getOpenseaUrl = (address: string, network: string): string => {
  if (network !== 'polygon') {
    return `${MUMBAI_OPEANSEA_URL}/?search[chains][0]=MUMBAI&search[query]=${address}[resultModel]=ASSETS`
  }
  return `${POLYGON_OPENSEA_URL}/${address}`
}

export const getOpensealAccountUrl = (network: string): string => {
  if (network !== 'polygon') {
    return `${MUMBAI_BASE_OPENSEA_URL}/account`
  }
  return `${POLYGON_BASE_OPENSEA_URL}/account`
}

export const getUniswapUrl = (): string => {
  return 'https://app.uniswap.org/#/swap?chain=polygon'
}

export const getFaucetUrl = (): string => {
  return 'https://fweb3-faucet.vercel.app'
}

export const getDiscordUrl = (): string => {
  return 'https://discord.gg/pNSFNfyVxA'
}

export const getWalkthroughUrl = (): string => {
  return 'https://fweb3.notion.site/Walkthrough-8ac4fc0d3b814a068767c86d63fd8fb7'
}

export const getGithubUrl = (): string => {
  return 'https://github.com/fweb3'
}
