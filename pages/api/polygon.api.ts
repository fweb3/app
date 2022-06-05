import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchCurrentGameState } from '../../lib/polygon'
import { NETWORKS, AllowedChains } from '../../types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { GameError } from '../../types'

const _isAllowedNet = (chainId: number) => {
  const netName = NETWORKS[chainId]?.toUpperCase() || ''
  return AllowedChains[chainId] === netName
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { account, chainId } = req.query
    const chainIdInt = parseInt(chainId?.toString())
    const isAllowedNet = _isAllowedNet(chainIdInt)

    if (!isAllowedNet) {
      throw new Error('Network not supported')
    }

    const payload = await fetchCurrentGameState(chainIdInt, account.toString())
    return res.json({ status: 'success', ...payload })
  } catch (e: GameError) {
    return res
      .status(500)
      .json({ status: 'error', message: e.message, error: e })
  }
}
