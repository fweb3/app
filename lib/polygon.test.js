import { fetchCurrentGameState } from './polygon/game'
import polygonApiHandler from '../pages/api/polygon'
import { createMocks } from 'node-mocks-http'

jest.mock('./polygon/game')

const MOCK_WALLET_ADDRESS = '0x65eaFA1FBA16E3D85Ea9e663794e4F6e123C4B8A'

describe('external polygon api', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
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
