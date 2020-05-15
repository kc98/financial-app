import { StyleSheet } from "react-native";

import { buttons } from "./buttons";
import { colors } from "./colors";
import { texts } from "./texts";
import { widths } from "./widths";
import { alignments } from "./alignments";

const styleSheetMain = StyleSheet.create({
  //   container: {
  //     backgroundColor: Colors.background,
  //     alignItems: "center",
  //     padding: Spacing.base,
  //   },
  //   header: {
  //     flex: 1,
  //     ...Typography.mainHeader,
  //   },
  //   section: {
  //     flex: 3,
  //     ...Typography.section,
  //   },
  primaryButton: {
    ...buttons.primary,
    ...alignments.center,
    ...widths.width_60,
    ...buttons.radius_25,
  },
  secondaryButton: {
    ...buttons.secondary,
    ...alignments.center,
    ...widths.width_60,
    ...buttons.radius_25,
  },
  tertiaryButton: {
    ...colors.backgroundWhite,
    ...alignments.center,
    ...buttons.radius_18,
    borderWidth: 1,
    borderColor: "#46C553",
  },
  hoverButton: {
    ...buttons.hover,
    ...alignments.center,
    ...widths.width_60,
    ...buttons.radius_25,
  },
  primaryButtonText: {
    ...texts.montserratBold,
    ...texts.font_18,
    ...colors.white,
  },
  secondaryButtonText: {
    ...texts.montserratBold,
    ...texts.font_18,
    ...colors.primary,
  },
  buttonTextMedium: {
    ...texts.montserratRegular,
    ...texts.font_16,
  },
  logoImage: {
    height: 200,
    ...widths.width_80,
    ...alignments.center,
  },
  labelBlack: {
    ...colors.black,
    ...texts.montserratRegular,
  },
  underlineGrey: {
    ...texts.underline,
    ...colors.dimgrey,
  },
  errorTextLogIn: {
    ...colors.red,
    marginLeft: "5%",
    marginRight: "5%",
  },
  selectMonthYearContainer: {
    ...widths.width_100,
    height: 50,
    alignSelf: "stretch",
    borderWidth: 1,
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    ...colors.backgroundWhite,
  },
  centerContainer: { flex: 1, flexDirection: "row", ...alignments.center },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  selectedMothYearText: { ...colors.tertiary, ...texts.montserratBold },
  dropdownIcon: {
    ...colors.tertiary,
    fontSize: 16,
  },
  totalTransactionsContainer: {
    height: 25,
    marginLeft: 10,
    paddingTop: 5,
    alignItems: "center",
  },
  transactionListContainer: {
    ...widths.width_100,
    alignSelf: "stretch",
    borderWidth: 1,
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...colors.backgroundWhite,
  },
  transactionCatrgoryImage: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  mediumText: { ...texts.font_15, ...texts.montserratRegular },
});

export { styleSheetMain };
