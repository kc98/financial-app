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

import { StyleSheet, Image, Dimensions, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePasswordText, setSecurePasswordText] = useState(true);
  const [passwordShowIcon, setPasswordShowIcon] = useState("eye-off");

  const handleShowPasswordIconOnPress = () => {
    if (passwordShowIcon == "eye") setPasswordShowIcon("eye-off");
    else setPasswordShowIcon("eye");

    setSecurePasswordText(!securePasswordText);
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
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 4 }}>
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
            </Form>
          </View>
          <View style={{ flex: 2 }}>
            <GoToButton text="Log In" type="primary" navigateTo="SignUp" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
}
