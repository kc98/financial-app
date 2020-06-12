import React, { useState } from "react";
import {
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  View,
  Form,
  Input,
  Label,
  Item,
  Icon,
  Title,
  Button,
} from "native-base";

import {
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

export default function ChangePassworPage({ navigation }) {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [oldPasswordTouched, setOldPasswordTouched] = useState(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [oldPasswordShowIcon, setOldPasswordShowIcon] = useState("eye-off");
  const [newPasswordShowIcon, setNewPasswordShowIcon] = useState("eye-off");
  const [confirmPasswordShowIcon, setConfirmPasswordShowIcon] = useState(
    "eye-off"
  );
  const [secureOldPasswordTextEntry, setSecureOldPasswordTextEntry] = useState(
    true
  );
  const [secureNewPasswordTextEntry, setSecureNewPasswordTextEntry] = useState(
    true
  );
  const [
    secureConfirmPasswordTextEntry,
    setConfirmSecurePasswordTextEntry,
  ] = useState(true);

  const handleShowOldPasswordIconOnPress = () => {
    if (oldPasswordShowIcon == "eye") setOldPasswordShowIcon("eye-off");
    else setOldPasswordShowIcon("eye");

    setSecureOldPasswordTextEntry(!secureOldPasswordTextEntry);
    return;
  };
  const handleShowNewPasswordIconOnPress = () => {
    if (newPasswordShowIcon == "eye") setNewPasswordShowIcon("eye-off");
    else setNewPasswordShowIcon("eye");

    setSecureNewPasswordTextEntry(!secureNewPasswordTextEntry);
    return;
  };
  const handleShowConfirmPasswordIconOnPress = () => {
    if (confirmPasswordShowIcon == "eye") setConfirmPasswordShowIcon("eye-off");
    else setConfirmPasswordShowIcon("eye");

    setConfirmSecurePasswordTextEntry(!secureConfirmPasswordTextEntry);
    return;
  };
  const handleOldPasswordValueOnChange = (event) => {
    let inputOldPassword = event.nativeEvent.text;
    setOldPassword(inputOldPassword);
  };
  const handleNewPasswordValueOnChange = (event) => {
    let inputNewPassword = event.nativeEvent.text;
    setNewPassword(inputNewPassword);
  };

  const handleConfirmPasswordValueOnChange = (event) => {
    let inputConfirmPassword = event.nativeEvent.text;
    setConfirmPassword(inputConfirmPassword);
  };

  const handleOldPasswordBlur = () => {
    setOldPasswordTouched(true);
  };
  const handleNewPasswordBlur = () => {
    setNewPasswordTouched(true);
  };
  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
  };

  const handleChangePasswordOnSubmit = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setOldPassword(null);
      setNewPassword(null);
      setConfirmPassword(null);
      Alert.alert("Invalid Data", "Your password cannot be empty.", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert("Update successfully!", "Your password has been changed.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
  };

  const handleCancelUpdateProfileOnSubmit = () => {
    Alert.alert(
      "Cancel Confirmation",
      "Are you sure to cancel changing password? \nYour change(s) will not be saved and updated.",
      [{ text: "No" }, { text: "Yes", onPress: () => navigation.goBack() }]
    );
  };

  const verifyNonEmptyField = oldPassword && newPassword && confirmPassword;
  const duplicateOldPassword = !(oldPassword === newPassword);
  const matchingPassword = newPassword === confirmPassword;

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <Row
              size={1}
              style={[alignments.center, { height: 100, marginTop: 30 }]}
            >
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 70,
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: 15,
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={require("../img/user.png")}
                />
              </View>
            </Row>
            <Row
              size={1}
              style={[alignments.center, { height: 30, marginTop: 25 }]}
            >
              <Text
                style={[
                  texts.montserratBold,
                  alignments.center,
                  { fontSize: 16 },
                ]}
              >
                YEAP KHOR CHIN
              </Text>
            </Row>
            <View
              style={{
                backgroundColor: "#fff",
                marginTop: 20,
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 60,
                borderRadius: 20,
                padding: 25,
              }}
            >
              <Form>
                <Item floatingLabel>
                  <Label style={styleSheetMain.labelBlack}>
                    Current Password
                  </Label>
                  <Input
                    value={oldPassword}
                    style={texts.montserratRegular}
                    secureTextEntry={secureOldPasswordTextEntry}
                    onChange={handleOldPasswordValueOnChange}
                    onBlur={handleOldPasswordBlur}
                  />
                  <Icon
                    name={oldPasswordShowIcon}
                    onPress={handleShowOldPasswordIconOnPress}
                  />
                </Item>
                <Text
                  style={[
                    styleSheetMain.errorTextLogIn,
                    {
                      marginTop: !oldPassword && oldPasswordTouched ? 10 : 0,
                    },
                  ]}
                >
                  {!oldPassword && oldPasswordTouched
                    ? "Current Password is required"
                    : ""}
                </Text>
                <Item floatingLabel>
                  <Label style={styleSheetMain.labelBlack}>New Password</Label>
                  <Input
                    value={newPassword}
                    style={texts.montserratRegular}
                    secureTextEntry={secureNewPasswordTextEntry}
                    onChange={handleNewPasswordValueOnChange}
                    onBlur={handleNewPasswordBlur}
                  />
                  <Icon
                    name={newPasswordShowIcon}
                    onPress={handleShowNewPasswordIconOnPress}
                  />
                </Item>

                <Text
                  style={[
                    styleSheetMain.errorTextLogIn,
                    {
                      marginTop: !newPassword && newPasswordTouched ? 10 : 0,
                    },
                  ]}
                >
                  {!newPassword && newPasswordTouched
                    ? "New Password is required"
                    : ""}
                  {!duplicateOldPassword && oldPassword && newPassword
                    ? "Current password and new password can not be same"
                    : ""}
                </Text>
                <Item floatingLabel>
                  <Label style={styleSheetMain.labelBlack}>
                    Confirm Password
                  </Label>
                  <Input
                    value={confirmPassword}
                    style={texts.montserratRegular}
                    secureTextEntry={secureConfirmPasswordTextEntry}
                    onChange={handleConfirmPasswordValueOnChange}
                    onBlur={handleConfirmPasswordBlur}
                  />
                  <Icon
                    name={confirmPasswordShowIcon}
                    onPress={handleShowConfirmPasswordIconOnPress}
                  />
                </Item>
                <Text
                  style={[
                    styleSheetMain.errorTextLogIn,
                    {
                      marginTop:
                        !confirmPassword && confirmPasswordTouched ? 10 : 0,
                    },
                  ]}
                >
                  {!confirmPassword && confirmPasswordTouched
                    ? "Confirm Password is required"
                    : ""}
                  {!(confirmPassword === newPassword) &&
                  confirmPassword &&
                  newPassword
                    ? "New password and confirm password do not match"
                    : ""}
                </Text>
                <Row
                  style={[
                    alignments.center,
                    { height: 30, marginTop: 55, marginBottom: 10 },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.primaryButtonRadius25,
                      widths.width_70,
                      verifyNonEmptyField &&
                      duplicateOldPassword &&
                      matchingPassword
                        ? ""
                        : buttons.hover,
                    ]}
                    onPress={handleChangePasswordOnSubmit}
                    disabled={
                      verifyNonEmptyField &&
                      duplicateOldPassword &&
                      matchingPassword
                        ? false
                        : true
                    }
                  >
                    <Text
                      style={[styleSheetMain.buttonTextMedium, colors.white]}
                    >
                      Change Password
                    </Text>
                  </TouchableOpacity>
                </Row>
                <Row
                  style={[
                    alignments.center,
                    { height: 30, marginTop: 25, marginBottom: 10 },
                  ]}
                >
                  <Button
                    style={[styles.secondaryButtonRadius25, widths.width_70]}
                    onPress={handleCancelUpdateProfileOnSubmit}
                  >
                    <Text
                      style={[styleSheetMain.buttonTextMedium, colors.black]}
                    >
                      Cancel
                    </Text>
                  </Button>
                </Row>
              </Form>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Grid>
    </Container>
  );
}

const styles = StyleSheet.create({
  primaryButtonRadius25: {
    ...buttons.primary,
    ...alignments.center,
    height: 42,
    ...buttons.radius_25,
  },
  secondaryButtonRadius25: {
    ...buttons.secondary,
    ...alignments.center,
    borderWidth: 1.2,
    height: 42,
    ...buttons.radius_25,
  },
});
