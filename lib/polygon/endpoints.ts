import { loadAddress } from './../../interfaces/addresses'

const POLYGON_BASE_API_URL = 'https://api.polygonscan.com/api'

const { POLYGON_API_KEY } = process.env

// External Endpoints

export const walletsTokenBalanceURI = (walletAddress: string): string => {
  const fweb3TokenAddress = loadAddress('fweb3_token')[0]
  return `${POLYGON_BASE_API_URL}?module=account&action=tokenbalance&contractaddress=${fweb3TokenAddress}&address=${walletAddress}&tag=latest&apikey=${POLYGON_API_KEY}`
}

export const trophyCheckURI = (walletAddress: string): string => {
  const trophyAddress = loadAddress('fweb3_trophy')[0]
  return `${POLYGON_BASE_API_URL}?module=account&action=tokennfttx&contractaddress=${trophyAddress}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const walletsTxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_API_URL}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const walletsInternalTxsURI = (walletAddress: string): string => {
  return `${POLYGON_BASE_API_URL}?module=account&action=txlistinternal&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const erc20TxsURI = (walletAddress: string): string => {
  const fweb3TokenAddress = loadAddress('fweb3_token')[0]
  return `${POLYGON_BASE_API_URL}?module=account&action=tokentx&contractaddress=${fweb3TokenAddress}&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${POLYGON_API_KEY}`
}

export const nftTxsURI = (walletAddress: string): string => {
  const diamondNftAddress = loadAddress('fweb3_diamond_nft')[0]
  return `${POLYGON_BASE_API_URL}?module=account&action=tokennfttx&contractaddress=${diamondNftAddress}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_API_KEY}`
}
