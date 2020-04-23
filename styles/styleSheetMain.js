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
    borderRadius: 35,
  },
  secondaryButton: {
    ...buttons.secondary,
    ...alignments.center,
    ...widths.width_60,
    ...buttons.radius_25,
  },
  primaryButtonText: {
    ...texts.montserratBold,
    ...texts.buttonText,
    ...colors.white,
  },
  secondaryButtonText: {
    ...texts.montserratBold,
    ...texts.buttonText,
    ...colors.primary,
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
});

export { styleSheetMain };
