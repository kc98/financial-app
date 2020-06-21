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
export default function ReportPage() {
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
        <Row style={[styleSheetMain.selectMonthYearContainer]}>
          <Col size={1}></Col>
          <Col size={1} style={[alignments.center]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Text style={[styleSheetMain.selectedMothYearText]}>
                May 2020
              </Text>
            </TouchableOpacity>
          </Col>
          <Col size={1} style={[alignments.centerRight]}>
            <TouchableOpacity style={{ backgroundColor: null }}>
              <Icon
                style={styleSheetMain.dropdownIcon}
                type="AntDesign"
                name="caretdown"
              />
            </TouchableOpacity>
          </Col>
        </Row>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: 120 }}>
            <Row
              style={[
                styleSheetMain.totalTransactionsContainer,
                { marginTop: 20 },
              ]}
            >
              <Col>
                <Text style={{ fontSize: 15 }}>Opening Balance:</Text>
              </Col>
              <Col style={[styleSheetMain.rightContainer, { marginRight: 10 }]}>
                <Text style={{ fontSize: 15 }}>+ RM </Text>
                <Text style={{ fontSize: 15 }}>XXX.XX</Text>
              </Col>
            </Row>
            <Row
              style={[
                styleSheetMain.totalTransactionsContainer,
                { marginTop: 10 },
              ]}
            >
              <Col>
                <Text style={{ fontSize: 15 }}>Ending Balance:</Text>
              </Col>
              <Col style={[styleSheetMain.rightContainer, { marginRight: 10 }]}>
                <Text style={{ fontSize: 15 }}>+ RM </Text>
                <Text style={{ fontSize: 15 }}>XXXX.XX</Text>
              </Col>
            </Row>
            <Row
              style={{
                height: 25,
                marginLeft: 20,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Col></Col>
              <Col
                style={[
                  styleSheetMain.rightContainer,
                  {
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    alignItems: "center",
                    height: 35,
                    marginTop: 5,
                  },
                ]}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>- RM </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  XXXX.XX
                </Text>
              </Col>
            </Row>
          </View>
          <View style={{ height: "100%" }}>
            <TransactionDataRow
              title="Expense"
              transactionData={expenseData}
              navigateTo={"ReportDetailPage"}
            />
            <TransactionDataRow
              title="Income"
              transactionData={incomeData}
              navigateTo={"ReportDetailPage"}
            />
          </View>
        </ScrollView>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({});
