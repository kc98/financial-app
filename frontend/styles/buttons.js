import { StyleSheet } from "react-native";

const buttons = StyleSheet.create({
  primary: {
    backgroundColor: "#46C553",
  },
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 2.2,
    borderColor: "#46C553",
  },
  hover: {
    backgroundColor: "#8ede96",
  },
  radius_16: {
    borderRadius: 16,
  },
  radius_18: {
    borderRadius: 18,
  },
  radius_20: {
    borderRadius: 20,
  },
  radius_25: {
    borderRadius: 25,
  },
  containerEnabled: {
    opacity: 1,
  },
  containerDisabled: {
    opacity: 0.3,
  },
});

export { buttons };
