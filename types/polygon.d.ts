export interface IPolygonAPIResponse {
  status: string
  message: string
  result: IPolygonData[] | string
}

export interface IPolygonData {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  from: string
  contractAddress: string
  to: string
  value: string
  tokenID?: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  gas: string
  gasPrice: string
  cumulativeGasUsed: string
  input: string
  confirmations: string
}
