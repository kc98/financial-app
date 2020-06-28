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

import AsyncStorage from "@react-native-community/async-storage";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { widths } from "../styles/widths";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import InsightsDateRow from "./InsightsDateRow";

export default function InsightsPage({ navigation }) {
  // const insightData = [
  //   { key: 1, time: "Morning", name: "Food", amount: 5 },
  //   { key: 2, time: "Morning", name: "Movie", amount: 20 },
  //   { key: 3, time: "Afternoon", name: "Food", amount: 10 },
  //   { key: 4, time: "Afternoon", name: "Parking", amount: 10 },
  //   { key: 5, time: "Afternoon", name: "Shopping", amount: 50 },
  //   { key: 6, time: "Night", name: "Food", amount: 10 },
  //   { key: 7, time: "Night", name: "Printing", amount: 5 },
  // ];
  const morningInsight = [
    { key: 1, name: "Food", amount: 5.8 },
    { key: 2, name: "Movie", amount: 21 },
  ];

  const afternoonInsight = [
    { key: 1, name: "Food", amount: 10.5 },
    { key: 2, name: "Parking", amount: 10 },
    { key: 3, name: "Shopping", amount: 50 },
  ];

  const nightInsight = [
    { key: 1, name: "Food", amount: 10 },
    { key: 2, name: "Printing", amount: 5 },
  ];
  const handleInsightsDetailOnPress = () => {
    return navigation.navigate("InsightsDetailPage");
  };
  const [test, setTest] = useState(true);
  const getUser = async () => {
    // setTest(false);
    let token = await AsyncStorage.getItem("token");
    // setTest(true);
  };
  getUser();
  console.log("this is insight page yoooo");
  console.log(test);
  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Row
            style={[
              {
                height: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 40,
              },
            ]}
          >
            <Col size={2}>
              <Text style={[texts.montserratBold, texts.font_16]}>
                Average Monthly Spending:
              </Text>
            </Col>
            <Col size={1} style={styleSheetMain.rightContainer}>
              <Text style={[texts.montserratRegular, texts.font_16]}>
                MYR 875.80
              </Text>
            </Col>
          </Row>
          <Row
            style={[
              {
                height: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
              },
            ]}
          >
            <Col size={2}>
              <Text style={[texts.montserratBold, texts.font_16]}>
                Your Budget Amount:
              </Text>
            </Col>
            <Col size={1} style={styleSheetMain.rightContainer}>
              <Text style={[texts.montserratRegular, texts.font_16]}>
                MYR 800.00
              </Text>
            </Col>
          </Row>
          <Row
            style={[
              {
                height: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
              },
            ]}
          >
            <Col
              size={3}
              style={{
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[texts.montserratBold, texts.font_15]}>
                Details of your transactions:
              </Text>
            </Col>
            <Col size={1} style={styleSheetMain.centerContainer}>
              <Button
                style={[
                  buttons.primary,
                  alignments.center,
                  {
                    height: 35,
                    width: 85,
                    borderRadius: 12,
                  },
                ]}
                onPress={() => navigation.navigate("ReportTransaction")}
              >
                <Text style={[texts.montserratRegular, texts.font_16]}>
                  View
                </Text>
              </Button>
            </Col>
          </Row>
          <Row
            style={[
              {
                height: 35,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 30,
              },
            ]}
          >
            <Text style={[texts.montserratBold, texts.font_15]}>
              Saving Plan
            </Text>
          </Row>
          <Col
            style={[colors.backgroundWhite, { padding: 20, marginBottom: 20 }]}
          >
            <InsightsDateRow
              date={moment().format("DD MMM YYYY")}
              week={moment().format("dddd")}
              morningInsightData={morningInsight}
              afternoonInsightData={afternoonInsight}
              nightInsightData={nightInsight}
            />
            <Col size={1}>
              <Row>
                <Button
                  style={[
                    buttons.primary,
                    alignments.center,
                    widths.width_40,
                    { height: 35, borderRadius: 12 },
                  ]}
                  onPress={handleInsightsDetailOnPress}
                >
                  <Text
                    style={[
                      texts.montserratRegular,
                      texts.font_14,
                      colors.white,
                    ]}
                  >
                    View Details
                  </Text>
                </Button>
              </Row>
            </Col>
          </Col>
        </ScrollView>
      </Grid>
    </Container>
  );
}
