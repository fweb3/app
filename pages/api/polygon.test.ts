import { fetchCurrentGameState } from '../../lib/polygon/game'
import { DEFAULT_GAME_STATE } from '../../lib/constants'
import polygonApiHandler from './polygon.api'
import httpMocks from 'node-mocks-http'

jest.mock('../../lib/polygon/game')

const MOCK_WALLET_ADDRESS = '0x65eaFA1FBA16E3D85Ea9e663794e4F6e123C4B8A'

describe('external polygon api', () => {
  it('calls to fetch current game state', async () => {
    jest.mocked(fetchCurrentGameState).mockResolvedValue(DEFAULT_GAME_STATE)
    const req = httpMocks.createRequest({
      method: 'GET',
      query: {
        account: MOCK_WALLET_ADDRESS,
        chainId: 137,
      },
    })
    const res = httpMocks.createResponse()
    await polygonApiHandler(req, res)

    expect(fetchCurrentGameState).toHaveBeenCalledTimes(1)
    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      status: 'success',
      ...DEFAULT_GAME_STATE,
    })
  })

  it('sends error if network is not allowed', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      query: {
        account: MOCK_WALLET_ADDRESS,
        chainId: 66642069,
      },
    })

    const res = httpMocks.createResponse()
    await polygonApiHandler(req, res)

    expect(res.statusCode).toBe(500)
    expect(JSON.parse(res._getData())).toEqual({
      status: 'error',
      message: 'Network not supported',
      error: {},
    })
  })
})
