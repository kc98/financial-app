import React, { useState } from "react";
import { Text, View } from "native-base";
import { Image, TouchableOpacity } from "react-native";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import { Col, Row, Grid } from "react-native-easy-grid";

export default function TransactionListRow(props) {
  let totalAmount = 0;

  let cost = true;
  if (props.type == "income") {
    cost = false;
  }

  return (
    <Row
      style={{ paddingLeft: 5.5, marginBottom: 15 }}
      onPress={() =>
        props.navigation.navigate("TransactionDetailPage", {
          transactionId: props.id,
        })
      }
    >
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
