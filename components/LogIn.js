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

import { texts } from "../styles/texts";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [securePasswordTextEntry, setSecurePasswordTextEntry] = useState(true);
  const [passwordShowIcon, setPasswordShowIcon] = useState("eye-off");

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

  const handleLogInOnSubmit = () => {
    if (!email || !password) {
      setEmail(null);
      setPassword(null);
    } else {
      return navigation.navigate("MainPage");
    }
  };

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
            <Form>
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
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}