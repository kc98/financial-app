import React, { useState, useEffect, useGlobal } from "reactn";
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

import {
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import GoToButton from "./GoToButton";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

import * as api from "../api";

export default function UserProfilePage({ navigation }) {
  const [userData, setUserData] = useGlobal("userData");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, reload] = useGlobal("refresh");

  useEffect(() => {
    getUser();
  }, [refresh]);

  const handlePreferencesOnPress = () => {
    return navigation.navigate("PreferencePage");
  };

  const handleProfileChangeOnPress = () => {
    return navigation.navigate("EditUserProfilePage", {
      onBack: () => navigation.refresh(),
    });
  };

  const handleLogoutAlertYesOnPress = async () => {
    try {
      await AsyncStorage.clear();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Transactions" }],
        })
      );

      return navigation.navigate("EntrancePage");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutOnPress = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure to logout the application?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: handleLogoutAlertYesOnPress,
        },
      ]
    );
  };

  const getUser = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let response = await api.me(token);

      let userData2 = response.data;
      setUserData(userData2);

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      try {
        await AsyncStorage.clear();
      } finally {
        return navigation.navigate("EntrancePage");
      }
    }
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        {isLoading ? (
          <View
            style={[
              {
                height: "100%",
                width: "100%",
              },
              alignments.center,
            ]}
          >
            <ActivityIndicator
              // style={alignments.center}
              size="large"
              color="#3C9A46"
            />
          </View>
        ) : (
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
                {userData.name}
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
                  <Text style={texts.montserratRegular}>{userData.name}</Text>
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col size={2}>
                  <Text style={texts.montserratBold}>Email:</Text>
                </Col>
                <Col size={3}>
                  <Text style={texts.montserratRegular}>{userData.email}</Text>
                </Col>
              </Row>
              <Row
                style={[
                  alignments.center,
                  { height: 30, marginTop: 45, marginBottom: 10 },
                ]}
              >
                <Button
                  style={[styles.primaryButtonRadius25, widths.width_50]}
                  onPress={handleProfileChangeOnPress}
                >
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
                  widths.width_50,
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
              <Button
                style={[styles.primaryButtonRadius18, widths.width_50]}
                onPress={handleLogoutOnPress}
              >
                <Text style={[styleSheetMain.buttonTextMedium, colors.white]}>
                  Logout
                </Text>
              </Button>
            </Row>
          </ScrollView>
        )}
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
