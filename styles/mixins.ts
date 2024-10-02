import { StyleSheet } from "react-native";

export const styleMixins = StyleSheet.create({
  body: { backgroundColor: "#202020", display: "flex", height: "100%" },
  container: {
    backgroundColor: "#202020",
    display: "flex",
    gap: 32,
    height: "100%",
    paddingVertical: 24,
  },
  flexRow: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});
