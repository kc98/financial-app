import React, { useState } from "react";
import { Text, View } from "native-base";
import { Image } from "react-native";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import { Col, Row, Grid } from "react-native-easy-grid";

export default function TransactionListRow(props) {
  let totalAmount = 0;
  // const dataRow = props.transactionData.map((row, index) => {
  //   totalAmount += row.amount;
  //   let amountWithTwoDecimal = parseFloat(row.amount).toFixed(2);
  //   return (
  //     <TransactionContainer
  //     key={index}
  //             date="9"
  //             dayOfWeek="Sunday"
  //             monthYear="May 2020"
  //             transactionType="expense"
  //             transactionCategory="fuel"
  //           />
  //   );
  // });

  let cost = true;
  if (props.type == "income") {
    cost = false;
  }

  return (
    <Row style={{ paddingLeft: 10, marginBottom: 15 }}>
      <Col>
        <Row>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {props.category}
          </Text>
        </Row>
        <Row>
          <Text style={{ fontSize: 14 }}>{props.description}</Text>
        </Row>
      </Col>
      <Col style={[alignments.centerRight, { marginRight: 10 }]}>
        <Text
          style={[
            { fontSize: 18, fontWeight: "bold" },
            cost ? colors.red : colors.tertiary,
          ]}
        >
          {props.amount.toFixed(2)}
        </Text>
      </Col>
    </Row>
  );
}