import { fetcher, sleep } from '../util'
import {
  fetchMaticBalance,
  fetchWalletTokenBalance,
  fetchTrophyTransactions,
  fetchWalletsInternalTxs,
  fetchWalletsTxs,
  fetchERC20Txs,
  fetchNftsTxs,
} from '../polygon/api'
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  erc20TxsURI,
  nftTxsURI,
  walletMaticBalanceURI,
  walletsInternalTxsURI,
} from '../polygon/endpoints'

jest.mock('../util')
jest.mock('../polygon/endpoints')

jest.mocked(sleep).mockReturnValue()

afterEach(() => {
  jest.clearAllMocks()
})

describe('polygon api', () => {
  it('fetches matic balance', () => {
    jest.mocked(walletMaticBalanceURI).mockReturnValue('matic')
    fetchMaticBalance(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('matic')
  })
  it('fetches token balance', () => {
    jest.mocked(walletsTokenBalanceURI).mockReturnValue('balance')
    fetchWalletTokenBalance(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('balance')
  })
  it('fetches trophy transactions', () => {
    jest.mocked(trophyCheckURI).mockReturnValue('trophy')
    fetchTrophyTransactions(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('trophy')
  })
  it('fetches wallet transactions', () => {
    jest.mocked(walletsTxsURI).mockReturnValue('wallet')
    fetchWalletsTxs(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('wallet')
  })
  it('fetches internal wallet transactions', () => {
    jest.mocked(walletsInternalTxsURI).mockReturnValue('internal')
    fetchWalletsInternalTxs(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('internal')
  })
  it('fetches erc20 transactions', () => {
    jest.mocked(erc20TxsURI).mockReturnValue('erc20')
    fetchERC20Txs(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('erc20')
  })
  it('fetches nft transactions', () => {
    jest.mocked(nftTxsURI).mockReturnValue('nft')
    fetchNftsTxs(137, 'foobar')
    expect(fetcher).toHaveBeenCalledWith('nft')
  })
})
