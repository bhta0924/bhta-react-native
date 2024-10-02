import { API_HOST } from "@/constants/api";
import { ILoadable } from "@/types";
import { useCallback, useState } from "react";

const API_ENDPOINT = "/positions";

export interface UsePositionLisResult {
  fetch: () => void;
  list: ILoadable<string[]>;
}

export const usePositionList = (): UsePositionLisResult => {
  const [list, setList] = useState<UsePositionLisResult["list"]>({
    data: null,
    isEmpty: false,
    isLoading: false,
  });

  const fetch = useCallback(() => {
    const url = `${API_HOST}${API_ENDPOINT}?`;

    setList((list) => ({ ...list, isLoading: true }));

    window
      .fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // TODO: Handle invalid data structure.
        setList({
          data: response,
          isEmpty: response.length === 0,
          isLoading: false,
        });
      });
  }, []);

  return {
    fetch,
    list,
  };
};
