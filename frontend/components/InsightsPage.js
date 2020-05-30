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

export default function InsightsPage() {
  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <Row
          style={[
            {
              height: 35,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 35,
            },
          ]}
        >
          <Text style={[texts.montserratBold]}>Saving Plan</Text>
        </Row>
        <Row
          style={[
            colors.backgroundWhite,
            { paddingTop: 15, paddingLeft: 20, paddingRight: 20 },
          ]}
        >
          <Text style={[texts.montserratBold, texts.font_15, colors.tertiary]}>
            Day 1: RM 50
          </Text>
        </Row>
      </Grid>
    </Container>
  );
}
