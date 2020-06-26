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
} from "native-base";

import {
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";

import * as api from "../api";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [securePasswordTextEntry, setSecurePasswordTextEntry] = useState(true);
  const [passwordShowIcon, setPasswordShowIcon] = useState("eye-off");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleShowPasswordIconOnPress = () => {
    if (passwordShowIcon == "eye") setPasswordShowIcon("eye-off");
    else setPasswordShowIcon("eye");

    setSecurePasswordTextEntry(!securePasswordTextEntry);
    return;
  };

  const handleEmailValueOnChange = (event) => {
    let inputEmail = event.nativeEvent.text;
    setEmail(inputEmail);
  };

  const handlePasswordValueOnChange = (event) => {
    let inputPassword = event.nativeEvent.text;
    setPassword(inputPassword);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handleLogInOnSubmit = async () => {
    if (!email || !password) {
      setEmail(null);
      setPassword(null);
    } else {
      try {
        let response = await api.login(email, password);
        await AsyncStorage.setItem("token", response.data.token);

        return navigation.navigate("MainPage");
      } catch (error) {
        setErrorMessage(error.response.data.error);

        return;
      }
    }
  };

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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 3 }}>
            <Image
              style={{
                marginTop: "6%",
                ...styleSheetMain.logoImage,
              }}
              source={require("../img/logo.png")}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 3,
              marginLeft: "12%",
              marginRight: "12%",
            }}
          >
            {errorMessageText}
            <Form>
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
            </Form>
          </View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity
              style={[
                { padding: 10, marginTop: 10 },
                email && password
                  ? styleSheetMain.primaryButton
                  : styleSheetMain.hoverButton,
              ]}
              onPress={handleLogInOnSubmit}
              disabled={email && password ? false : true}
            >
              <Text style={[styleSheetMain.primaryButtonText]}>Log In</Text>
            </TouchableOpacity>
            {/* {errorMessage ? <Text>{errorMessage}</Text> : null} */}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}
