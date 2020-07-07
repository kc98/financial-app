import React, { useState, useEffect, useGlobal } from "reactn";
import {
  Text,
  Container,
  Header,
  Picker,
  View,
  Icon,
  Button,
} from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
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
import TransactionContainer from "./TransactionContainer";

import * as api from "../api";

export default function TransactionList({ navigation }) {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [refresh, reload] = useGlobal("refresh");

  useEffect(() => {
    loadData();
  }, [date, refresh]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      let month = moment(date).format("MMMM");
      let year = moment(date).format("YYYY");
      let response = await api.getTransactionList(token, month, year);
      let transactionData = response.data.transactions.sort(
        (a, b) =>
          moment(b.timestamp).format("YYYYMMDD") -
          moment(a.timestamp).format("YYYYMMDD")
      );
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
  let currentDay = null;
  const dataRow = transactionData.map((row, index) => {
    if (row.type == "expense") {
      totalExpense += row.amount;
    } else if (row.type == "income") {
      totalIncome += row.amount;
    }

    if (moment(row.timestamp).utc().date() != currentDay) {
      currentDay = moment(row.timestamp).utc().date();

      return (
        <TransactionContainer
          key={index}
          date={moment(row.timestamp).utc().format("DD")}
          dayOfWeek={moment(row.timestamp).utc().format("dddd")}
          monthYear={moment(row.timestamp).utc().format("MMM YYYY")}
          transactionData={transactionData}
          navigation={navigation}
        />
      );
    }
  });

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
                  <Text style={{ fontSize: 15 }}>Total Expenses:</Text>
                </Col>
                <Col
                  style={[styleSheetMain.rightContainer, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 15 }}>
                    - MYR {parseFloat(totalExpense).toFixed(2)}
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
                  <Text style={{ fontSize: 15 }}>Total Income:</Text>
                </Col>
                <Col
                  style={[styleSheetMain.rightContainer, { marginRight: 10 }]}
                >
                  <Text style={{ fontSize: 15 }}>
                    + MYR {parseFloat(totalIncome).toFixed(2)}
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
            <View style={{ height: "100%" }}>
              {isLoading ? (
                <ActivityIndicator
                  style={{
                    paddingTop: 40,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  size="large"
                  color="#3C9A46"
                />
              ) : dataRow.length ? (
                dataRow
              ) : (
                <View>
                  <Text
                    style={[
                      texts.montserratRegular,
                      { paddingTop: 40, paddingLeft: 10, paddingRight: 10 },
                    ]}
                  >
                    There is no transaction in this month.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </Grid>
    </Container>
  );
}
