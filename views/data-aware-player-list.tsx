import { PlayerList, PlayerListProps } from "@/components/player-list";
import { useFilters } from "@/contexts/filters-context";
import { usePlayerList } from "@/hooks/use-player-list";
import { useCallback, useEffect } from "react";

export const DataAwarePlayerList = () => {
  const { fetch, list } = usePlayerList();

  // NOTE: We do not necessarily have to update filters explicitly in this component with updatePosition.
  // Instead, we could use useFilters nested components directly, as they're also wrapper with proper provider.
  // Leaving this as is to present options.
  //
  // Current solution cons:
  // - prop drilling
  // Current solution pros:
  // - data provided and managed explicitly
  // - simplicity
  // - readability
  const { position, updatePosition } = useFilters();

  useEffect(() => {
    fetch({ limit: 100, position });
  }, [position]);

  const handleFetchChunk = useCallback<PlayerListProps["onFetchChunk"]>(
    (args) => {
      fetch({
        limit: args?.limit !== undefined ? args.limit : 100,
        merge: true,
        offset: args?.offset !== undefined ? args.offset : 0,
        position,
      });
    },
    [position]
  );

  const handleFilter = useCallback(({ position }: { position?: string }) => {
    updatePosition(position);
  }, []);

  return (
    <PlayerList
      isLoading={list.isLoading}
      items={list.data ?? []}
      onFetchChunk={handleFetchChunk}
      onFilter={handleFilter}
      position={position}
    />
  );
};
