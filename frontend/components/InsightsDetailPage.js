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

export default function InsightsDetailPage() {
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

  let currentDateMonthYear = moment().format("DD MMM YYYY");
  let nextWeek = moment().add(6, "day").format("DD MMM YYYY");
  let dummyDataDays = [0, 1, 2, 3, 4, 5, 6];

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
                height: 35,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 30,
              },
            ]}
          >
            <Text style={[texts.montserratBold, texts.font_15]}>
              Saving Plan ({currentDateMonthYear} - {nextWeek})
            </Text>
          </Row>
          <Col
            style={[colors.backgroundWhite, { padding: 20, marginBottom: 20 }]}
          >
            {dummyDataDays.map((day, index) => (
              <InsightsDateRow
                key={index}
                date={moment().add(day, "day").format("DD MMM YYYY")}
                week={moment().add(day, "day").format("dddd")}
                morningInsightData={morningInsight}
                afternoonInsightData={afternoonInsight}
                nightInsightData={nightInsight}
              />
            ))}
          </Col>
        </ScrollView>
      </Grid>
    </Container>
  );
}
