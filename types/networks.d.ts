export enum AllowedChains {
  LOCAL = 1337,
  MUMBAI = 80001,
  POLYGON = 137,
}

interface INetworks {
  [key: number]: string
}

export const NETWORKS: INetworks = {
  1: 'Ethereum',
  3: 'Ropsten',
  42: 'Kovan',
  137: 'Polygon',
  80001: 'Mumbai',
  1337: 'Local',
  56: 'Binance',
  43114: 'Avalance',
}
