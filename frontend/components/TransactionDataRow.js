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
import TransactionReportList from "./TransactionReportList";

export default function TransactionDataRow(props) {
  // console.log(props);
  const navigation = useNavigation();

  let totalAmount = 0;
  let descTransactionDate = props.transactionData.sort((a, b) => {
    return parseFloat(b.amount).toFixed(2) - parseFloat(a.amount).toFixed(2);
  });
  var i;
  for (i = 0; i < props.transactionData.length; i++) {
    totalAmount += props.transactionData[i].amount;
  }

  const dataRow = descTransactionDate.map((row, index) => {
    var ColorCode =
      "hsl(" +
      360 * Math.random() +
      "," +
      (48 + 5 * Math.random()) +
      "%," +
      (55 + 5 * Math.random()) +
      "%)";

    return (
      <TransactionReportList
        key={index}
        name={row.category}
        amount={parseFloat(row.amount).toFixed(2)}
        percentage={parseFloat((row.amount / totalAmount) * 100).toFixed(2)}
        colorCode={ColorCode}
        navigateTo={props.navigateTo}
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
