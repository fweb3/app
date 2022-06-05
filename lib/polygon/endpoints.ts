import { loadAddress } from './../../interfaces/addresses'
import { NETWORKS } from './../../types'

const POLYGON_BASE_API_URL = 'https://api.polygonscan.com/api'
const MUMBAI_POLYGONSCAN_API_URL = 'https://api-testnet.polygonscan.com/api'

const { POLYGON_API_KEY } = process.env

// External Endpoints

const _getBaseUrlForChain = (chainId: number) => {
  if (NETWORKS[chainId].toLowerCase() !== 'polygon') {
    return MUMBAI_POLYGONSCAN_API_URL
  }
  return POLYGON_BASE_API_URL
}

export const walletMaticBalanceURI = (
  chainId: number,
  walletAddress: string
) => {
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=balance&address=${walletAddress}&apikey=${POLYGON_API_KEY}`
}

export const walletsTokenBalanceURI = (
  chainId: number,
  walletAddress: string
): string => {
  const fweb3TokenAddress = loadAddress(chainId, 'fweb3_token')[0]
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=tokenbalance&contractaddress=${fweb3TokenAddress}&address=${walletAddress}&tag=latest&apikey=${POLYGON_API_KEY}`
}

export const trophyCheckURI = (
  chainId: number,
  walletAddress: string
): string => {
  const trophyAddress = loadAddress(chainId, 'fweb3_trophy')[0]
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=tokennfttx&contractaddress=${trophyAddress}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const walletsTxsURI = (
  chainId: number,
  walletAddress: string
): string => {
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const walletsInternalTxsURI = (
  chainId: number,
  walletAddress: string
): string => {
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=txlistinternal&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const erc20TxsURI = (chainId: number, walletAddress: string): string => {
  const fweb3TokenAddress = loadAddress(chainId, 'fweb3_token')[0]
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=tokentx&contractaddress=${fweb3TokenAddress}&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const nftTxsURI = (chainId: number, walletAddress: string): string => {
  const diamondNftAddress = loadAddress(chainId, 'fweb3_diamond_nft')[0]
  return `${_getBaseUrlForChain(
    chainId
  )}?module=account&action=tokennfttx&contractaddress=${diamondNftAddress}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`
}
