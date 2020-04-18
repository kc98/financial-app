import { StyleSheet } from "react-native";

import { buttons } from "./buttons";
import { colors } from "./colors";
import { texts } from "./texts";
import { widths } from "./widths";

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
    ...texts.center,
    ...widths.width_60,
    ...buttons.radius_25,
    borderRadius: 35,
  },
  secondaryButton: {
    ...buttons.secondary,
    ...texts.center,
    ...widths.width_60,
    ...buttons.radius_25,
  },
  primaryButtonText: {
    ...texts.buttonText,
    ...colors.white,
  },
  secondaryButtonText: {
    ...texts.buttonText,
    ...colors.primary,
  },
});

export { styleSheetMain };
