import { styleMixins } from "@/styles/mixins";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

export interface PlayerListItemProps {
  age?: number;
  fullName: string;
  height?: string;
  id: string;
  imageUrl: string | null;
  position?: string;
}

export const PlayerListItem = ({
  age,
  fullName,
  height,
  id,
  imageUrl,
  position,
}: PlayerListItemProps) => {
  return (
    <Link
      href={`/player/${id}`}
      style={[
        styleMixins.flexRow,
        {
          gap: 24,
          minHeight: 48,
        },
      ]}
      testID="list-item"
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ height: 48, width: 48 }} />
      ) : (
        <Ionicons color="#555" name="person" size={48} />
      )}
      <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
          {fullName}
        </Text>
        <Text style={{ color: "#bbb", fontSize: 16, fontWeight: 300 }}>
          {age ? `${age}yo` : "N/D"} | {position ?? "N/D"} | {height ?? "N/D"}
        </Text>
      </View>
    </Link>
  );
};
