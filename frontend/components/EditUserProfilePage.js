import React, { useState, useEffect } from "react";
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

import { StyleSheet, Image, Dimensions, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

import * as api from "../api";

export default function EditUserProfilePage({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const handleNameOnChange = (event) => {
    let inputName = event.nativeEvent.text;
    setName(inputName);
  };

  const handleEmailOnChange = (event) => {
    let inputEmail = event.nativeEvent.text;
    setEmail(inputEmail);
  };

  const handleUpdateProfileOnSubmit = () => {
    if (!email || !name) {
      setName(user.name);
      setEmail(user.email);
      Alert.alert("Invalid Data", "Your name and email cannot be empty.", [
        { text: "OK" },
      ]);
    } else {
      Alert.alert(
        "Update successfully!",
        "Your profile has been updated. name: " + name + " email: " + email,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  };

  const handleCancelUpdateProfileOnSubmit = () => {
    Alert.alert(
      "Cancel Confirmation",
      "Are you sure to cancel updating? \nYour change(s) will not be saved and updated.",
      [{ text: "No" }, { text: "Yes", onPress: () => navigation.goBack() }]
    );
  };

  const handleChangePasswordOnSubmit = () => {
    return navigation.navigate("ChangePasswordPage");
  };
  useEffect(() => {
    checkUserToken();
  }, []);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserToken = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let response = await api.me(token);
      let userData = response.data;
      setUserData(userData);
      setName(userData.name);
      setEmail(userData.email);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      await AsyncStorage.clear();
      return navigation.navigate("EntrancePage");
    }
  };
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
                  // borderWidth: 1,
                  borderRadius: 70,
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: 15,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={require("../img/user.png")}
                />
              </View>
            </Row>
            <Row
              size={1}
              style={[alignments.center, { height: 20, marginTop: 20 }]}
            >
              <Text
                style={[
                  texts.montserratBold,
                  alignments.center,
                  { fontSize: 16 },
                ]}
              >
                {userData.name}
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
              <Row
                size={3}
                style={{
                  marginTop: 8,
                  alignItems: "center",
                  height: 30,
                }}
              >
                <Col size={2}>
                  <Text style={texts.montserratBold}>Name:</Text>
                </Col>
                <Col size={4}>
                  <Input
                    style={[
                      styleSheetMain.labelBlack,
                      texts.font_15,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: "#4EAE58",
                      },
                    ]}
                    onChange={handleNameOnChange}
                    value={name}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 30, alignItems: "center", height: 30 }}>
                <Col size={2}>
                  <Text style={texts.montserratBold}>Email:</Text>
                </Col>
                <Col size={4}>
                  <Input
                    style={[
                      styleSheetMain.labelBlack,
                      texts.font_15,
                      {
                        borderBottomWidth: 1,
                        borderBottomColor: "#4EAE58",
                      },
                    ]}
                    onChange={handleEmailOnChange}
                    value={email}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 35, alignItems: "center" }}>
                <Col size={2}>
                  <Text style={texts.montserratBold}>Password:</Text>
                </Col>
                <Col size={4}>
                  <Button
                    style={[styles.primaryButtonRadius18]}
                    onPress={handleChangePasswordOnSubmit}
                  >
                    <Text
                      style={[
                        texts.montserratRegular,
                        texts.font_14,
                        colors.black,
                      ]}
                    >
                      Change Password
                    </Text>
                  </Button>
                </Col>
              </Row>
              <Row
                style={[
                  alignments.center,
                  { height: 30, marginTop: 55, marginBottom: 10 },
                ]}
              >
                <Button
                  style={[styles.primaryButtonRadius25, widths.width_50]}
                  onPress={handleUpdateProfileOnSubmit}
                >
                  <Text style={[styleSheetMain.buttonTextMedium, colors.white]}>
                    Update
                  </Text>
                </Button>
              </Row>
              <Row
                style={[
                  alignments.center,
                  { height: 30, marginTop: 25, marginBottom: 10 },
                ]}
              >
                <Button
                  style={[styles.secondaryButtonRadius25, widths.width_50]}
                  onPress={handleCancelUpdateProfileOnSubmit}
                >
                  <Text style={[styleSheetMain.buttonTextMedium, colors.black]}>
                    Cancel
                  </Text>
                </Button>
              </Row>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </Grid>
    </Container>
  );
}

const styles = StyleSheet.create({
  primaryButtonRadius18: {
    ...buttons.secondary,
    ...alignments.center,
    borderWidth: 1,
    height: 38,
    ...buttons.radius_16,
  },
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
