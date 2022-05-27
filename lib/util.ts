import { ethers } from 'ethers'

// eslint-disable-next-line
export const fetcher = async (uri: string, config = {}): Promise<any> => {
  const res = await fetch(uri, config)
  return res.json()
}

export const parseBalance = (
  value: string,
  decimals = 18,
  decimalsToDisplay = 0
): string => {
  return ethers.utils.commify(
    parseFloat(ethers.utils.formatUnits(value, decimals)).toFixed(
      decimalsToDisplay
    )
  )
}

export const parseBalanceToNum = (
  value: string,
  decimals = 18,
  decimalsToDisplay = 0
): number =>
  parseInt(
    parseFloat(ethers.utils.formatUnits(value, decimals)).toFixed(
      decimalsToDisplay
    )
  )

export const sleep = (milliseconds: number): void => {
  const date: number = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}
