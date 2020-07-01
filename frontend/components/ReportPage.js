import React, { useState, useEffect, useGlobal } from "reactn";
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
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import MonthPicker from "react-native-month-picker";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";

import TransactionReportList from "./TransactionReportList";
import TransactionDataRow from "./TransactionDataRow";

import * as api from "../api";

//{ navigation }
export default function ReportPage({ navigation }) {
  const [transactionData, setTransactionData] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [refresh, reload] = useGlobal("refresh");

  useEffect(() => {
    loadData();
  }, [date, refresh]);

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const categoryA = a.category.toUpperCase();
    const categoryB = b.category.toUpperCase();

    let comparison = 0;
    if (categoryA > categoryB) {
      comparison = 1;
    } else if (categoryA < categoryB) {
      comparison = -1;
    }
    return comparison;
  }
  const loadData = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let month = moment(date).format("MMMM");
      let year = moment(date).format("YYYY");
      let response = await api.getTransactionList(token, month, year);
      let transactionData = response.data.transactions.sort(compare);

      setOpeningBalance(response.data.opening_balance);
      setTransactionData(transactionData);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status == 401) {
        await AsyncStorage.clear();
        return navigation.navigate("EntrancePage");
      } else {
        // Unhandled errors
        console.log(error.response);
      }
    }
  };

  let totalExpense = 0;
  let totalIncome = 0;

  let expenseArray = [];
  let incomeArray = [];
  var i;

  for (i = 0; i < transactionData.length; i++) {
    if (transactionData[i].type == "expense") {
      expenseArray.push(transactionData[i]);
      totalExpense += transactionData[i].amount;
    } else {
      incomeArray.push(transactionData[i]);
      totalIncome += transactionData[i].amount;
    }
  }

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        <Row style={[styleSheetMain.selectMonthYearContainer]}>
          <TouchableOpacity
            style={{ backgroundColor: null, width: "100%" }}
            onPress={() => setShow(!show)}
          >
            <View style={{ flexDirection: "row" }}>
              <Col size={1}></Col>
              <Col size={2} style={[alignments.center]}>
                <Text style={[styleSheetMain.selectedMothYearText]}>
                  {moment(date).format("MMMM YYYY")}
                </Text>
              </Col>
              <Col size={1} style={[alignments.centerRight]}>
                <Icon
                  style={styleSheetMain.dropdownIcon}
                  type="AntDesign"
                  name="caretdown"
                />
              </Col>
            </View>
          </TouchableOpacity>
        </Row>
        {show && (
          <MonthPicker
            selectedDate={date}
            onMonthChange={(newDate) => {
              setDate(newDate);
              setShow(false);
            }}
            onYearChange={setDate}
            maxDate={moment()}
            minDate={moment("01-01-1995", "DD-MM-YYYY")}
            currentMonthTextStyle={{ color: "#0aa9c2" }}
          />
        )}
        {!show && (
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
                <Col
                  style={[styleSheetMain.rightContainer, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 15 }}>
                    {openingBalance < 0 ? "-" : "+"} MYR{" "}
                    {parseFloat(Math.abs(openingBalance)).toFixed(2)}
                  </Text>
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
                <Col
                  style={[styleSheetMain.rightContainer, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 15 }}>
                    {openingBalance - totalExpense + totalIncome < 0
                      ? "-"
                      : "+"}{" "}
                    MYR{" "}
                    {parseFloat(
                      Math.abs(openingBalance - totalExpense + totalIncome)
                    ).toFixed(2)}
                  </Text>
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
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {totalIncome - totalExpense < 0 ? "-" : "+"} MYR{" "}
                    {parseFloat(Math.abs(totalIncome - totalExpense)).toFixed(
                      2
                    )}
                  </Text>
                </Col>
              </Row>
            </View>

            {isLoading ? (
              <View style={{ height: "100%" }}>
                <ActivityIndicator
                  style={{
                    paddingTop: 60,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  size="large"
                  color="#3C9A46"
                />
              </View>
            ) : (
              <View style={{ height: "100%" }}>
                <TransactionDataRow
                  title="Expense"
                  type="expense"
                  transactionData={expenseArray}
                  categoryCombine={true}
                  navigateTo={"ReportDetailPage"}
                  directTo={"category"}
                />
                <TransactionDataRow
                  title="Income"
                  type="income"
                  transactionData={incomeArray}
                  categoryCombine={true}
                  navigateTo={"ReportDetailPage"}
                  directTo={"category"}
                />
              </View>
            )}
          </ScrollView>
        )}
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({});
