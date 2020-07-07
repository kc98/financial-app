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
import TransactionInsightRow from "./TransactionInsightRow";

export default function ReportTransactionList(props) {
  const dataRow = props.insightData.map((row, index) => {
    if (row.categories.length != 0) {
      return (
        <TransactionInsightRow
          key={index}
          title={row.name.charAt(0).toUpperCase() + row.name.slice(1)}
          insightData={row.categories}
        />
      );
    }
  });

  if (dataRow && props.insightData.length != 0) {
    return (
      <View>
        <Row
          style={{
            height: 50,
            width: "100%",
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,

            alignItems: "center",
          }}
        >
          <Text style={[texts.montserratBold, texts.font_16]}>{props.day}</Text>
        </Row>

        {dataRow}
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
            There is no {props.title} record in this month.
          </Text>
        </Row>
      </View>
    );
  }
}
