import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { Container, Header, Content, View, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from "@react-native-community/async-storage";

import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function EntrancePage({ navigation }) {
  const checkIfTokenExists = async () => {
    try {
      let token = await AsyncStorage.getItem("token");

      if (!token) {
        return;
      }

      return navigation.navigate("MainPage");
    } catch (error) {
      console.log(error);

      return;
    }
  };
  checkIfTokenExists();

  return (
    <Container>
      <Header transparent />
      <Grid padder style={{ alignItems: "center" }} scrollEnabled={false}>
        <Row size={4}>
          <Image
            style={styleSheetMain.logoImage}
            source={require("../img/appLogo.png")}
            resizeMode="contain"
          />
        </Row>
        <Row size={6}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GoToButton text="Sign Up" type="secondary" navigateTo="SignUp" />
            <GoToButton
              text="Log In"
              type="primary"
              navigateTo="LogIn"
              buttonStyle={{ marginTop: 64 }}
            />

            {/* <Text
              onPress={() => {
                return navigation.navigate("TransactionList");
              }}
              style={{ marginTop: 40, ...styleSheetMain.underlineGrey }}
            >
              Explore as Guest
            </Text> */}
          </View>
        </Row>
      </Grid>
    </Container>
  );
}
