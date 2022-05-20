import { NextApiRequest, NextApiResponse } from 'next'

import type {
  IRequestValidationResponse,
  IGameTaskState,
  IAPIRequestQueryParams,
} from '../../types'

import { fetchCurrentGameState, validateRequest } from '../../lib'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      wallet: debugWallet,
      wallet_address: walletAddress,
    }: IAPIRequestQueryParams = req.query
    const { status, error }: IRequestValidationResponse = validateRequest(req)

    if (status !== 200) {
      return res.status(status).json(error)
    }

    const gameTaskState: IGameTaskState = await fetchCurrentGameState(
      debugWallet ?? walletAddress
    )
    return res.json(gameTaskState)
  } catch (e) {
    console.error(e)
    return res.status(e?.status || 500).send(e?.message || e)
  }
}
