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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import TransactionReportList from "./TransactionReportList";
import YearMonthPicker from "./YearMonthPicker";

export default function TransactionDataRow(props) {
  const navigation = useNavigation();
  const dataRow = props.transactionData.map((row, index) => {
    var ColorCode =
      "hsl(" +
      360 * Math.random() +
      "," +
      (48 + 5 * Math.random()) +
      "%," +
      (55 + 5 * Math.random()) +
      "%)";

    let amountWithTwoDecimal = parseFloat(row.totalAmount).toFixed(2);
    return (
      <TransactionReportList
        key={index}
        name={row.name}
        amount={amountWithTwoDecimal}
        percentage={row.percentage}
        colorCode={ColorCode}
      />
    );
  });

  if (dataRow && props.transactionData.length != 0) {
    return (
      <View>
        <Row
          style={{
            height: 50,
            width: "100%",
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,

            alignItems: "center",
          }}
        >
          <Text style={[texts.montserratBold, texts.font_16]}>
            {props.title}
          </Text>
        </Row>
        <Col
          style={[
            {
              width: "100%",
              paddingLeft: 15,
              paddingBottom: 15,
              paddingRight: 15,
              marginBottom: 25,
            },
          ]}
        >
          {dataRow}
        </Col>
      </View>
    );
  } else {
    return (
      <View>
        <Row
          style={{
            height: 50,
            width: "100%",
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,

            alignItems: "center",
          }}
        >
          <Text style={[texts.montserratBold, texts.font_16]}>
            {props.title}
          </Text>
        </Row>
        <Row
          style={[
            {
              width: "100%",
              paddingLeft: 15,
              paddingBottom: 15,
              paddingRight: 15,
              marginBottom: 25,
            },
          ]}
        >
          <Text style={[texts.montserratRegular, texts.font_14]}>
            There is not any {props.title} record in this month.
          </Text>
        </Row>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
