import { API_HOST } from "@/constants/api";
import { Player } from "@/models/player";
import { ILoadable } from "@/types";
import { mapToPlayers } from "@/utils/map-to-players";
import { stripEmptyProps } from "@/utils/strip-empty-props";
import { useCallback, useState } from "react";

const API_ENDPOINT = "/players";

export interface PlayerListQuery {
  limit?: number;
  offset?: number;
  merge?: boolean;
  position?: string;
}

export interface UsePlayerLisResult {
  fetch: (query?: PlayerListQuery) => void;
  list: ILoadable<Player[]>;
}

export const usePlayerList = (): UsePlayerLisResult => {
  const [list, setList] = useState<UsePlayerLisResult["list"]>({
    data: null,
    isEmpty: false,
    isLoading: false,
  });

  const fetch = useCallback((query: PlayerListQuery = {}) => {
    const { merge = false, ...urlQuery } = query;

    const strippedQuery = stripEmptyProps(urlQuery);

    const url = `${API_HOST}${API_ENDPOINT}?${new URLSearchParams(
      (strippedQuery as Record<string, string>) ?? {}
    )?.toString()}`;

    setList((list) => ({ ...list, isLoading: true }));

    window
      .fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // TODO: Handle invalid data structure (see mapToPlayers' body).
        setList((oldData) => ({
          data: merge
            ? [
                ...(oldData.data ?? []),
                ...(response.result ? mapToPlayers(response.result) ?? [] : []),
              ]
            : response.result
            ? mapToPlayers(response.result) ?? []
            : [],
          isEmpty: response.result.length === 0,
          isLoading: false,
        }));
      });
  }, []);

  return {
    fetch,
    list,
  };
};
