import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits, commify } from "@ethersproject/units";

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 0
) =>
  commify(parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay));

export const parseBalanceToNum = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 0
) =>
  parseInt(parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay));

export const getTrophyColor = (trophyId: number): string => {
  if (trophyId <= 333) {
    return "gold";
  } else if (trophyId <= 3333) {
    return "silver";
  }
  return "copper";
};