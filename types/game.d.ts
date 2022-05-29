import { EthereumRpcError } from 'eth-rpc-errors'

export type GameError = Err | EthereumRpcError

export interface Err {
  message?: string
}

interface IBalances {
  maticBalance: string
  tokenbalance: string
}
export interface IGameTaskState {
  tokenBalance?: string
  maticBalance?: string
  trophyId?: string
  hasEnoughTokens?: boolean
  hasUsedFaucet?: boolean
  hasSwappedTokens?: boolean
  hasVotedInPoll?: boolean
  hasDeployedContract?: boolean
  hasSentTokens?: boolean
  hasBurnedTokens?: boolean
  hasMintedNFT?: boolean
  hasWonGame?: boolean
  isConnected?: boolean
}
