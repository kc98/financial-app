import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { Container, Header, Content, View, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function EntrancePage({ navigation }) {
  return (
    <Container>
      <Header transparent />
      <Grid padder style={{ alignItems: "center" }} scrollEnabled={false}>
        <Row size={4}>
          <Image
            style={styleSheetMain.logoImage}
            source={require("../img/logo.png")}
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
          </View>
        </Row>
      </Grid>
    </Container>
  );
}
