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
import InsightsTransactionRow from "./InsightsTransactionRow";

export default function InsightsTimeRow(props) {
  let totalAmount = 0;
  const dataRow = props.data.map((row, index) => {
    totalAmount += row.amount;
    let amountWithTwoDecimal = parseFloat(row.amount).toFixed(2);
    return (
      <InsightsTransactionRow
        key={index}
        name={row.name}
        amount={amountWithTwoDecimal}
      />
    );
  });

  return (
    <View>
      <Col size={1} style={{ marginBottom: 15 }}>
        <Row style={{ height: 28 }}>
          <Text
            style={[
              texts.montserratBold,
              texts.font_14,
              colors.black,
              texts.underline,
            ]}
          >
            {props.time} (MYR {parseFloat(totalAmount).toFixed(2)})
          </Text>
        </Row>
        {dataRow}
      </Col>
    </View>
  );
}
const styles = StyleSheet.create({});
