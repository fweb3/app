import { createMocks } from 'node-mocks-http'
import { fetchCurrentGameState } from '../../lib/polygon/game'

import { MOCK_WALLET_ADDRESS } from '../../lib/polygon/__mocks__/mockWalletAddress'
import polygonApiHandler from './polygon'

const constantsMock = jest.requireMock('../../lib/constants')

jest.mock('../../lib/polygon/game')

afterEach(() => {
  jest.resetAllMocks()
})

describe('external polygon api', () => {
  it('calls to fetch current game state', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        account: MOCK_WALLET_ADDRESS,
      },
    })
    fetchCurrentGameState.mockReturnValue('barbaz')
    await polygonApiHandler(req, res)

    expect(fetchCurrentGameState).toHaveBeenCalledTimes(1)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual('barbaz')
  })
})
