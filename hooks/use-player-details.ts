import { API_HOST } from "@/constants/api";
import { Player } from "@/models/player";
import { ILoadable } from "@/types";
import { mapToPlayer } from "@/utils/map-to-players";
import { useCallback, useState } from "react";

const API_ENDPOINT = "/player";

export interface PlayerDetailsQuery {
  id: string;
}

export interface UsePlayerLisResult {
  fetch: (query: PlayerDetailsQuery) => void;
  result: ILoadable<Player>;
}

export const usePlayerDetails = (): UsePlayerLisResult => {
  const [result, setResult] = useState<UsePlayerLisResult["result"]>({
    data: null,
    isEmpty: false,
    isLoading: false,
  });

  const fetch = useCallback((query: PlayerDetailsQuery) => {
    const { id } = query;

    const url = `${API_HOST}${API_ENDPOINT}/${id}`;

    setResult((list) => ({ ...list, isLoading: true }));

    window
      .fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // TODO: Handle invalid data structure.
        setResult({
          data: response ? mapToPlayer(response) : null,
          isEmpty: !response,
          isLoading: false,
        });
      });
  }, []);

  return {
    fetch,
    result,
  };
};
