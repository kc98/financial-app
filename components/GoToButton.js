import React from "react";
import { Button, Text, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function GoToButton(props) {
  const navigation = useNavigation();

  switch (props.type) {
    case "primary":
      return (
        <Button
          style={[styleSheetMain.primaryButton, props.buttonStyle]}
          onPress={() => {
            return navigation.navigate(props.navigateTo);
          }}
        >
          <Text style={[styleSheetMain.primaryButtonText]}>{props.text}</Text>
        </Button>
      );

    case "secondary":
      return (
        <Button
          onPress={() => {
            return navigation.navigate(props.navigateTo);
          }}
          style={[styleSheetMain.secondaryButton, props.buttonStyle]}
        >
          <Text style={[styleSheetMain.secondaryButtonText]}>{props.text}</Text>
        </Button>
      );

    case "goBack":
      return (
        <Button
          transparent
          onPress={() => {
            return navigation.goBack();
          }}
        >
          <Icon style={[colors.primary]} name="arrow-back" />
        </Button>
      );
  }
}
