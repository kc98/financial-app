import React, { useState, useEffect } from "react";
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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import YearMonthPicker from "./YearMonthPicker";
import TransactionReportList from "./TransactionReportList";
import TransactionDataRow from "./TransactionDataRow";

import * as api from "../api";

//{ navigation }
export default function ReportPage() {
  // const expenseData = [
  //   { key: 1, name: "Food", totalAmount: 300, percentage: "46%" },
  //   { key: 2, name: "Movie", totalAmount: 200, percentage: "31%" },
  //   { key: 3, name: "Parking", totalAmount: 150, percentage: "23%" },
  //   { key: 4, name: "Printing", totalAmount: 50, percentage: "13%" },
  //   { key: 5, name: "Shopping", totalAmount: 50, percentage: "13%" },
  //   { key: 6, name: "Printing", totalAmount: 130, percentage: "2%" },
  // ];

  const incomeData = [
    { key: 1, name: "Income #1", totalAmount: 3000, percentage: "75%" },
    { key: 2, name: "Income #2", totalAmount: 500, percentage: "10%" },
    { key: 3, name: "Income #3", totalAmount: 150, percentage: "5%" },
  ];

  const [transactionData, setTransactionData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const checkUserToken = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let response = await api.me(token);
      // console.log("ping");
    } catch (error) {
      console.log(error.response.data);
      await AsyncStorage.clear();
      return navigation.navigate("EntrancePage");
    }
  };
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
    await checkUserToken();
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let month = moment().subtract(4, "months").format("MMMM");
      let year = moment().format("YYYY");
      let response = await api.getTransactionList(token, month, year);
      let transactionData = response.data.sort(compare);

      setTransactionData(transactionData);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  let totalExpense = 0;
  let totalIncome = 0;

  let expenseArray = [];
  let incomeArray = [];
  var i;
  let categoryName = null;

  for (i = 0; i < transactionData.length; i++) {
    // if (transactionData[i].category != categoryName) {
    //   categoryName = transactionData[i].category;
    //   console.log(categoryName);
    console.log(transactionData[i].category);
    if (transactionData[i].type == "expense") {
      expenseArray.push(transactionData[i]);
    } else {
      incomeArray.push(transactionData[i]);
    }
    // }
  }
  const dataRow = transactionData.map((row, index) => {
    if (row.type == "expense") {
      totalExpense += row.amount;
    } else if (row.type == "income") {
      totalIncome += row.amount;
    }
    let amountWithTwoDecimal = parseFloat(row.amount).toFixed(2);
    // if (row.category != categoryName) {
    //   categoryName = row.category;
    // }
    // if (row.type == "expense") {
    //   expenseArray.push(row);
    // } else {
    //   incomeArray.push(row);
    // }
    // if (moment(row.timestamp).date() != currentDay) {
    //   currentDay = moment(row.timestamp).date();
    //   return (
    //     <TransactionContainer
    //       key={index}
    //       date={moment(row.timestamp).format("DD")}
    //       dayOfWeek={moment(row.timestamp).format("dddd")}
    //       monthYear={moment(row.timestamp).format("MMM YYYY")}
    //       transactionData={transactionData}
    //     />
    //   );
    // }
  });
  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        <Row style={[styleSheetMain.selectMonthYearContainer]}>
          <TouchableOpacity style={{ backgroundColor: null, width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Col size={1}></Col>
              <Col size={1} style={[alignments.center]}>
                <Text style={[styleSheetMain.selectedMothYearText]}>
                  {moment().format("MMMM YYYY")}
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
                title="Income"
                transactionData={expenseArray}
                navigateTo={"ReportDetailPage"}
              />
              <TransactionDataRow
                title="Income"
                transactionData={incomeArray}
                navigateTo={"ReportDetailPage"}
              />
            </View>
          )}
        </ScrollView>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({});
