import { styleMixins } from "@/styles/mixins";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface FilterPositionProps {
  cancel: () => void;
  isLoading: boolean;
  items: string[] | null;
  position?: string;
  select: (position: string | null) => void;
}

export const FilterPosition = ({
  cancel,
  isLoading,
  items,
  position,
  select,
}: FilterPositionProps) => {
  const handleClick = useCallback(
    (item: string | null) => () => {
      select(item);
    },
    []
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={cancel}
        style={[
          styleMixins.flexRow,
          { gap: 8, paddingHorizontal: 24, paddingVertical: 8 },
        ]}
      >
        <Ionicons name="chevron-back" style={{ color: "#999" }} size={16} />
        <Text style={{ color: "#999", fontSize: 16 }}>Filter by position</Text>
      </Pressable>
      <ScrollView style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ padding: 32 }}>
            <ActivityIndicator />
          </View>
        ) : items ? (
          <View style={{ display: "flex", gap: 12, paddingHorizontal: 24 }}>
            <Pressable onPress={handleClick(null)}>
              <Text
                style={[
                  styles.item,
                  {
                    borderColor: position ? "#333" : "#999",
                    opacity: !position ? 1 : 0.7,
                  },
                ]}
              >
                Any
              </Text>
            </Pressable>
            {items.map((item, idx) => (
              <Pressable
                key={idx + item}
                onPress={handleClick(item)}
                testID="position-list-item"
              >
                <Text
                  style={[
                    styles.item,
                    {
                      borderColor: position === item ? "#999" : "#333",
                      opacity: position === item ? 1 : 0.7,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    height: "100%",
  },
  item: {
    borderRadius: 6,
    borderWidth: 1,
    color: "#fff",
    fontSize: 16,
    padding: 16,
    textAlign: "center",
  },
});
