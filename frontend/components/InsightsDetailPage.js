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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";

export default function InsightsDetailPage() {
  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <Row
          style={[
            {
              height: 30,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 35,
            },
          ]}
        >
          <Col size={2}>
            <Text style={[texts.montserratBold, texts.font_16]}>
              Average Monthly Spending:
            </Text>
          </Col>
          <Col size={1} style={styleSheetMain.rightContainer}>
            <Text style={[texts.montserratRegular, texts.font_16]}>
              RM 875.80
            </Text>
          </Col>
        </Row>
        <Row
          style={[
            {
              height: 30,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
            },
          ]}
        >
          <Col size={2}>
            <Text style={[texts.montserratBold, texts.font_16]}>
              Your Budget Amount:
            </Text>
          </Col>
          <Col size={1} style={styleSheetMain.rightContainer}>
            <Text style={[texts.montserratRegular, texts.font_16]}>
              RM 800.00
            </Text>
          </Col>
        </Row>
        <Row
          style={[
            {
              height: 35,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
            },
          ]}
        >
          <Text style={[texts.montserratBold, texts.font_15]}>Saving Plan</Text>
        </Row>
        <Col
          style={[
            colors.backgroundWhite,
            { paddingTop: 15, paddingLeft: 20, paddingRight: 20 },
          ]}
        >
          <Row style={{ height: 30 }}>
            <Text
              style={[texts.montserratBold, texts.font_15, colors.tertiary]}
            >
              Today - 9 June 2020 (Monday): RM 50
            </Text>
          </Row>
          <Col size={1}>
            <Row style={{ height: 28 }}>
              <Text
                style={[
                  texts.montserratBold,
                  texts.font_14,
                  colors.black,
                  texts.underline,
                ]}
              >
                Morning
              </Text>
              <Text
                style={[
                  texts.montserratRegular,
                  texts.font_14,
                  colors.black,
                  texts.underline,
                ]}
              >
                (RM 7)
              </Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text
                style={[texts.montserratRegular, texts.font_14, colors.black]}
              >
                Food - RM 5
              </Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text
                style={[texts.montserratRegular, texts.font_14, colors.black]}
              >
                Petrol - RM 30
              </Text>
            </Row>
          </Col>
          <Col size={1}>
            <Row style={{ height: 28 }}>
              <Text
                style={[
                  texts.montserratBold,
                  texts.font_14,
                  colors.black,
                  texts.underline,
                ]}
              >
                Afternoon
              </Text>
              <Text
                style={[
                  texts.montserratRegular,
                  texts.font_14,
                  colors.black,
                  texts.underline,
                ]}
              >
                (RM 7)
              </Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text
                style={[texts.montserratRegular, texts.font_14, colors.black]}
              >
                Food - RM 5
              </Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text
                style={[texts.montserratRegular, texts.font_14, colors.black]}
              >
                Petrol - RM 30
              </Text>
            </Row>
          </Col>
          <Col size={1}>
            <Row style={{ height: 28 }}>
              <Text
                style={[
                  texts.montserratBold,
                  texts.font_15,
                  colors.black,
                  texts.underline,
                ]}
              >
                Dinner
              </Text>
              <Text
                style={[
                  texts.montserratRegular,
                  texts.font_15,
                  colors.black,
                  texts.underline,
                ]}
              >
                (RM 7)
              </Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text
                style={[texts.montserratRegular, texts.font_15, colors.black]}
              >
                Food - RM 5
              </Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text
                style={[texts.montserratRegular, texts.font_15, colors.black]}
              >
                Petrol - RM 30
              </Text>
            </Row>
          </Col>
          <Col>
            <Row>
              <Text>asd</Text>
            </Row>
          </Col>
        </Col>
      </Grid>
    </Container>
  );
}
