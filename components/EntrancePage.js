import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { Container, Header, Content, View, Text } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import Button from "./Button";

import logoImg from "../img/logo.png";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function EntrancePage() {
  return (
    <Container>
      <Header transparent />
      <Grid padder style={{ alignItems: "center" }} scrollEnabled={false}>
        {/* <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        > */}
        <Row size={4}>
          <Image
            style={{
              height: 200,
              width: "80%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "green",
            }}
            source={require("../img/logo.png")}
            resizeMode="contain"
          />
        </Row>
        <Row
          size={6}
          style={
            {
              // height: 100,
              // backgroundColor: "red",
              // alignSelf: "center",
            }
          }
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button text="Sign Up" type="secondary" />
            <Button
              text="Log In"
              type="primary"
              buttonStyle={{ marginTop: 64 }}
            />
          </View>
        </Row>
        {/* </View> */}
      </Grid>
    </Container>
  );
}

const styles = StyleSheet.create({
  logo: {
    // flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    // marginTop: 110,
    // marginBottom: 100,
  },
});
