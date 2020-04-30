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

import { styleSheetMain } from "../styles/styleSheetMain";
import { texts } from "../styles/texts";
import GoToButton from "./GoToButton";
import { ScrollView } from "react-native-gesture-handler";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
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

  {
    /*handle input value on change*/
  }
  const handleFirstNameValueOnChange = (event) => {
    let inputFirstName = event.nativeEvent.text;
    setFirstName(inputFirstName);
  };

  const handleLastNameValueOnChange = (event) => {
    let inputLastName = event.nativeEvent.text;
    setLastName(inputLastName);
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

  {
    /*handle input on blur*/
  }
  const handleFirstNameBlur = () => {
    setFirstNameTouched(true);
  };

  const handleLastNameBlur = () => {
    setLastNameTouched(true);
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

  const handleSignUpOnSubmit = () => {
    if (
      !firstNameTouched ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      // alert(firstName + " signed up successfully");
      Alert.alert("Signed Up Successful", "Welcome " + firstName + "!", [
        { text: "OK" },
      ]);
      return navigation.navigate("TransactionList");
    }
  };

  const verifyNonEmptyField =
    firstName && lastName && email && password && confirmPassword;

  return (
    <Container>
      <Header transparent>
        <Left>
          <GoToButton type="goBack" />
        </Left>
        <Body />
        <Right />
      </Header>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <Image
              style={styleSheetMain.logoImage}
              source={require("../img/logo.png")}
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
            <Form>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>First Name</Label>
                <Input
                  value={firstName}
                  style={texts.montserratRegular}
                  onChange={handleFirstNameValueOnChange}
                  onBlur={handleFirstNameBlur}
                />
              </Item>
              <Text
                style={[
                  styleSheetMain.errorTextLogIn,
                  { marginTop: !firstName && firstNameTouched ? 10 : 0 },
                ]}
              >
                {!firstName && firstNameTouched ? "First Name is required" : ""}
              </Text>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Last Name</Label>
                <Input
                  value={lastName}
                  style={texts.montserratRegular}
                  onChange={handleLastNameValueOnChange}
                  onBlur={handleLastNameBlur}
                />
              </Item>
              <Text
                style={[
                  styleSheetMain.errorTextLogIn,
                  { marginTop: !lastName && lastNameTouched ? 10 : 0 },
                ]}
              >
                {!lastName && lastNameTouched ? "Last Name is required" : ""}
              </Text>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Email</Label>
                <Input
                  value={email}
                  style={texts.montserratRegular}
                  onChange={handleEmailValueOnChange}
                  onBlur={handleEmailBlur}
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
              </Text>
            </Form>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                { padding: 10, marginTop: 50, marginBottom: 50 },
                verifyNonEmptyField
                  ? styleSheetMain.primaryButton
                  : styleSheetMain.hoverButton,
              ]}
              onPress={handleSignUpOnSubmit}
              disabled={verifyNonEmptyField ? false : true}
            >
              <Text style={[styleSheetMain.primaryButtonText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
