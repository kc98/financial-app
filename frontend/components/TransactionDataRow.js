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
import TransactionReportList from "./TransactionReportList";

export default function TransactionDataRow(props) {
  const navigation = useNavigation();

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const categoryA = a.category.toUpperCase();
    const categoryB = b.category.toUpperCase();

    let comparison = 0;
    if (categoryA > categoryB) {
      comparison = 1;
    } else if (categoryA < categoryB) {
      comparison = -1;
    }
    return comparison;
  }

  let totalAmount = 0;
  let transactionArray = [];
  let arrangedTransactionArray = [];
  let categoryName = null;
  let nextItem = null;

  transactionArray = props.transactionData.sort(compare);
  for (let i = 0; i < transactionArray.length; i++) {
    totalAmount += transactionArray[i].amount;
    if (props.categoryCombine) {
      if (transactionArray[i].category != categoryName) {
        categoryName = transactionArray[i].category;
        arrangedTransactionArray.push(transactionArray[i]);
      } else {
        let index = arrangedTransactionArray.length - 1;
        arrangedTransactionArray[index].amount += transactionArray[i].amount;
      }
    } else {
      arrangedTransactionArray = transactionArray;
    }
  }

  let descTransactionData = arrangedTransactionArray.sort((a, b) => {
    return b.amount - a.amount;
  });
  let direct;
  const dataRow = descTransactionData.map((row, index) => {
    var ColorCode =
      "hsl(" +
      360 * Math.random() +
      "," +
      (48 + 5 * Math.random()) +
      "%," +
      (55 + 5 * Math.random()) +
      "%)";
    if (props.directTo == "transaction") {
      direct = "transactionId: " + row.id;
    } else if (props.directTo == "reportDetail") {
      direct = "category: " + row.category;
    }

    return (
      <TransactionReportList
        key={index}
        id={row.id}
        name={props.categoryCombine ? row.category : row.description}
        amount={parseFloat(row.amount).toFixed(2)}
        timestamp={row.timestamp}
        percentage={parseFloat((row.amount / totalAmount) * 100).toFixed(2)}
        colorCode={ColorCode}
        navigateTo={props.navigateTo}
        directTo={props.directTo}
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
          <Row
            style={[
              {
                width: "100%",
                height: 40,
                alignItems: "center",

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
                Transaction Description
              </Text>
            </Col>
            <Col size={3}>
              <Text
                style={[
                  alignments.center,
                  texts.montserratMedium,
                  texts.font_15,
                ]}
              >
                Amount
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
                {props.type == "income" ? "Average Income" : "Average Spent"}
              </Text>
            </Col>
          </Row>
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
