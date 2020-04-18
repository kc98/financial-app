import React from "react";
import { Button, Text } from "native-base";

import { styleSheetMain } from "../styles/styleSheetMain";

export default function CustomButton(props) {
  switch (props.type) {
    case "primary":
      return (
        <Button style={[styleSheetMain.primaryButton, props.buttonStyle]}>
          <Text style={[styleSheetMain.primaryButtonText]}>{props.text}</Text>
        </Button>
      );

    case "secondary":
      return (
        <Button style={[styleSheetMain.secondaryButton, props.buttonStyle]}>
          <Text style={[styleSheetMain.secondaryButtonText]}>{props.text}</Text>
        </Button>
      );
  }
}
