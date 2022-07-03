import type { IGameTaskState } from "../types";
import { useConnection } from "../providers";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useGameState = () => {
  const [gameTaskState, setGameTaskState] = useState<IGameTaskState>(null);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [hasWonGame, setHasWonGame] = useState<boolean>(false);
  const [activeDot, setActiveDot] = useState<number>(-1);
  const [trophyId, setTrophyId] = useState<string>("");
  const { account, isConnected } = useConnection();
  const {
    query: { wallet },
  } = useRouter();

  const checkHasWonGame = (gameTaskState: IGameTaskState) => {
    const hasWonGame = gameTaskState["hasWonGame"];
    const trophyId = gameTaskState["trophyId"];
    setHasWonGame(hasWonGame);
    setTrophyId(trophyId);
  };

  useEffect(() => {
    (async () => {
      if (isConnected || wallet) {
        try {
          setFetchingData(true);
          // if the wallet is coming from URL use that. else use connected
          const url = `/api/polygon?wallet_address=${wallet ?? account}`;
          const apiResponse = await fetch(url);
          const taskState = await apiResponse.json();
          const tasksConnected = { ...taskState, isConnected };

          setGameTaskState(tasksConnected);
          checkHasWonGame(tasksConnected);
          setFetchingData(false);
        } catch (err) {
          // todo toastify
          console.error(err);
          setFetchingData(false);
        }
      }
    })();
  }, [isConnected, account, wallet]);

  return {
    trophyId,
    hasWonGame,
    activeDot,
    setActiveDot,
    gameTaskState,
    fetchingData,
  };
};
