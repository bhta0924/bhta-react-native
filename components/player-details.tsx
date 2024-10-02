import { Player } from "@/models/player";
import { styleMixins } from "@/styles/mixins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface PlayerDetailsProps {
  details: Player | null;
  isLoading: boolean;
}

export const PlayerDetails = ({ details, isLoading }: PlayerDetailsProps) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <View
        style={[
          styleMixins.container,
          { height: "100%", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator />
      </View>
    );
  }

  // TODO: Handle error scenario
  if (!details) {
    return <></>;
  }

  const { fullName, imageUrl, age, height, number, position } = details;

  return (
    <View style={[styleMixins.container, { gap: 48 }]}>
      <View>
        <Pressable
          onPress={() => router.back()}
          style={[
            styleMixins.flexRow,
            { gap: 8, paddingHorizontal: 24, paddingVertical: 8 },
          ]}
        >
          <Ionicons name="chevron-back" style={{ color: "#999" }} size={16} />
          <Text style={{ color: "#999", fontSize: 16 }}>Go back</Text>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ height: 180, width: 180 }}
          />
        ) : (
          <Ionicons name="person" size={180} style={{ color: "#555" }} />
        )}
        <Text style={styles.name}>{fullName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={[styleMixins.flexRow, styles.detailsRow]}>
          <Text style={styles.detailsLabel}>Age</Text>
          <Text style={styles.detailsValue}>{age ?? "N/D"}</Text>
        </View>
        <View style={[styleMixins.flexRow, styles.detailsRow]}>
          <Text style={styles.detailsLabel}>Height</Text>
          <Text style={styles.detailsValue}>{height ?? "N/D"}</Text>
        </View>
        <View style={[styleMixins.flexRow, styles.detailsRow]}>
          <Text style={styles.detailsLabel}>Number</Text>
          <Text style={styles.detailsValue}>{number ?? "N/D"}</Text>
        </View>
        <View style={[styleMixins.flexRow, styles.detailsRow]}>
          <Text style={styles.detailsLabel}>Position</Text>
          <Text style={styles.detailsValue}>{position ?? "N/D"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: { display: "flex", flexDirection: "column", gap: 24 },
  detailsLabel: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 300,
  },
  detailsRow: {
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  detailsValue: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: 700,
  },
  imageContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: 32,
  },
  name: {
    color: "#ccc",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 700,
  },
});
