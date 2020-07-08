import React, { useState, useEffect, useGlobal } from "reactn";
import {
  Text,
  Container,
  Header,
  View,
  Input,
  Label,
  Button,
  Segment,
} from "native-base";

import { StyleSheet, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Col, Row, Grid } from "react-native-easy-grid";
import DatePicker from "react-native-datepicker";
import PickerModal from "react-native-picker-modal-view";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

import { alignments } from "../styles/alignments";
import { texts } from "../styles/texts";
import { colors } from "../styles/colors";
import { buttons } from "../styles/buttons";
import { styleSheetMain } from "../styles/styleSheetMain";
import { widths } from "../styles/widths";

import * as api from "../api";

export default function AddTransactionPage() {
  const currentDateTime = moment().format("DD/MM/YYYY, h:mm a");

  const [transactionMode, setTransactionMode] = useState(true);
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transactionNote, setTransactionNote] = useState(null);
  const [amount, setAmount] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [refresh, reload] = useGlobal("refresh");

  const [transactionData, setTransactionData] = useState([]);
  const [budgetAmount, setBudgetAmount] = useGlobal("budget");
  useEffect(() => {
    loadCategoryData();
    loadData();
  }, []);

  const loadCategoryData = async () => {
    try {
      let response = await api.getCategoryList();
      let categoryData = response.data;
      setCategoryData(categoryData);

      let expenseArray = [];
      let incomeArray = [];

      for (let i = 0; i < categoryData.length; i++) {
        if (categoryData[i].transaction_type_id == 2) {
          expenseArray.push({
            Id: categoryData[i].id,
            Name: categoryData[i].category,
          });
        } else {
          incomeArray.push({
            Id: categoryData[i].id,
            Name: categoryData[i].category,
          });
        }
      }
      await loadBudgetData();

      setExpenseList(expenseArray);
      setIncomeList(incomeArray);
    } catch (error) {
      // Unhandled errors
      console.log(error.response);
    }
  };

  const loadData = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let month = moment(selectedDateTime, "DD/MM/YYYY, h:mm a").format("MMMM");
      let year = moment(selectedDateTime, "DD/MM/YYYY, h:mm a").format("YYYY");

      let response = await api.getTransactionList(token, month, year);
      let transactionData = response.data.transactions;
      setTransactionData(transactionData);
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

  function switchTransactionMode() {
    setTransactionMode(!transactionMode);
  }

  const handleOnDateChange = async (datetime) => {
    setSelectedDateTime(datetime);
    await loadData();
  };

  const handleAmountOnChange = (event) => {
    let inputAmount = event.nativeEvent.text;
    setAmount(inputAmount);
  };

  const handleCategoryOnSelect = (event) => {
    let inputCategory = event.Id;
    setSelectedCategory(inputCategory);
  };

  const handleTransactionNoteOnChange = (event) => {
    let inputTransactionNote = event.nativeEvent.text;
    setTransactionNote(inputTransactionNote);
  };

  const loadBudgetData = async () => {
    try {
      let token = await AsyncStorage.getItem("token");

      let response = await api.getBudget(token);

      let budgetData = response.data.budget;

      setBudgetAmount(budgetData);
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

  const handleAddTransactionOnSubmit = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let response = await api.addTransaction(
        token,
        transactionNote,
        parseFloat(amount).toFixed(2),
        selectedCategory,
        moment(selectedDateTime, "DD/MM/YYYY, h:mm a").format()
      );
      reload(!refresh);
      let totalExpense = 0;

      var i;

      for (i = 0; i < transactionData.length; i++) {
        if (transactionData[i].type == "expense") {
          totalExpense += transactionData[i].amount;
        }
      }

      let totalSpent = totalExpense + parseFloat(amount);
      console.log(totalSpent);
      if (totalSpent > budgetAmount) {
        Alert.alert(
          "Warning: Budget Limit Reached",
          "Transaction is added. However, your spending have exceed the current set budget (MYR " +
            parseFloat(budgetAmount).toFixed(2) +
            ") for " +
            moment(selectedDateTime, "DD/MM/YYYY, h:mm a").format("MMMM") +
            ".",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "New Transaction is Added",
          "Your transaction has been added successfully!",
          [{ text: "OK" }]
        );
      }

      setSelectedDateTime(currentDateTime);
      setAmount(null);
      //setSelectedCategory(null);
      setTransactionNote(null);
    } catch (error) {
      if (error.response) {
        // network errors
        if (error.response.status == 422) {
          let errorString = "";
          for (let errorType of Object.values(error.response.data)) {
            for (let error of errorType) {
              errorString += `- ${error}\n`;
            }
          }

          errorString = errorString.trim();
          Alert.alert("Input error", errorString, [{ text: "OK" }]);
        } else if (error.response.status == 401) {
          await AsyncStorage.clear();
          return navigation.navigate("EntrancePage");
        } else {
          console.log(error.response.data);
          Alert.alert("Contact developer", "Network error", [{ text: "OK" }]);
        }
      } else {
        // Unhandled
        setErrorMessage("Contact developer");
        console.log(error);
        Alert.alert("Error", errorMessage, [{ text: "OK" }]);
      }

      return;
    }
  };

  return (
    <Container>
      <Header transparent />
      <Grid style={[colors.backgroundGrey]}>
        <View
          style={[
            colors.backgroundWhite,
            widths.width_100,
            { marginTop: 40, marginBottom: 35, height: 550 },
          ]}
        >
          <Row
            style={[
              widths.width_100,
              alignments.center,
              { height: 45, marginBottom: 50 },
            ]}
          >
            <Segment style={[colors.backgroundWhite, { marginTop: 40 }]}>
              <Button
                first
                style={{
                  backgroundColor: transactionMode ? "#46C553" : "#fff",
                  borderColor: "#98ab9a",
                  padding: 10,
                }}
                active={transactionMode}
                onPress={() => {
                  !transactionMode ? switchTransactionMode() : "";
                }}
              >
                <Text
                  style={{
                    color: transactionMode ? "#fff" : "#000",
                    fontWeight: transactionMode ? "bold" : "normal",
                  }}
                >
                  Expense
                </Text>
              </Button>
              <Button
                last
                style={{
                  backgroundColor: transactionMode ? "#fff" : "#46C553",
                  borderColor: "#98ab9a",
                  padding: 10,
                }}
                active={!transactionMode}
                onPress={() => {
                  transactionMode ? switchTransactionMode() : "";
                }}
              >
                <Text
                  style={{
                    color: transactionMode ? "#000" : "#fff",
                    fontWeight: transactionMode ? "normal" : "bold",
                  }}
                >
                  Income
                </Text>
              </Button>
            </Segment>
          </Row>
          <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <Row style={[styles.transactionInputRow]}>
              <Col size={1}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Date:
                </Label>
              </Col>
              <Col size={2}>
                <DatePicker
                  style={{ width: 225 }}
                  date={selectedDateTime}
                  mode="datetime"
                  placeholder="select date and time"
                  format="DD/MM/YYYY, h:mm a"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: { marginLeft: 36 },
                  }}
                  // onDateChange={(date) => {
                  //   setSelectedDate(date);
                  // }}
                  onDateChange={handleOnDateChange}
                />
              </Col>
            </Row>
            <Row style={[styles.transactionInputRow]}>
              <Col size={2}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Amount:
                </Label>
              </Col>
              <Col size={1}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  MYR
                </Label>
              </Col>
              <Col size={3} style={{ height: 30 }}>
                <Input
                  placeholder="0.00"
                  returnKeyType="done"
                  style={[
                    styleSheetMain.labelBlack,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: "#4EAE58",
                    },
                  ]}
                  keyboardType="numeric"
                  onChange={handleAmountOnChange}
                  value={amount}
                />
              </Col>
            </Row>
            <Row style={[styles.transactionInputRow]}>
              <Col size={2}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Category:
                </Label>
              </Col>
              <Col size={4}>
                <PickerModal
                  onSelected={handleCategoryOnSelect}
                  items={transactionMode ? expenseList : incomeList}
                  sortingLanguage={"us"}
                  showToTopButton={true}
                  selected={selectedCategory}
                  showAlphabeticalIndex={true}
                  autoGenerateAlphabeticalIndex={true}
                  selectPlaceholderText={"Select Category..."}
                  searchPlaceholderText={"Search..."}
                  requireSelection={false}
                  autoSort={false}
                />
              </Col>
            </Row>
            <Row style={[styles.transactionInputRow, { height: 45 }]}>
              <Col size={2}>
                <Label style={[texts.montserratRegular, texts.font_16]}>
                  Note:
                </Label>
              </Col>
            </Row>
            <Row
              style={[
                {
                  paddingLeft: 45,
                  paddingRight: 40,
                  marginBottom: 20,
                  height: 75,
                },
              ]}
            >
              <Input
                style={[
                  styleSheetMain.labelBlack,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "#4EAE58",
                  },
                ]}
                multiline={true}
                onChange={handleTransactionNoteOnChange}
                value={transactionNote}
              />
            </Row>
            <Row
              style={[
                styles.transactionInputRow,
                widths.width_100,
                alignments.center,
                { height: 85 },
              ]}
            >
              <Button
                style={[
                  styleSheetMain.primaryButton,
                  buttons.radius_18,
                  { marginTop: 30 },
                ]}
                onPress={handleAddTransactionOnSubmit}
              >
                <Text style={[colors.white, texts.montserratRegular]}>
                  Add Transaction
                </Text>
              </Button>
            </Row>
          </KeyboardAwareScrollView>
        </View>
      </Grid>
    </Container>
  );
}
const styles = StyleSheet.create({
  transactionInputRow: {
    paddingLeft: 45,
    paddingRight: 40,
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#98AB9A",
  },
});
