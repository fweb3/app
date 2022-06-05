import { fetcher, sleep } from '../util'
import {
  fetchWalletTokenBalance,
  fetchTrophyTransactions,
  fetchWalletsTxs,
  fetchERC20Txs,
  fetchNftsTxs,
} from './api'
import {
  walletsTokenBalanceURI,
  trophyCheckURI,
  walletsTxsURI,
  erc20TxsURI,
  nftTxsURI,
} from './endpoints'

jest.mock('../util')
jest.mock('./endpoints')

jest.mocked(sleep).mockReturnValue()

afterEach(() => {
  jest.clearAllMocks()
})

describe('polygon api', () => {
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
