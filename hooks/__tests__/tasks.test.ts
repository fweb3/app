declare let window: any // eslint-disable-line

import { DEFAULT_GAME_STATE } from '../../lib/constants'
import { getCurrentGame } from '../Game/tasks'
// eslint-disable-next-line
import type { GameError } from '../../types'

window.fetch = jest.fn(async () => ({
  json: async () => ({
    ...DEFAULT_GAME_STATE,
    hasSentTokens: true,
    maticBalance: '1000000000000000000',
  }),
}))

describe('game tasks', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('fetches task state', async () => {
    const game = await getCurrentGame(137, 'foo')
    const numTasks = Object.keys(game.taskState).length
    expect(numTasks).toBe(13)
    const numCompleted = Object.keys(game.currentCompletedDots).length
    expect(numCompleted).toBe(9)
  })
  it('throws for an error when status is error', async () => {
    try {
      window.fetch = jest.fn(async () => ({
        json: async () => ({
          status: 'error',
          error: 'i am error hear me roar',
        }),
      }))
      await getCurrentGame(137, 'foo')
    } catch (err: GameError) {
      expect(err.message).toBe('i am error hear me roar')
    }
  })
})
