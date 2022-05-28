// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { GameError, IGameTaskState } from '../../interfaces/game.d'
import { NextApiRequest, NextApiResponse } from 'next'
import { fetchCurrentGameState } from '../../lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { account } = req.query
    const payload: IGameTaskState = await fetchCurrentGameState(
      account.toString()
    )
    return res.json({ status: 'success', ...payload })
  } catch (e: GameError) {
    console.error(e)
    return res.status(500).json({ status: 'error', error: e.message })
  }
}
