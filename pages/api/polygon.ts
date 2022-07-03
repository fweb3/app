import { NextApiRequest, NextApiResponse } from "next";

import type {
  IRequestValidationResponse,
  IGameTaskState,
  IAPIRequestQueryParams,
} from "../../types";
import {
  NEXT_PUBLIC_DEBUG_ENABLE_DOTS,
  NODE_ENV,
  DEBUG_ENABLE,
} from "../../lib/constants";
import {
  fetchCurrentGameState,
  fetchDebugGameState,
  validateRequest,
} from "../../lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      wallet: debugWallet,
      debug,
      wallet_address: walletAddress,
    }: IAPIRequestQueryParams = req.query;
    const { status, error } = validateRequest(req);

    if (status !== 200) {
      return res.status(status).json(error);
    }

    if (
      (NODE_ENV !== "production" || DEBUG_ENABLE) &&
      NEXT_PUBLIC_DEBUG_ENABLE_DOTS &&
      debug
    ) {
      const debugTaskState = await fetchDebugGameState(
        NEXT_PUBLIC_DEBUG_ENABLE_DOTS
      );
      return res.json(debugTaskState);
    }
    const gameTaskState = await fetchCurrentGameState(
      debugWallet ?? walletAddress
    );
    return res.json(gameTaskState);
  } catch (e) {
    console.error(e);
    return res.status(e?.status || 500).send(e?.message || e);
  }
}
