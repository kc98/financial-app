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
  Title,
  Button,
} from "native-base";

import { StyleSheet, Image, Dimensions, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

export default function UserProfilePage({ navigation }) {
  const handlePreferencesOnPress = () => {
    return navigation.navigate("PreferencePage");
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Row style={[alignments.center, { height: 100, marginTop: 30 }]}>
            <View
              style={{
                width: 110,
                height: 110,
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
          <Row style={[alignments.center, { height: 30, marginTop: 20 }]}>
            <Text
              style={[
                texts.montserratBold,
                alignments.center,
                { fontSize: 16 },
              ]}
            >
              YEAP KHOR CHIN
            </Text>
          </Row>
          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              marginLeft: 25,
              marginRight: 25,
              marginBottom: 30,
              borderRadius: 20,
              padding: 25,
            }}
          >
            <Row style={{ marginTop: 5 }}>
              <Col size={2}>
                <Text style={texts.montserratBold}>Name:</Text>
              </Col>
              <Col size={3}>
                <Text style={texts.montserratRegular}> Yeap Khor Chin</Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col size={2}>
                <Text style={texts.montserratBold}>Email:</Text>
              </Col>
              <Col size={3}>
                <Text style={texts.montserratRegular}>
                  testing123@gmail.com
                </Text>
              </Col>
            </Row>
            <Row
              style={[
                alignments.center,
                { height: 30, marginTop: 45, marginBottom: 10 },
              ]}
            >
              <Button style={[styles.primaryButtonRadius25, widths.width_50]}>
                <Text style={[styleSheetMain.buttonTextMedium, colors.white]}>
                  Change
                </Text>
              </Button>
            </Row>
          </View>
          <Row style={[alignments.center, { height: 30 }]}>
            <Button
              style={[
                styleSheetMain.tertiaryButton,
                widths.width_40,
                { height: 48 },
              ]}
              onPress={handlePreferencesOnPress}
            >
              <Text style={[styleSheetMain.buttonTextMedium, colors.black]}>
                Preferences
              </Text>
            </Button>
          </Row>
          <Row
            style={[
              alignments.center,
              { height: 30, marginTop: 40, marginBottom: 40 },
            ]}
          >
            <Button style={[styles.primaryButtonRadius18, widths.width_40]}>
              <Text style={[styleSheetMain.buttonTextMedium, colors.white]}>
                Logout
              </Text>
            </Button>
          </Row>
        </ScrollView>
      </Grid>
    </Container>
  );
}

const styles = StyleSheet.create({
  primaryButtonRadius18: {
    ...buttons.primary,
    ...alignments.center,
    height: 48,
    ...buttons.radius_18,
  },
  primaryButtonRadius25: {
    ...buttons.primary,
    ...alignments.center,
    height: 42,
    ...buttons.radius_25,
  },
});
