import { MOCK_WALLET_ADDRESS } from './polygon/__mocks__/mockWalletAddress'
import { fetchCurrentGameState } from './polygon/game'
import polygonApiHandler from '../pages/api/polygon'
import { createMocks } from 'node-mocks-http'

jest.mock('./polygon/game')

afterEach(() => {
  jest.resetAllMocks()
})

describe('external polygon api', () => {
  it('calls to fetch current game state', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        account: MOCK_WALLET_ADDRESS,
        chainId: 137,
      },
    })
    fetchCurrentGameState.mockReturnValue({ hasBaz: 'barbaz' })
    await polygonApiHandler(req, res)
    expect(fetchCurrentGameState).toHaveBeenCalledTimes(1)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      status: 'success',
      hasBaz: 'barbaz',
    })
  })
})
