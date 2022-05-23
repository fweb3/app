import { NextApiRequest, NextApiResponse } from 'next'
import { IGameTaskState } from '../../interfaces/game'
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
  } catch (e) {
    console.error(e)
    return res.status(500).json({ status: 'error', error: e.message })
  }
}
