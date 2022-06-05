import { IPolygonAPIResponse } from './../../types/polygon.d'
import type { IPolygonData, IGameTaskState } from '../../types'
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

export const lower = (str: string) => str.toLowerCase()

const _responseToResult = ({
  result,
}: IPolygonAPIResponse): IPolygonData[] | [] => {
  if (Array.isArray(result)) {
    return result
  }

  return []
}

export const checkHasWonGame = async (
  chainId: number,
  account: string
): Promise<IGameTaskState | null> => {
  const res = await fetchTrophyTransactions(chainId, account)
  const trophyTxs = _responseToResult(res)
  const tokenBalance = await _walletBalance(chainId, account)
  const genesysAddress = loadAddress(chainId, 'genesys')[0]
  const trophy = trophyTxs?.filter(
    (tx) => lower(tx.from) === lower(genesysAddress)
  )[0]

  if (!trophy || trophy.tokenID === '0') {
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
  const walletTxCompletedItems = await _checkWalletTxCompletedItems(
    chainId,
    account
  )
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
  const { result } = (await fetchMaticBalance(
    chainId,
    account
  )) as IPolygonAPIResponse
  return result.toString() ?? '0'
}

export const _walletBalance = async (
  chainId: number,
  account: string
): Promise<string> => {
  const { result } = await fetchWalletTokenBalance(chainId, account)
  return result.toString() ?? '0'
}

export const _checkHasMintedNTF = async (
  chainId: number,
  account: string
): Promise<boolean> => {
  const res = await fetchNftsTxs(chainId, account)
  const nftsTx = _responseToResult(res)
  const genesysAddress = loadAddress(chainId, 'genesys')[0]
  const found = nftsTx?.filter((tx) => lower(tx.from) === lower(genesysAddress))
  return found?.length >= 1 || false
}

const _checkWalletTxCompletedItems = async (
  chainId: number,
  walletAddress: string
): Promise<IGameTaskState> => {
  const walletsTxsResult = await fetchWalletsTxs(chainId, walletAddress)
  const walletsInternalTxsResult = await fetchWalletsInternalTxs(
    chainId,
    walletAddress
  )

  const walletsTxs = _responseToResult(walletsTxsResult)
  const walletsInternalTxs = _responseToResult(walletsInternalTxsResult)
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
        .map((address) => lower(address))
        .includes(lower(tx.to))
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
        .map((address) => lower(address))
        .includes(lower(tx.from))
    ).length >= 1
  )
}

const _checkHasSwappedTokens = (
  chainId: number,
  walletsTxs: IPolygonData[]
): boolean => {
  const swapAddress = loadAddress(chainId, 'swap_router')[0]
  return (
    walletsTxs?.filter((tx) => lower(tx.to) === lower(swapAddress)).length >= 1
  )
}
const _checkHasDeployedContract = (walletsTxs: IPolygonData[]): boolean => {
  return walletsTxs?.filter((tx) => lower(tx.to) === '').length >= 1
}

const _checkHasVotedInPoll = (
  chainId: number,
  walletsTxs: IPolygonData[]
): boolean => {
  const pollAddress = loadAddress(chainId, 'fweb3_poll')[0]
  return (
    walletsTxs?.filter((tx) => lower(tx.to) === lower(pollAddress)).length >= 1
  )
}

const _checkERC20CompletedItems = async (
  chainId: number,
  walletAddress: string
): Promise<IGameTaskState> => {
  const res = await fetchERC20Txs(chainId, walletAddress)
  const erc20Txs = _responseToResult(res)
  return {
    hasSentTokens: _validateHasSentTokens(erc20Txs, walletAddress),
    hasBurnedTokens: _validateHasBurnedTokens(chainId, erc20Txs, walletAddress),
  }
}

const _validateHasSentTokens = (
  txs: IPolygonData[],
  walletAddress: string
): boolean => {
  const found = txs?.filter((tx) => {
    return (
      tx.value &&
      lower(tx.from) === lower(walletAddress) &&
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
  const burnAddress = loadAddress(chainId, 'burn')[0]
  const found = txs?.filter((tx) => {
    return (
      tx.value &&
      lower(tx.from) === lower(walletAddress) &&
      lower(tx.to) === lower(burnAddress) &&
      parseInt(tx.value) > 0
    )
  })
  return found?.length >= 1
}
