import type {
  IPolygonBalanceResponse,
  IPolygonData,
  IPolygonDataResponse,
} from './index.d'
import { IGameTaskState } from '../../types/game'
import { DEFAULT_WON_GAME_STATE } from '../constants'
import { loadAddress } from '../../interfaces'
import {
  fetchTrophyTransactions,
  fetchWalletTokenBalance,
  fetchWalletsTxs,
  fetchWalletsInternalTxs,
  fetchERC20Txs,
  fetchNftsTxs,
  fetchMaticBalance,
} from './api'

export const checkHasWonGame = async (
  chainId: number,
  account: string
): Promise<IGameTaskState | null> => {
  const rawResult = await fetchTrophyTransactions(chainId, account)
  const { result: trophyTxs } = rawResult
  const tokenBalance = await _walletBalance(chainId, account)
  const genesysAddress = loadAddress(chainId, 'genesys')
  const trophy =
    trophyTxs?.filter((tx) => tx.from === genesysAddress[0])[0] || null

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

export const currentWalletGameState = async (
  chainId: number,
  account: string
): Promise<IGameTaskState> => {
  const walletTxCompletedItems: IGameTaskState =
    await _checkWalletTxCompletedItems(chainId, account)
  const erc20CompletedItems = await _checkERC20CompletedItems(chainId, account)
  const tokenBalance = await _walletBalance(chainId, account)
  const maticBalance = await _maticBalance(chainId, account)
  return {
    ...walletTxCompletedItems,
    ...erc20CompletedItems,
    tokenBalance,
    hasEnoughTokens: parseInt(tokenBalance) >= 100,
    hasMintedNFT: await _checkHasMintedNTF(chainId, account),
    maticBalance,
  }
}

export const _maticBalance = async (
  chainId: number,
  account: string
): Promise<string> => {
  const { result } = await fetchMaticBalance(chainId, account)
  return result ?? '0'
}

export const _walletBalance = async (
  chainId: number,
  account: string
): Promise<string> => {
  const rawResult: IPolygonBalanceResponse = await fetchWalletTokenBalance(
    chainId,
    account
  )
  const { result: walletBalance }: { result: string } = rawResult
  return walletBalance ?? '0'
}

export const _checkHasMintedNTF = async (
  chainId: number,
  account: string
): Promise<boolean> => {
  const rawResult: IPolygonDataResponse = await fetchNftsTxs(chainId, account)
  const { result: nftsTx }: { result: IPolygonData[] } = rawResult
  const genesysAddress = loadAddress(chainId, 'genesys')
  return nftsTx?.filter((tx) => tx.from === genesysAddress[0]).length >= 1
}

const _checkWalletTxCompletedItems = async (
  chainId: number,
  walletAddress: string
): Promise<IGameTaskState> => {
  const rawResult: IPolygonDataResponse = await fetchWalletsTxs(
    chainId,
    walletAddress
  )
  const rawResult2: IPolygonDataResponse = await fetchWalletsInternalTxs(
    chainId,
    walletAddress
  )
  const { result: walletsTxs }: { result: IPolygonData[] } = rawResult
  const { result: walletsInternalTxs }: { result: IPolygonData[] } = rawResult2
  return {
    hasEnoughTokens: _checkHasUsedFweb3Faucet(chainId, walletsTxs),
    hasUsedFaucet: _checkHasUsedMaticFaucet(chainId, walletsInternalTxs),
    hasSwappedTokens: _checkHasSwappedTokens(chainId, walletsTxs),
    hasDeployedContract: _checkHasDeployedContract(walletsTxs),
    hasVotedInPoll: _checkHasVotedInPoll(chainId, walletsTxs),
  }
}

const _checkHasUsedFweb3Faucet = (
  chainId: number,
  walletsTxs: IPolygonData[]
): boolean => {
  const fweb3FaucetAddresses = loadAddress(chainId, 'fweb3_token_faucet')

  return (
    walletsTxs?.filter((tx) =>
      fweb3FaucetAddresses
        .map((i) => i.toLowerCase())
        .includes(tx.to.toLowerCase())
    ).length >= 1
  )
}

const _checkHasUsedMaticFaucet = (
  chainId: number,
  walletsTxs: IPolygonData[]
): boolean => {
  const maticFaucetAddresses = loadAddress(chainId, 'fweb3_matic_faucet')

  return (
    walletsTxs?.filter((tx) =>
      maticFaucetAddresses
        .map((i) => i.toLowerCase())
        .includes(tx.from.toLowerCase())
    ).length >= 1
  )
}

const _checkHasSwappedTokens = (
  chainId: number,
  walletsTxs: IPolygonData[]
): boolean => {
  const swapAddress = loadAddress(chainId, 'swap_router')
  return (
    walletsTxs?.filter(
      (tx) => tx.to.toLowerCase() === swapAddress[0].toLowerCase()
    ).length >= 1
  )
}
const _checkHasDeployedContract = (walletsTxs: IPolygonData[]): boolean => {
  return walletsTxs?.filter((tx) => tx.to === '').length >= 1
}

const _checkHasVotedInPoll = (
  chainId: number,
  walletsTxs: IPolygonData[]
): boolean => {
  const pollAddress = loadAddress(chainId, 'fweb3_poll')
  return (
    walletsTxs?.filter(
      (tx) => tx.to.toLowerCase() === pollAddress[0].toLowerCase()
    ).length >= 1
  )
}

const _checkERC20CompletedItems = async (
  chainId: number,
  walletAddress: string
): Promise<IGameTaskState> => {
  const { result: erc20Txs }: IPolygonDataResponse = await fetchERC20Txs(
    chainId,
    walletAddress
  )
  return {
    hasSentTokens: _validateHasSentTokens(erc20Txs, walletAddress),
    hasBurnedTokens: _validateHasBurnedTokens(chainId, erc20Txs, walletAddress),
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
  chainId: number,
  txs: IPolygonData[],
  walletAddress: string
): boolean => {
  const found: IPolygonData[] = txs?.filter((tx) => {
    const burnAddress = loadAddress(chainId, 'burn')
    return (
      tx.value &&
      tx.from.toLowerCase() === walletAddress.toLowerCase() &&
      tx.to.toLowerCase() === burnAddress[0].toLowerCase() &&
      parseInt(tx.value) > 0
    )
  })
  return found?.length >= 1
}
