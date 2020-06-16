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

import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import YearMonthPicker from "./YearMonthPicker";
import TransactionReportList from "./TransactionReportList";
import TransactionDataRow from "./TransactionDataRow";

//{ navigation }
export default function ReportDetailPage() {
  const expenseData = [
    { key: 1, name: "Food", totalAmount: 300, percentage: "46%" },
    { key: 2, name: "Movie", totalAmount: 200, percentage: "31%" },
    { key: 3, name: "Parking", totalAmount: 150, percentage: "23%" },
    { key: 4, name: "Printing", totalAmount: 50, percentage: "13%" },
    { key: 5, name: "Shopping", totalAmount: 50, percentage: "13%" },
    { key: 6, name: "Printing", totalAmount: 130, percentage: "2%" },
  ];

  const incomeData = [
    { key: 1, name: "Income #1", totalAmount: 3000, percentage: "75%" },
    { key: 2, name: "Income #2", totalAmount: 500, percentage: "10%" },
    { key: 3, name: "Income #3", totalAmount: 150, percentage: "5%" },
  ];

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <TransactionDataRow
            title="Food"
            transactionData={expenseData}
            navigateTo={"TransactionDetailPage"}
          />
        </ScrollView>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({});
