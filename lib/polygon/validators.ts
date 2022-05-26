import { IGameTaskState } from '../../interfaces/game'
import { DEFAULT_WON_GAME_STATE, DEFAULT_GAME_STATE } from '../constants'
import { loadAddress } from '../../interfaces'
import { ethers } from 'ethers'
import type { IPolygonBalanceResponse, IPolygonData, IPolygonDataResponse } from './index.d'
import {
  fetchTrophyTransactions,
  fetchWalletTokenBalance,
  fetchWalletsTxs,
  fetchWalletsInternalTxs,
  fetchERC20Txs,
  fetchNftsTxs,
  fetchMaticBalance,
} from './api'

export const checkHasWonGame = async (account: string): Promise<IGameTaskState | null> => {
  const rawResult: IPolygonDataResponse = await fetchTrophyTransactions(account)
  const { result: trophyTxs }: { result: IPolygonData[] } = rawResult
  const tokenBalance: string = await _walletBalance(account)
  const genesysAddress = loadAddress('genesys')
  const trophy = trophyTxs?.filter((tx) => tx.from === genesysAddress[0])[0] || null

  if (!trophy) {
    return null
  }

  return {
    ...DEFAULT_WON_GAME_STATE,
    tokenBalance,
    hasWonGame: true,
    trophyId: trophy.tokenID?.toString(),
  }
}

export const currentWalletGameState = async (account: string): Promise<IGameTaskState> => {
  const walletTxCompletedItems: IGameTaskState = await _checkWalletTxCompletedItems(account)
  const erc20CompletedItems: IGameTaskState = await _checkERC20CompletedItems(account)
  const tokenBalance: string = await _walletBalance(account)
  const maticBalance: string = await _maticBalance(account)
  return {
    ...walletTxCompletedItems,
    ...erc20CompletedItems,
    tokenBalance,
    hasEnoughTokens: parseInt(tokenBalance) >= 100,
    hasMintedNFT: await _checkHasMintedNTF(account),
    maticBalance,
  }
}

export const _maticBalance = async (account: string) => {
  const { result } = await fetchMaticBalance(account)
  return result ?? '0'
}

export const _walletBalance = async (account: string): Promise<string> => {
  const rawResult: IPolygonBalanceResponse = await fetchWalletTokenBalance(account)
  const { result: walletBalance }: { result: string } = rawResult
  return walletBalance ?? '0'
}

export const _checkHasMintedNTF = async (account: string): Promise<boolean> => {
  const rawResult: IPolygonDataResponse = await fetchNftsTxs(account)
  const { result: nftsTx }: { result: IPolygonData[] } = rawResult
  const genesysAddress = loadAddress('genesys')
  return nftsTx?.filter((tx) => tx.from === genesysAddress[0]).length >= 1
}

const _checkWalletTxCompletedItems = async (walletAddress: string): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchWalletsTxs(walletAddress)
  const rawResult2: IPolygonDataResponse = await fetchWalletsInternalTxs(walletAddress)
  const { result: walletsTxs }: { result: IPolygonData[] } = rawResult
  const { result: walletsInternalTxs }: { result: IPolygonData[] } = rawResult2
  return {
    hasEnoughTokens: _checkHasUsedFweb3Faucet(walletsTxs),
    hasUsedFaucet: _checkHasUsedMaticFaucet(walletsInternalTxs),
    hasSwappedTokens: _checkHasSwappedTokens(walletsTxs),
    hasDeployedContract: _checkHasDeployedContract(walletsTxs),
    hasVotedInPoll: _checkHasVotedInPoll(walletsTxs),
  }
}

const _checkHasUsedFweb3Faucet = (walletsTxs: IPolygonData[]): boolean => {
  const fweb3FaucetAddresses = loadAddress('fweb3_token_faucet')

  return (
    walletsTxs?.filter((tx) =>
      fweb3FaucetAddresses.map((i) => i.toLowerCase()).includes(tx.to.toLowerCase())
    ).length >= 1
  )
}

const _checkHasUsedMaticFaucet = (walletsTxs: IPolygonData[]): boolean => {
  const maticFaucetAddresses = loadAddress('fweb3_matic_faucet')

  return (
    walletsTxs?.filter((tx) =>
      maticFaucetAddresses.map((i) => i.toLowerCase()).includes(tx.from.toLowerCase())
    ).length >= 1
  )
}

const _checkHasSwappedTokens = (walletsTxs: IPolygonData[]): boolean => {
  const swapAddress = loadAddress('swap_router')
  return (
    walletsTxs?.filter((tx) => tx.to.toLowerCase() === swapAddress[0].toLowerCase()).length >= 1
  )
}
const _checkHasDeployedContract = (walletsTxs: IPolygonData[]): boolean => {
  return walletsTxs?.filter((tx) => tx.to === '').length >= 1
}

const _checkHasVotedInPoll = (walletsTxs: IPolygonData[]): boolean => {
  const pollAddress = loadAddress('fweb3_poll')
  return (
    walletsTxs?.filter((tx) => tx.to.toLowerCase() === pollAddress[0].toLowerCase()).length >= 1
  )
}

const _checkERC20CompletedItems = async (walletAddress: string): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchERC20Txs(walletAddress)
  const { result: erc20Txs }: { result: IPolygonData[] } = rawResult
  return {
    hasSentTokens: _validateHasSentTokens(erc20Txs, walletAddress),
    hasBurnedTokens: _validateHasBurnedTokens(erc20Txs, walletAddress),
  }
}

const _validateHasSentTokens = (txs: IPolygonData[], walletAddress: string): boolean => {
  const found: IPolygonData[] = txs?.filter((tx) => {
    return (
      tx.value &&
      tx.from.toLowerCase() === walletAddress.toLowerCase() &&
      parseInt(tx.value) >= 100 * 10 ** 18
    )
  })
  return found?.length >= 1
}

const _validateHasBurnedTokens = (txs: IPolygonData[], walletAddress: string): boolean => {
  const found: IPolygonData[] = txs?.filter((tx) => {
    const burnAddress = loadAddress('burn')
    return (
      tx.value &&
      tx.from.toLowerCase() === walletAddress.toLowerCase() &&
      tx.to.toLowerCase() === burnAddress[0].toLowerCase() &&
      parseInt(tx.value) > 0
    )
  })
  return found?.length >= 1
}
