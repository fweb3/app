import * as endpoints from './endpoints'

const ACTIONS = {
  balance: '&action=balance',
  tokenBalance: '&action=tokenbalance',
  tokenNftTx: '&action=tokennfttx',
  txList: '&action=txlist',
  internalTx: '&action=txlistinternal',
  tokenTx: '&action=tokentx',
}

jest.mock('../../interfaces/addresses', () => ({
  loadAddress: () => ['foobarbaz'],
}))

const POLYGON_API_URL = 'api.polygonscan.com'
const MUMBAI_API_URL = 'api-testnet.polygonscan.com'
describe('polygon api endpoints', () => {
  it('gets wallet balance uri', () => {
    const mainnet = endpoints.walletMaticBalanceURI(137, 'account')
    expect(mainnet.includes(ACTIONS.balance)).toBeTruthy()
    expect(mainnet.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.walletMaticBalanceURI(80001, 'account')
    expect(testnet.includes(ACTIONS.balance)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })

  it('gets token balance uri', () => {
    const mainnet = endpoints.walletsTokenBalanceURI(137, 'account')
    expect(mainnet.includes(ACTIONS.tokenBalance)).toBeTruthy()
    expect(mainnet.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.walletsTokenBalanceURI(80001, 'account')
    expect(testnet.includes(ACTIONS.tokenBalance)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })

  it('gets trophy check uri', () => {
    const mainnet = endpoints.trophyCheckURI(137, 'account')
    expect(mainnet.includes(ACTIONS.tokenNftTx)).toBeTruthy()
    expect(mainnet.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.trophyCheckURI(80001, 'account')
    expect(testnet.includes(ACTIONS.tokenNftTx)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })

  it('gets wallet txs uri', () => {
    const mainnet = endpoints.walletsTxsURI(137, 'account')
    expect(mainnet.includes(ACTIONS.txList)).toBeTruthy()
    expect(mainnet.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.walletsTxsURI(80001, 'account')
    expect(testnet.includes(ACTIONS.txList)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })

  it('gets internal txs uri', () => {
    const actual = endpoints.walletsInternalTxsURI(137, 'account')
    expect(actual.includes(ACTIONS.internalTx)).toBeTruthy()
    expect(actual.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.walletsInternalTxsURI(80001, 'account')
    expect(testnet.includes(ACTIONS.internalTx)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })

  it('gets erc20 txs uri', () => {
    const actual = endpoints.erc20TxsURI(137, 'account')
    expect(actual.includes(ACTIONS.tokenTx)).toBeTruthy()
    expect(actual.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.erc20TxsURI(80001, 'account')
    expect(testnet.includes(ACTIONS.tokenTx)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })

  it('gets nft txs uri', () => {
    const actual = endpoints.nftTxsURI(137, 'account')
    expect(actual.includes(ACTIONS.tokenNftTx)).toBeTruthy()
    expect(actual.includes(POLYGON_API_URL)).toBeTruthy()

    const testnet = endpoints.nftTxsURI(80001, 'account')
    expect(testnet.includes(ACTIONS.tokenNftTx)).toBeTruthy()
    expect(testnet.includes(MUMBAI_API_URL)).toBeTruthy()
  })
})
