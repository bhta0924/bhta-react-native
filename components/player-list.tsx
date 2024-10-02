import { Player } from "@/models/player";
import { styleMixins } from "@/styles/mixins";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PlayerListItem } from "./player-list-item";
import { DataAwareFilterPosition } from "../views/data-aware-filter-position";

export interface PlayerListFetchChunkArgs {
  limit?: number;
  offset?: number;
}

export interface PlayerListFilterArgs {
  position?: string;
}

export interface PlayerListProps {
  isLoading?: boolean;
  items: Player[];
  onFetchChunk: (args?: PlayerListFetchChunkArgs) => void;
  onFilter: (args: PlayerListFilterArgs) => void;
  position?: string;
}

export const PlayerList = ({
  isLoading,
  items,
  onFetchChunk,
  onFilter,
  position,
}: PlayerListProps) => {
  const [isPositionFilter, setIsPositionFilter] = useState(false);

  const handleFiltersToggle = useCallback(
    (value: boolean) => () => {
      setIsPositionFilter(value);
    },
    []
  );

  const handleFilters = useCallback((position: string | null) => {
    setIsPositionFilter(false);
    onFilter({ position: position ?? undefined });
  }, []);

  useEffect(() => {
    // TODO: Implement infinite scroll
    onFetchChunk();
  }, []);

  return (
    <View style={[styleMixins.container, { gap: 32 }]}>
      <View
        testID="position-list"
        style={[
          isPositionFilter ? styles.overlap : styles.noOverlap,
          {
            backgroundColor: "#202020",
            height: "100%",
            position: "absolute",
            zIndex: 10,
            width: "100%",
          },
        ]}
      >
        <DataAwareFilterPosition
          cancel={handleFiltersToggle(false)}
          position={position}
          select={handleFilters}
        />
      </View>
      <View style={{ display: "flex", gap: 16, paddingHorizontal: 24 }}>
        <View
          style={[styleMixins.flexRow, { justifyContent: "space-between" }]}
        >
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: 700 }}>
            Search
          </Text>
          <Ionicons name="search" size={24} style={{ color: "#fff" }} />
        </View>
        <Pressable
          testID="position-picker"
          onPress={handleFiltersToggle(true)}
          style={[styleMixins.flexRow, styles.positionPicker]}
        >
          <Ionicons name="filter" size={16} />
          <Text style={{ fontSize: 16, lineHeight: 16 }}>
            Position: {position ?? "any"}
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollViewContent}>
          {items.map((item, idx) => (
            <PlayerListItem
              age={item.age}
              fullName={item.fullName}
              height={item.height}
              id={item.playerId}
              imageUrl={item.imageUrl}
              key={`${item.playerId}${idx}`}
              position={item.position}
            />
          ))}
        </View>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignItems: "baseline",
    backgroundColor: "#20202099",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 32,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  noOverlap: {
    opacity: 0,
    pointerEvents: "none",
  },
  overlap: {
    opacity: 1,
    pointerEvents: "auto",
  },
  positionPicker: {
    backgroundColor: "#fff",
    borderRadius: 4,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    position: "relative",
  },
  scrollViewContent: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
});
