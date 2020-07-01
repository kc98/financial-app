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
  Label,
  Input,
  Form,
  Item,
  Icon,
} from "native-base";

import {
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";

import { styleSheetMain } from "../styles/styleSheetMain";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

import * as api from "../api";

export default function SignUp({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [securePasswordTextEntry, setSecurePasswordTextEntry] = useState(true);
  const [passwordShowIcon, setPasswordShowIcon] = useState("eye-off");
  const [
    secureConfirmPasswordTextEntry,
    setConfirmSecurePasswordTextEntry,
  ] = useState(true);
  const [confirmPasswordShowIcon, setConfirmPasswordShowIcon] = useState(
    "eye-off"
  );

  const [errorMessage, setErrorMessage] = useState(null);

  const handleShowPasswordIconOnPress = () => {
    if (passwordShowIcon == "eye") setPasswordShowIcon("eye-off");
    else setPasswordShowIcon("eye");

    setSecurePasswordTextEntry(!securePasswordTextEntry);
    return;
  };

  const handleShowConfirmPasswordIconOnPress = () => {
    if (confirmPasswordShowIcon == "eye") setConfirmPasswordShowIcon("eye-off");
    else setConfirmPasswordShowIcon("eye");

    setConfirmSecurePasswordTextEntry(!secureConfirmPasswordTextEntry);
    return;
  };

  //handle input value on change
  const handleNameValueOnChange = (event) => {
    let inputName = event.nativeEvent.text;
    setName(inputName);
  };

  const handleEmailValueOnChange = (event) => {
    let inputEmail = event.nativeEvent.text;
    setEmail(inputEmail);
  };

  const handlePasswordValueOnChange = (event) => {
    let inputPassword = event.nativeEvent.text;
    setPassword(inputPassword);
  };

  const handleConfirmPasswordValueOnChange = (event) => {
    let inputConfirmPassword = event.nativeEvent.text;
    setConfirmPassword(inputConfirmPassword);
  };

  //handle input on blur
  const handleNameBlur = () => {
    setNameTouched(true);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
  };

  const handleSignUpOnSubmit = async () => {
    if (!nameTouched || !email || !password || !confirmPassword) {
      setName(null);
      setEmail(null);
      setPassword(null);
      setConfirmPassword(null);
    } else {
      try {
        let response = await api.signup(name, email, password);
        await AsyncStorage.setItem("token", response.data.token);

        Alert.alert(
          "Welcome " + name + "!",
          " You have signed up successfully",
          [{ text: "OK" }]
        );

        return navigation.navigate("MainPage");
      } catch (error) {
        setErrorMessage(error.response.data.error);

        return;
      }
    }
  };

  const verifyNonEmptyField = name && email && password && confirmPassword;
  const matchingPassword = password === confirmPassword;

  let errorMessageText = null;
  if (errorMessage) {
    errorMessageText = (
      <View
        style={[
          colors.backgroundRed,
          {
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 5,
            paddingTop: 7,
            paddingBottom: 7,
            paddingRight: 5,
            marginBottom: 5,
            borderRadius: 10,
          },
        ]}
      >
        <Icon
          style={[colors.white, { paddingLeft: 5, paddingRight: 10 }]}
          type="AntDesign"
          name="closecircleo"
        />
        <Text style={[colors.white, texts.montserratRegular]}>
          {errorMessage}
        </Text>
      </View>
    );
  }

  return (
    <Container>
      <Header transparent />
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <Image
              style={styleSheetMain.logoImage}
              source={require("../img/appLogo.png")}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 4,
              marginLeft: "12%",
              marginRight: "12%",
            }}
          >
            {errorMessageText}
            <Form>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Name</Label>
                <Input
                  value={name}
                  style={texts.montserratRegular}
                  onChange={handleNameValueOnChange}
                  onBlur={handleNameBlur}
                />
              </Item>
              <Text
                style={[
                  styleSheetMain.errorTextLogIn,
                  { marginTop: !name && nameTouched ? 10 : 0 },
                ]}
              >
                {!name && nameTouched ? "Name is required" : ""}
              </Text>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Email</Label>
                <Input
                  value={email}
                  style={texts.montserratRegular}
                  onChange={handleEmailValueOnChange}
                  onBlur={handleEmailBlur}
                  keyboardType="email-address"
                />
              </Item>
              <Text
                style={[
                  styleSheetMain.errorTextLogIn,
                  { marginTop: !email && emailTouched ? 10 : 0 },
                ]}
              >
                {!email && emailTouched ? "Email is required" : ""}
              </Text>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Password</Label>
                <Input
                  value={password}
                  secureTextEntry={securePasswordTextEntry}
                  style={texts.montserratRegular}
                  onChange={handlePasswordValueOnChange}
                  onBlur={handlePasswordBlur}
                />
                <Icon
                  name={passwordShowIcon}
                  onPress={handleShowPasswordIconOnPress}
                />
              </Item>
              <Text
                style={[
                  styleSheetMain.errorTextLogIn,
                  { marginTop: !password && passwordTouched ? 10 : 0 },
                ]}
              >
                {!password && passwordTouched ? "Password is required" : ""}
              </Text>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>
                  Confirm Password
                </Label>
                <Input
                  value={confirmPassword}
                  secureTextEntry={secureConfirmPasswordTextEntry}
                  style={texts.montserratRegular}
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
                {!(confirmPassword === password) && confirmPassword && password
                  ? "Password does not match"
                  : ""}
              </Text>
            </Form>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                { padding: 10, marginTop: 50, marginBottom: 50 },
                verifyNonEmptyField && matchingPassword
                  ? styleSheetMain.primaryButton
                  : styleSheetMain.hoverButton,
              ]}
              onPress={handleSignUpOnSubmit}
              disabled={verifyNonEmptyField && matchingPassword ? false : true}
            >
              <Text style={[styleSheetMain.primaryButtonText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
