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
}
