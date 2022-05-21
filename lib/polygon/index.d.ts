export interface IAPIRequest {
  query: IAPIRequestQueryParams
  method?: string
}

interface IPolygonResponseBase {
  status: string
  message: string
  apiCall?: string
}

export interface IPolygonDataResponse extends IPolygonResponseBase {
  result: IPolygonData[]
}

export interface IPolygonBalanceResponse extends IPolygonResponseBase {
  result: string
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

export interface IRequestValidationResponse {
  error?: string
  status: number
}
