import { DEFAULT_WON_GAME_STATE } from '../constants'
import { getAddress } from 'ethers/lib/utils'
import { ethers } from 'ethers'
import type {
  IAPIRequest,
  IPolygonBalanceResponse,
  IPolygonData,
  IPolygonDataResponse,
  IRequestValidationResponse,
} from './index.d'

import { loadAddress } from '../../interfaces'
import {
  fetchTrophyTransactions,
  fetchWalletTokenBalance,
  fetchWalletsTxs,
  fetchWalletsInternalTxs,
  fetchERC20Txs,
  fetchNftsTxs,
} from './api'

import { IGameTaskState } from '../../interfaces/game'

export const validateRequest = (
  req: IAPIRequest
): IRequestValidationResponse => {
  try {
    const { wallet_address: walletAddress, debug } = req.query
    if (req.method !== 'GET') {
      return {
        error: 'Bad request type',
        status: 400,
      }
    } else if (!debug && !walletAddress) {
      return {
        error: 'Missing query params',
        status: 400,
      }
    }
    // ethers.utils throws if bad address
    getAddress(walletAddress)
    return {
      status: 200,
      error: null,
    }
  } catch (e) {
    const error = e.message.includes('invalid address')
      ? 'Malformatted address'
      : 'An unknown error occured'
    return {
      status: 400,
      error,
    }
  }
}

export const checkHasWonGame = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchTrophyTransactions(
    walletAddress
  )
  const { result: trophyTxs }: { result: IPolygonData[] } = rawResult
  const tokenBalance: string = await _walletBalance(walletAddress)
  const genesysAddress = loadAddress('genesys')
  const trophy =
    trophyTxs?.filter((tx) => tx.from === genesysAddress[0])[0] || null

  if (!trophy) {
    return null
  }
  const formattedBal = ethers.utils.commify(
    ethers.utils.formatEther(tokenBalance)
  )
  return {
    ...DEFAULT_WON_GAME_STATE,
    tokenBalance: formattedBal,
    hasWonGame: true,
    trophyId: trophy.tokenID,
  }
}

export const currentWalletGameState = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const walletTxCompletedItems: IGameTaskState =
    await _checkWalletTxCompletedItems(walletAddress)
  const erc20CompletedItems: IGameTaskState = await _checkERC20CompletedItems(
    walletAddress
  )
  const tokenBalance: string = await _walletBalance(walletAddress)
  return {
    ...walletTxCompletedItems,
    ...erc20CompletedItems,
    tokenBalance,
    hasEnoughTokens: parseInt(tokenBalance) >= 100,
    hasMintedNFT: await _checkHasMintedNTF(walletAddress),
  }
}

export const _walletBalance = async (
  walletAddress: string
): Promise<string> => {
  const rawResult: IPolygonBalanceResponse = await fetchWalletTokenBalance(
    walletAddress
  )
  const { result: walletBalance }: { result: string } = rawResult
  return walletBalance ? walletBalance : '0'
}

export const _checkHasMintedNTF = async (
  walletAddress: string
): Promise<boolean> => {
  const rawResult: IPolygonDataResponse = await fetchNftsTxs(walletAddress)
  const { result: nftsTx }: { result: IPolygonData[] } = rawResult
  const genesysAddress = loadAddress('genesys')
  return nftsTx?.filter((tx) => tx.from === genesysAddress[0]).length >= 1
}

const _checkWalletTxCompletedItems = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchWalletsTxs(walletAddress)
  const rawResult2: IPolygonDataResponse = await fetchWalletsInternalTxs(
    walletAddress
  )
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

// FIX ME check both matic and fweb3 faucets
const _checkHasUsedFweb3Faucet = (walletsTxs: IPolygonData[]): boolean => {
  const fweb3FaucetAddresses = loadAddress('fweb3_token_faucet')

  return (
    walletsTxs?.filter((tx) =>
      fweb3FaucetAddresses
        .map((i) => i.toLowerCase())
        .includes(tx.to.toLowerCase())
    ).length >= 1
  )
}

const _checkHasUsedMaticFaucet = (walletsTxs: IPolygonData[]): boolean => {
  const maticFaucetAddresses = loadAddress('fweb3_matic_faucet')

  return (
    walletsTxs?.filter((tx) =>
      maticFaucetAddresses
        .map((i) => i.toLowerCase())
        .includes(tx.from.toLowerCase())
    ).length >= 1
  )
}

const _checkHasSwappedTokens = (walletsTxs: IPolygonData[]): boolean => {
  const swapAddress = loadAddress('swap_router')
  return (
    walletsTxs?.filter(
      (tx) => tx.to.toLowerCase() === swapAddress[0].toLowerCase()
    ).length >= 1
  )
}
const _checkHasDeployedContract = (walletsTxs: IPolygonData[]): boolean => {
  return walletsTxs?.filter((tx) => tx.to === '').length >= 1
}

const _checkHasVotedInPoll = (walletsTxs: IPolygonData[]): boolean => {
  const pollAddress = loadAddress('fweb3_poll')
  return (
    walletsTxs?.filter(
      (tx) => tx.to.toLowerCase() === pollAddress[0].toLowerCase()
    ).length >= 1
  )
}

const _checkERC20CompletedItems = async (
  walletAddress: string
): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchERC20Txs(walletAddress)
  const { result: erc20Txs }: { result: IPolygonData[] } = rawResult
  return {
    hasSentTokens: _validateHasSentTokens(erc20Txs, walletAddress),
    hasBurnedTokens: _validateHasBurnedTokens(erc20Txs, walletAddress),
  }
}

const _validateHasSentTokens = (
  txs: IPolygonData[],
  walletAddress: string
): boolean => {
  const found: IPolygonData[] = txs?.filter((tx) => {
    return (
      tx.value &&
      tx.from.toLowerCase() === walletAddress.toLowerCase() &&
      parseInt(tx.value) >= 100 * 10 ** 18
    )
  })
  return found?.length >= 1
}

const _validateHasBurnedTokens = (
  txs: IPolygonData[],
  walletAddress: string
): boolean => {
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
