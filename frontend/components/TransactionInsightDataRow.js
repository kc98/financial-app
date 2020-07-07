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
import moment from "moment";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import PreferencePage from "./PreferencePage";
import ReportDetailPage from "./ReportDetailPage";

export default function TransactionInsightDataRow(props) {
  return (
    <Row
      style={[
        colors.backgroundWhite,
        {
          width: "100%",
          height: 40,
          alignItems: "center",
          borderWidth: 1,
          marginTop: 10,
        },
      ]}
    >
      <Col size={4} style={{ paddingLeft: 10 }}>
        <Text
          style={[
            texts.montserratRegular,
            texts.font_15,
            { alignItems: "center" },
          ]}
        >
          {props.name.length <= 38
            ? `${props.name}`
            : `${props.name.substring(0, 35)}...`}
        </Text>
      </Col>
      <Col size={3}>
        <Text
          style={[alignments.center, texts.montserratRegular, texts.font_15]}
        >
          MYR {props.amount}
        </Text>
      </Col>
      <Col
        size={1.5}
        style={[
          alignments.center,
          {
            height: "100%",
            backgroundColor: props.colorCode,
            borderLeftWidth: 1,
          },
        ]}
      >
        <Text style={[texts.montserratRegular, texts.font_15]}>
          {props.percentage}%
        </Text>
      </Col>
    </Row>
  );
}
const styles = StyleSheet.create({});
