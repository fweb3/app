import type { IPolygonAPIResponse } from '../../types'
import { fetcher, sleep } from '../util'
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  walletsInternalTxsURI,
  erc20TxsURI,
  nftTxsURI,
  walletMaticBalanceURI,
} from './endpoints'

// Because of our polygon rate limiting we need to
// Sleep for 200ms between calls - totaling ~1s

export const fetchMaticBalance = async (
  chainId: number,
  walletAddress: string
) => {
  sleep(200)
  return fetcher(walletMaticBalanceURI(chainId, walletAddress))
}

export const fetchWalletTokenBalance = async (
  chainId: number,
  walletAddress: string
): Promise<IPolygonAPIResponse> => {
  sleep(200)
  return fetcher(
    walletsTokenBalanceURI(chainId, walletAddress)
  ) as Promise<IPolygonAPIResponse>
}

export const fetchTrophyTransactions = async (
  chainId: number,
  walletAddress: string
): Promise<IPolygonAPIResponse> => {
  sleep(200)
  return fetcher(
    trophyCheckURI(chainId, walletAddress)
  ) as Promise<IPolygonAPIResponse>
}

export const fetchWalletsTxs = async (
  chainId: number,
  walletAddress: string
): Promise<IPolygonAPIResponse> => {
  sleep(200)
  return fetcher(
    walletsTxsURI(chainId, walletAddress)
  ) as Promise<IPolygonAPIResponse>
}

export const fetchWalletsInternalTxs = async (
  chainId: number,
  walletAddress: string
): Promise<IPolygonAPIResponse> => {
  sleep(200)
  return fetcher(
    walletsInternalTxsURI(chainId, walletAddress)
  ) as Promise<IPolygonAPIResponse>
}

export const fetchERC20Txs = async (
  chainId: number,
  walletAddress: string
): Promise<IPolygonAPIResponse> => {
  sleep(200)
  return fetcher(
    erc20TxsURI(chainId, walletAddress)
  ) as Promise<IPolygonAPIResponse>
}

export const fetchNftsTxs = async (
  chainId: number,
  walletAddress: string
): Promise<IPolygonAPIResponse> => {
  sleep(200)
  return fetcher(
    nftTxsURI(chainId, walletAddress)
  ) as Promise<IPolygonAPIResponse>
}
