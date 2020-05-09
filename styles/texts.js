import { StyleSheet } from "react-native";

// All text styles would be here (e.g., text decoration, font family, font style, size, and etc)
const texts = StyleSheet.create({
  montserratBold: {
    fontFamily: "Montserrat_Bold",
  },
  montserratRegular: {
    fontFamily: "Montserrat_Regular",
  },
  buttonText: {
    fontSize: 18,
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export { texts };
