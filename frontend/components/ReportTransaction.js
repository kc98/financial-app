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

import AsyncStorage from "@react-native-community/async-storage";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { widths } from "../styles/widths";
import { buttons } from "../styles/buttons";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import InsightsDateRow from "./InsightsDateRow";

export default function ReportAnalyse({ navigation }) {
  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Text>This is details spending analyse page</Text>
          {/* 
          
          Show:
          - Ending balance
          - Average monthly spending
          - every monday - sunday average spending
          - average every morning to night spending in the day of week
          - average of category spending
           */}
        </ScrollView>
      </Grid>
    </Container>
  );
}
