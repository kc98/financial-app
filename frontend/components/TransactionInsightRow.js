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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import TransactionInsightDataRow from "./TransactionInsightDataRow";

export default function TransactionInsightRow(props) {
  const navigation = useNavigation();

  //   transactionArray = props.transactionData.sort(compare);
  //   for (let i = 0; i < transactionArray.length; i++) {
  //     totalAmount += transactionArray[i].amount;
  //     if (props.categoryCombine) {
  //       if (transactionArray[i].category != categoryName) {
  //         categoryName = transactionArray[i].category;
  //         arrangedTransactionArray.push(transactionArray[i]);
  //       } else {
  //         let index = arrangedTransactionArray.length - 1;
  //         arrangedTransactionArray[index].amount += transactionArray[i].amount;
  //       }
  //     } else {
  //       arrangedTransactionArray = transactionArray;
  //     }
  //   }

  const dataRow = props.insightData.map((row, index) => {
    var ColorCode =
      "hsl(" +
      360 * Math.random() +
      "," +
      (48 + 5 * Math.random()) +
      "%," +
      (55 + 5 * Math.random()) +
      "%)";
    return (
      <TransactionInsightDataRow
        key={index}
        id={row.id}
        name={row.name}
        amount={parseFloat(row.amount).toFixed(2)}
        timestamp={row.timestamp}
        percentage={parseFloat(row.average).toFixed(2)}
        colorCode={ColorCode}
      />
    );
  });

  if (dataRow && props.insightData.length != 0) {
    return (
      <View>
        <Row
          style={{
            height: 30,
            width: "100%",
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: "center",
          }}
        >
          <Text style={[texts.montserratBold, texts.font_14]}>
            {props.title}
          </Text>
        </Row>
        <Row
          style={[
            {
              width: "100%",
              height: 40,
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 10,
            },
          ]}
        >
          <Col size={5}>
            <Text
              style={[
                texts.montserratMedium,
                texts.font_15,
                { alignItems: "center" },
              ]}
            >
              Category Name
            </Text>
          </Col>
          <Col size={3}>
            <Text
              style={[alignments.center, texts.montserratMedium, texts.font_15]}
            >
              Total Spent
            </Text>
          </Col>
          <Col
            size={1.8}
            style={[
              alignments.center,
              {
                height: "100%",
                backgroundColor: props.colorCode,
              },
            ]}
          >
            <Text
              style={[
                texts.montserratMedium,
                texts.font_15,
                { textAlign: "center" },
              ]}
            >
              Average Spent
            </Text>
          </Col>
        </Row>
        <Col
          style={[
            {
              width: "100%",
              paddingLeft: 10,
              paddingBottom: 15,
              paddingRight: 10,
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
          <Text style={[texts.montserratBold, texts.font_14]}>
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
            There is no {props.title} record in this month.
          </Text>
        </Row>
      </View>
    );
  }
}
