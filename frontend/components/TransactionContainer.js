import React, { useState } from "react";
import { Text, View } from "native-base";
import { Image } from "react-native";
import moment from "moment";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import { Col, Row, Grid } from "react-native-easy-grid";
import TransactionListRow from "./TransactionListRow";

export default function TransactionContainer(props) {
  let totalIncome = 0;
  let totalExpense = 0;
  let amountOfDay = 0;
  const dataRow = props.transactionData.map((row, index) => {
    let amountWithTwoDecimal = parseFloat(row.amount).toFixed(2);

    if (moment(row.timestamp).date() == props.date) {
      // TODO
      if (row.type == "expense") {
        totalExpense += row.amount;
      } else if (row.type == "income") {
        totalIncome += row.amount;
      }
      amountOfDay = totalIncome - totalExpense;
    }
  });

  return (
    <Col style={[styleSheetMain.transactionListContainer, { marginTop: 40 }]}>
      <Row
        style={{
          marginLeft: 5,
          height: 70,
          alignItems: "center",
        }}
      >
        <Col style={{ width: 45, height: 40, justifyContent: "center" }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 32, textAlign: "center" }}
          >
            {props.date}
          </Text>
        </Col>
        <Col style={{ width: 100, height: 40 }}>
          <Row>
            <Text style={{ fontSize: 14 }}>{props.dayOfWeek}</Text>
          </Row>
          <Row>
            <Text style={{ fontSize: 14 }}>{props.monthYear}</Text>
          </Row>
        </Col>
        <Col
          style={[
            styleSheetMain.rightContainer,
            { height: 40, marginRight: 10 },
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {parseFloat(amountOfDay).toFixed(2)}
          </Text>
        </Col>
      </Row>

      {props.transactionData.map((row, index) => {
        if (moment(row.timestamp).date() == props.date)
          return (
            <TransactionListRow
              key={index}
              id={row.id}
              category={row.category}
              description={row.description}
              amount={row.amount}
              type={row.type}
              navigation={props.navigation}
            />
          );
        else {
          return null;
        }
      })}
    </Col>
  );
}
