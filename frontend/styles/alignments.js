import { StyleSheet } from "react-native";

const alignments = StyleSheet.create({
  center: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  centerRight: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export { alignments };
