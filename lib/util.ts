import { ethers } from "ethers";

export const fetcher = async (uri: string, config = null): Promise<any> => {
  const res = await fetch(uri, config);
  return res.json();
};

export const parseBalance = (
  value: string,
  decimals = 18,
  decimalsToDisplay = 0
): string => {
  return ethers.utils.commify(
    parseFloat(ethers.utils.formatUnits(value, decimals)).toFixed(
      decimalsToDisplay
    )
  );
};

export const parseBalanceToNum = (
  value: string,
  decimals = 18,
  decimalsToDisplay = 0
): number =>
  parseInt(
    parseFloat(ethers.utils.formatUnits(value, decimals)).toFixed(
      decimalsToDisplay
    )
  );

export const getTrophyColor = (trophyId: string): string => {
  const trophyInt = parseInt(trophyId);
  if (trophyInt <= 333) {
    return "gold";
  } else if (trophyInt <= 3333) {
    return "silver";
  }
  return "copper";
};

export const sleep = (milliseconds): void => {
  const date: number = Date.now();
  let currentDate: number = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};
