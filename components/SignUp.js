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

import { StyleSheet, Image, Dimensions, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styleSheetMain } from "../styles/styleSheetMain";
import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import GoToButton from "./GoToButton";

export default function SignUp({ navigation }) {
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

  return (
    <Container>
      <Header transparent>
        <Left>
          <GoToButton type="goBack" />
        </Left>
        <Body />
        <Right />
      </Header>
      {/* <Content> */}
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 2,
            }}
          >
            <Image
              style={styleSheetMain.logoImage}
              source={require("../img/logo.png")}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 4,
              // flexDirection: "column",
              // alignItems: "stretch",
              // justifyContent: "flex-end",
              marginLeft: "12%",
              marginRight: "12%",
            }}
          >
            <Form>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>First Name</Label>
                <Input style={texts.montserratRegular} />
              </Item>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Last Name</Label>
                <Input style={texts.montserratRegular} />
              </Item>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Email</Label>
                <Input style={texts.montserratRegular} />
              </Item>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>Password</Label>
                <Input
                  secureTextEntry={securePasswordTextEntry}
                  style={texts.montserratRegular}
                />
                <Icon
                  name={passwordShowIcon}
                  onPress={handleShowPasswordIconOnPress}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styleSheetMain.labelBlack}>
                  Confirm Password
                </Label>
                <Input
                  secureTextEntry={secureConfirmPasswordTextEntry}
                  style={texts.montserratRegular}
                />
                <Icon
                  name={confirmPasswordShowIcon}
                  onPress={handleShowConfirmPasswordIconOnPress}
                />
              </Item>
            </Form>
          </View>
          <View
            style={{
              flex: 1,
              // flexDirection: "column",
              // alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <GoToButton text="Sign Up" type="primary" navigateTo="SignUp" />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* </Content> */}
    </Container>
  );
}
