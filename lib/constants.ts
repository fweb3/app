import type { IAppColors, IGameTaskState } from "../types";

export const NEXT_PUBLIC_DEBUG_ENABLE_DOTS =
  process.env.NEXT_PUBLIC_DEBUG_ENABLE_DOTS;
export const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const DEBUG_ENABLE = process.env.DEBUG_ENABLE;

export const COLORS: IAppColors = {
  pinkish: "#ff95ee",
};

export const DEFAULT_GAME_STATE: IGameTaskState = {
  tokenBalance: "0",
  hasEnoughTokens: false,
  hasUsedFaucet: false,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
  trophyId: "0",
};

export const DEFAULT_WON_GAME_STATE: IGameTaskState = {
  tokenBalance: "0",
  hasEnoughTokens: true,
  hasUsedFaucet: true,
  hasSwappedTokens: true,
  hasVotedInPoll: true,
  hasDeployedContract: true,
  hasSentTokens: true,
  hasBurnedTokens: true,
  hasMintedNFT: true,
  trophyId: "0",
};

export const GAME_TASKS: string[] = [
  null, // Naturalize Index
  "hasEnoughTokens",
  "hasEnoughTokens",
  "hasUsedFaucet",
  "hasSentTokens",
  "hasMintedNFT",
  "hasBurnedTokens",
  "hasSwappedTokens",
  "hasVotedInPoll",
  "hasDeployedContract",
];
