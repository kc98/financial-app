import React from "react";
import { Text } from "native-base";
import { styleSheetMain } from "../styles/styleSheetMain";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LogInButton(props) {
  return (
    <TouchableOpacity
      style={[styleSheetMain.primaryButton, props.buttonStyle]}
      onPress={props.buttonOnPress}
      disabled={props.disableButton}
    >
      <Text style={[styleSheetMain.primaryButtonText]}>Log In</Text>
    </TouchableOpacity>
  );
}
