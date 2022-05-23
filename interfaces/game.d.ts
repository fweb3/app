import { ethers } from 'ethers'

export interface IGameTaskState {
  tokenBalance?: string
  hasEnoughTokens?: boolean
  hasUsedFaucet?: boolean
  hasSwappedTokens?: boolean
  hasVotedInPoll?: boolean
  hasDeployedContract?: boolean
  hasSentTokens?: boolean
  hasBurnedTokens?: boolean
  hasMintedNFT?: boolean
  hasWonGame?: boolean
  trophyId?: string
  isConnected?: boolean
  maticBalance?: string
}

export type EthersProvider =
  | ethers.providers.AlchemyProvider
  | ethers.providers.JsonRpcProvider
