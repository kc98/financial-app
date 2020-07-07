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
import { Col, Row, Grid } from "react-native-easy-grid";

import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import InsightsTimeRow from "./InsightsTimeRow";

export default function InsightsDateRow(props) {
  const dataRow = props.insightData.map((row, index) => {
    let amountWithTwoDecimal = parseFloat(row.totalAmount).toFixed(2);
    let name = row.name.charAt(0).toUpperCase() + row.name.slice(1);
    return <InsightsTimeRow key={index} time={name} data={row.categories} />;
  });

  // Calculate daily total
  let dailyTotalAmount = 0;
  for (let periodData of props.insightData) {
    for (let categoryData of periodData.categories) {
      dailyTotalAmount += categoryData.budget;
    }
  }

  return (
    <View>
      <Row style={{ height: 30, marginBottom: 5, marginTop: 10 }}>
        <Text style={[texts.montserratBold, texts.font_15, colors.tertiary]}>
          {props.date} ({props.week}): MYR{" "}
          {parseFloat(dailyTotalAmount).toFixed(2)}
        </Text>
      </Row>
      {dataRow}
    </View>
  );
}
const styles = StyleSheet.create({});
