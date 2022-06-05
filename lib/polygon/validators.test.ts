import { checkHasWonGame, currentWalletGameState } from './validators'
import mockWalletBalance from './__fixtures__/walletBalance.json'
import mockWalletTxs from './__fixtures__/walletsTxs.json'
import mockTrophyTx from './__fixtures__/trophyTsx.json'
import mockErc20Txs from './__fixtures__/erc20Txs.json'
import mockNftsTxs from './__fixtures__/nftsTx.json'
import {
  fetchTrophyTransactions,
  fetchWalletTokenBalance,
  fetchWalletsTxs,
  fetchWalletsInternalTxs,
  fetchERC20Txs,
  fetchMaticBalance,
  fetchNftsTxs,
} from './api'

jest.unmock('../../interfaces/addresses')
jest.mock('./api')

const MOCK_WALLET = '0xb15A3D29eFe51baaC8d3cd2f4F747B843FeAdA7d'

describe('game validators', () => {
  it('returns null if not a winner', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    jest.mocked(fetchTrophyTransactions).mockResolvedValueOnce({ result: [] })
    // eslint-disable-next-line
    // @ts-ignore
    jest.mocked(fetchWalletTokenBalance).mockResolvedValueOnce({ result: [] })

    const res = await checkHasWonGame(137, MOCK_WALLET)
    expect(res).toBeNull()
  })
  it('validates a winner has won', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    jest.mocked(fetchTrophyTransactions).mockResolvedValueOnce(mockTrophyTx)
    jest
      .mocked(fetchWalletTokenBalance)
      .mockResolvedValueOnce(mockWalletBalance)
    const res = await checkHasWonGame(137, MOCK_WALLET)
    expect(res).toEqual({
      hasBurnedTokens: true,
      hasDeployedContract: true,
      hasEnoughTokens: true,
      hasMintedNFT: true,
      hasSentTokens: true,
      hasSwappedTokens: true,
      hasUsedFaucet: true,
      hasVotedInPoll: true,
      hasWonGame: true,
      maticBalance: '',
      tokenBalance: '33867000000000000000000',
      trophyId: '19',
    })
  })

  it('gets a wallets game state', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    jest.mocked(fetchWalletsTxs).mockResolvedValueOnce(mockWalletTxs)
    // eslint-disable-next-line
    // @ts-ignore
    jest.mocked(fetchWalletsInternalTxs).mockResolvedValueOnce(mockWalletTxs)
    // eslint-disable-next-line
    // @ts-ignore
    jest.mocked(fetchNftsTxs).mockResolvedValueOnce(mockNftsTxs)
    jest.mocked(fetchERC20Txs).mockResolvedValueOnce(mockErc20Txs)
    jest
      .mocked(fetchWalletTokenBalance)
      .mockResolvedValueOnce(mockWalletBalance)
    jest
      .mocked(fetchMaticBalance)
      .mockResolvedValue({ result: { balance: '123' } })

    const res = await currentWalletGameState(137, MOCK_WALLET)
    expect(res).toBeTruthy()
  })
})
