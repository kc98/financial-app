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
  // const dataRow = props.insightData.map((row, index) => {
  //   let amountWithTwoDecimal = parseFloat(row.totalAmount).toFixed(2);
  //   return (
  //     <InsightsTimeRow
  //       key={index}
  //       time={row.time}
  //       insightData={props.insightData}
  //     />
  //   );
  // });
  let totalAmount = 0;
  const morningTotalAmount = props.morningInsightData.map((row, index) => {
    totalAmount += row.amount;
  });
  const afternoonTotalAmount = props.afternoonInsightData.map((row, index) => {
    totalAmount += row.amount;
  });
  const nightTotalAmount = props.nightInsightData.map((row, index) => {
    totalAmount += row.amount;
  });

  return (
    <View>
      <Row style={{ height: 30, marginBottom: 5, marginTop: 10 }}>
        <Text style={[texts.montserratBold, texts.font_15, colors.tertiary]}>
          {props.date} ({props.week}): MYR {parseFloat(totalAmount).toFixed(2)}
        </Text>
      </Row>
      <InsightsTimeRow time={"Morning"} data={props.morningInsightData} />
      <InsightsTimeRow time={"Afternoon"} data={props.afternoonInsightData} />
      <InsightsTimeRow time={"Night"} data={props.nightInsightData} />
    </View>
  );
}
const styles = StyleSheet.create({});
