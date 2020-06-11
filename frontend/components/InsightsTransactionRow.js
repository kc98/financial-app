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

export default function InsightsTransactionRow(props) {
  return (
    <View>
      <Row style={{ height: 25 }}>
        <Text style={[texts.montserratRegular, texts.font_14, colors.black]}>
          {props.name} - MYR {props.amount}
        </Text>
      </Row>
    </View>
  );
}
const styles = StyleSheet.create({});
