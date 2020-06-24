import React, { useState, useEffect } from "react";
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

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { styleSheetMain } from "../styles/styleSheetMain";
import TransactionContainer from "./TransactionContainer";
import YearMonthPicker from "./YearMonthPicker";

import * as api from "../api";

export default function TransactionList({ navigation }) {
  // const initDate = new Date();
  // const [date, setDate] = useState(
  //   new Date(initDate.getFullYear(), initDate.getMonth())
  // );
  // const [temp, setTemp] = useState("Wallet");
  // const month = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // function MonthPicker() {
  //   const startDate = new Date(date.getFullYear() - 1, date.getMonth() + 1);
  //   const endDate = new Date(date.getFullYear() + 1, date.getMonth() + 1);
  //   let allowedDates = [];

  //   for (let i = startDate; i <= endDate; i.setMonth(i.getMonth() + 1)) {
  //     allowedDates.push(i);
  //   }
  //   console.log(allowedDates);

  //   return (
  //     <Picker
  //       note
  //       mode="dialog"
  //       selectedValue={`${month[date.getMonth()]} ${date.getFullYear()}`}
  //       onValueChange={handleMonthPickerOnValueChange}
  //     >
  //       {allowedDates.map((allowedDate) => (
  //         <Picker.Item
  //           key={`${
  //             month[allowedDate.getMonth()]
  //           } ${allowedDate.getFullYear()}`}
  //           label={`${
  //             month[allowedDate.getMonth()]
  //           } ${allowedDate.getFullYear()}`}
  //           value={`${
  //             month[allowedDate.getMonth()]
  //           } ${allowedDate.getFullYear()}`}
  //         />
  //       ))}
  //     </Picker>
  //   );
  // }

  // function handleMonthPickerOnValueChange(value) {
  //   setDate(new Date(value));
  //   console.log(date);
  // }

  // console.log(
  //   `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
  // );

  const Screen = Dimensions.get("window");
  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  // let months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // const checkUserToken = async () => {
  //   try {
  //     let token = await AsyncStorage.getItem("token");
  //     let response = await api.me(token);
  //   } catch (error) {
  //     console.log(error.response.data);
  //     await AsyncStorage.clear();
  //     return navigation.navigate("EntrancePage");
  //   }
  // };

  const loadData = async () => {
    // await checkUserToken();
    try {
      setIsLoading(true);
      let token = await AsyncStorage.getItem("token");
      // let month = moment().subtract(1, "months").format("MMMM");
      let month = moment().format("MMMM");
      let year = moment().format("YYYY");
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
    let amountWithTwoDecimal = parseFloat(row.amount).toFixed(2);

    if (moment(row.timestamp).date() != currentDay) {
      currentDay = moment(row.timestamp).date();
      return (
        <TransactionContainer
          key={index}
          date={moment(row.timestamp).format("DD")}
          dayOfWeek={moment(row.timestamp).format("dddd")}
          monthYear={moment(row.timestamp).format("MMM YYYY")}
          transactionData={transactionData}
          navigation={navigation}
        />
      );
    }
  });

  const [startYear, setstartYear] = useState();
  const [endYear, setEndYear] = useState();
  const [selectedYear, setSelectYear] = useState(year);
  // const [selectedtMonth, setSelectMonth] = useState(months[month]);
  const [selectedMonth, setSelectMonth] = useState(month);
  // console.log(selectedtMonth);
  const showPicker = () => {
    picker
      .show({ startYear, endYear, selectedYear, selectedMonth })
      .then(({ year, month }) => {
        selectedYear(year);
        selectedMonth(month);
      });
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={colors.backgroundGrey}>
        {/* MonthPicker is popping out red error, so commented for now */}
        {/* <MonthPicker /> */}

        {/* <Row style={{ height: 35 }}>
          <View>
            <TouchableOpacity onPress={showPicker}>
              <Text>Show Picker</Text>
            </TouchableOpacity>
            <Text>
              {selectedYear}-{selectedMonth}
            </Text>
            <YearMonthPicker ref={(picker) => (picker = picker)} />
          </View>
        </Row> */}
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
                <Text style={{ fontSize: 15 }}>Total Expenses:</Text>
              </Col>
              <Col style={[styleSheetMain.rightContainer, { marginRight: 10 }]}>
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
              <Col style={[styleSheetMain.rightContainer, { marginRight: 10 }]}>
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
                  MYR {parseFloat(totalIncome - totalExpense).toFixed(2)}
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
                  There is no trasaction in this month.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Grid>
    </Container>
  );
}
